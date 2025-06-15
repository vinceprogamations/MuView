import Login from './Screens/Login';
import Home from './Screens/Home';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Stack () {


  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
      <Stack.Screen name='home'  component={Home}/>
        <Stack.Screen name='login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
