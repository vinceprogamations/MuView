 // import Profile from './components/profile';
 // import {Gallery, Artist } from './components/profile';
 // import Test from './components/test';

import Login from './Screens/Login';
import Home from './Screens/Home';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';


export default function Drawer () {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='home' component={Home}/>
        <Drawer.Screen name='login' component={Login}/>
      </Drawer.Navigator>
    
    </NavigationContainer>
  );
}



