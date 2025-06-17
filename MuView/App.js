import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importar as telas
import Register from './Screens/Register';
import Login from './Screens/Login';  
import Home from './Screens/Home';
import Profile from './Screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação por abas para as telas principais
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#fff" />
      <Stack.Navigator 
        initialRouteName="TelaCadastro"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen 
          name="TelaCadastro" 
          component={Register}
          options={{ title: 'Register' }}
        />
        <Stack.Screen 
          name="TelaLogin" 
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="MainApp" 
          component={MainTabs}
          options={{ title: 'App Principal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}