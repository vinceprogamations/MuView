 // import Profile from './components/profile';
 // import {Gallery, Artist } from './components/profile';
 // import Test from './components/test';

 import Login from './Screens/Login';
 import Home from './Screens/Home';
 import Feed from './Screens/Feed';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function bottomTab () {
 
  const bottomtab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <bottomtab.Navigator initialRouteName='login' screenOptions={{headerStyle:{backgroundColor: '#000'},
      headerTintColor: 'white',
      tabBarActiveBackgroundColor: 'grey',
      tabBarInactiveBackgroundColor: 'white',
     }}>
   

      <bottomtab.Screen name='login' component={Login}
        options={{tabBarIcon: ()=> <Entypo name="login" size={24} color="black" />  
  }}
        />
        <bottomtab.Screen name='home' component={Home}
        options={{tabBarIcon: ()=> <Entypo name="home" size={24} color="black" />}}
        />

        <bottomtab.Screen name='feed' component={Feed}
        options={{tabBarIcon: ()=> <Entypo name="documents" size={24} color="black" />}}
        />


      </bottomtab.Navigator>
    
    </NavigationContainer>
  );
}