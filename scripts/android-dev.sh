#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${RCT_METRO_PORT:-8081}"
APP_ID="${ANDROID_APP_ID:-com.pro2}"
METRO_LOG="$ROOT_DIR/.metro.log"
METRO_PID_FILE="$ROOT_DIR/.metro.pid"
METRO_RESET_CACHE="${METRO_RESET_CACHE:-1}"
ADB="${ANDROID_ADB:-adb}"
EMULATOR="${ANDROID_EMULATOR:-emulator}"
AVD_NAME="${ANDROID_AVD_NAME:-Pixel_4a_API_35_Fast}"
DEVICE_ID="${ANDROID_DEVICE_ID:-}"
EMULATOR_LOG="$ROOT_DIR/.emulator.log"

cd "$ROOT_DIR"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1"
    exit 1
  fi
}

metro_ready() {
  node - "$PORT" "$ROOT_DIR" <<'NODE'
const http = require('http');
const port = Number(process.argv[2]);
const projectRoot = process.argv[3];

const req = http.request(
  {
    host: '127.0.0.1',
    port,
    path: '/status',
    timeout: 1000,
  },
  res => {
    const metroRoot = res.headers['x-react-native-project-root'];
    process.exit(res.statusCode === 200 && metroRoot === projectRoot ? 0 : 1);
  },
);

req.on('timeout', () => {
  req.destroy();
  process.exit(1);
});
req.on('error', () => process.exit(1));
req.end();
NODE
}

metro_port_in_use() {
  node - "$PORT" <<'NODE'
const net = require('net');
const port = Number(process.argv[2]);
const socket = net.connect({ host: '127.0.0.1', port });

socket.on('connect', () => {
  socket.destroy();
  process.exit(0);
});
socket.on('error', () => process.exit(1));
socket.setTimeout(1000, () => {
  socket.destroy();
  process.exit(1);
});
NODE
}

start_metro() {
  if metro_ready; then
    if [ "$METRO_RESET_CACHE" = "1" ]; then
      echo "Restarting Metro with a clean transform cache on port $PORT..."
      stop_metro
    else
      echo "Metro is already running on port $PORT."
      return
    fi
  fi

  if metro_ready; then
    echo "Metro is already running on port $PORT."
    return
  fi

  if metro_port_in_use; then
    echo "Port $PORT is already in use, but it is not Metro for this project."
    echo "Stop the other process or run with another port, for example: RCT_METRO_PORT=8082 npm run android"
    exit 1
  fi

  echo "Starting Metro on port $PORT..."
  setsid npx react-native start --port "$PORT" --reset-cache >"$METRO_LOG" 2>&1 &
  echo "$!" >"$METRO_PID_FILE"

  for _ in $(seq 1 60); do
    if metro_ready; then
      echo "Metro is ready on port $PORT."
      return
    fi
    sleep 1
  done

  echo "Metro did not start within 60 seconds. Last log lines:"
  tail -40 "$METRO_LOG" || true
  exit 1
}

stop_metro() {
  if [ ! -f "$METRO_PID_FILE" ]; then
    return
  fi

  metro_pid="$(cat "$METRO_PID_FILE")"
  if [ -z "$metro_pid" ] || ! kill -0 "$metro_pid" >/dev/null 2>&1; then
    rm -f "$METRO_PID_FILE"
    return
  fi

  kill -TERM -- "-$metro_pid" >/dev/null 2>&1 || kill "$metro_pid" >/dev/null 2>&1 || true
  for _ in $(seq 1 20); do
    if ! kill -0 "$metro_pid" >/dev/null 2>&1; then
      rm -f "$METRO_PID_FILE"
      return
    fi
    sleep 0.25
  done

  kill -KILL -- "-$metro_pid" >/dev/null 2>&1 || kill -9 "$metro_pid" >/dev/null 2>&1 || true
  rm -f "$METRO_PID_FILE"
}

running_emulator_id() {
  "$ADB" devices | awk 'NR > 1 && $1 ~ /^emulator-/ && $2 == "device" { print $1; exit }'
}

matching_emulator_id() {
  while read -r serial state; do
    if [ "${serial:-}" = "" ] || [ "${state:-}" != "device" ]; then
      continue
    fi

    avd="$("$ADB" -s "$serial" emu avd name 2>/dev/null | head -n 1 | tr -d '\r')"
    if [ "$avd" = "$AVD_NAME" ]; then
      echo "$serial"
      return
    fi
  done < <("$ADB" devices | awk 'NR > 1 && $1 ~ /^emulator-/ { print $1, $2 }')
}

pick_device() {
  if [ -n "$DEVICE_ID" ]; then
    return
  fi

  DEVICE_ID="$(matching_emulator_id)"
}

start_emulator() {
  require_command "$EMULATOR"

  if ! "$EMULATOR" -list-avds | grep -Fxq "$AVD_NAME"; then
    echo "Android Studio AVD '$AVD_NAME' was not found."
    echo "Available AVDs:"
    "$EMULATOR" -list-avds || true
    exit 1
  fi

  echo "Starting Android Studio emulator '$AVD_NAME'..."
  nohup "$EMULATOR" -avd "$AVD_NAME" >"$EMULATOR_LOG" 2>&1 &
}

wait_for_emulator() {
  pick_device
  if [ -n "$DEVICE_ID" ]; then
    return
  fi

  start_emulator

  echo "Waiting for Android Studio emulator..."
  for _ in $(seq 1 120); do
    pick_device
    if [ -n "$DEVICE_ID" ]; then
      return
    fi
    sleep 1
  done

  echo "No Android Studio emulator became available."
  echo "Last emulator log lines:"
  tail -40 "$EMULATOR_LOG" || true
  exit 1
}

wait_for_boot() {
  echo "Waiting for $DEVICE_ID to finish booting..."
  for _ in $(seq 1 120); do
    if [ "$("$ADB" -s "$DEVICE_ID" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; then
      return
    fi
    sleep 1
  done

  echo "$DEVICE_ID is connected but did not finish booting in time."
  exit 1
}

ensure_reverse() {
  wait_for_emulator
  wait_for_boot
  echo "Forwarding $DEVICE_ID port $PORT to Metro..."
  "$ADB" -s "$DEVICE_ID" reverse "tcp:$PORT" "tcp:$PORT"
}

launch_app() {
  "$ADB" -s "$DEVICE_ID" shell am force-stop "$APP_ID" >/dev/null 2>&1 || true
  "$ADB" -s "$DEVICE_ID" shell am start -n "$APP_ID/.MainActivity" >/dev/null
}

require_command node
require_command npx
require_command "$ADB"

start_metro
ensure_reverse
npx react-native run-android --no-packager --port "$PORT" --device "$DEVICE_ID"
ensure_reverse
launch_app
echo "Android app is running on $DEVICE_ID. Metro log: $METRO_LOG"
