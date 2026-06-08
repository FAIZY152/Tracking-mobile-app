import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackScreen1 from "../../components/stack/StackScreen1";
import StackScreen2 from "../../components/stack/StackScreen2";


const Stack = createNativeStackNavigator()

const StackNavigator:React.FC = () => {
    return <Stack.Navigator >
<Stack.Screen name="StackScreen1" component={StackScreen1} options={{animation:"fade" , title:"Home"}} />
<Stack.Screen name="StackScreen2" component={StackScreen2} options={{animation:"fade" , title:"Details"}} />
</Stack.Navigator>
}   

export default StackNavigator