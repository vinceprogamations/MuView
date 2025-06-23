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
<<<<<<< Updated upstream
=======
import DetalheAutor from './Screens/DetalheAutor';
import RegistroObras from './Screens/RegistroObras';
import RegistroAutor from './Screens/RegistroAutor';
import Cadastro from './Screens/Cadastro';
import Filtros from './Screens/Filtros';
import FiltroPorPais from './Screens/FiltroPorPais';
import DetalhesPais from './Screens/DetalhesPais';
import FiltroPorAutor from './Screens/FiltroPorAutor';
import ObrasPorPais from './Screens/ObrasPorPais';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
          } else if (route.name === 'Filtros') {
            iconName = focused ? 'filter' : 'filter-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'ObrasPorPais') {
            iconName = focused ? 'flag' : 'flag-outline';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
      {/* aqui a gente define cada uma das abas */}
      <Tab.Screen name="Home" component={Home} options={{ title: 'Início' }} />
      <Tab.Screen name="Filtros" component={Filtros} options={{ title: 'Filtros' }} />
      <Tab.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastrar' }}/>
      <Tab.Screen name="ObrasPorPais" component={ObrasPorPais} options={{ title: 'Por País' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        {/* aqui a gente define todas as telas que o app pode ter */}
        <Stack.Screen name="TelaLogin" component={Login} />
        <Stack.Screen name="TelaCadastro" component={Register} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="AuthorDetail" component={DetalheAutor} />
        <Stack.Screen name="RegisterObras" component={RegistroObras} />
        <Stack.Screen name="RegisterAuthors" component={RegistroAutor} />
        <Stack.Screen name="FilterByCountry" component={FiltroPorPais} />
        <Stack.Screen name="CountryDetail" component={DetalhesPais} />
        <Stack.Screen name="FilterByAuthor" component={FiltroPorAutor} />
>>>>>>> Stashed changes
      </Stack.Navigator>
    </NavigationContainer>
  );
}