import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// importa as telas
import TelaCadastro from './Screens/Register';
import TelaLogin from './Screens/Login';  
import TelaInicial from './Screens/Home';
import TelaPerfil from './Screens/Profile';
import DetalhesAutor from './Screens/DetalheAutor';
import CadastrarObra from './Screens/RegistroObras';
import CadastrarAutor from './Screens/RegistroAutor';
import TelaCadastros from './Screens/Cadastro';
import TelaFiltros from './Screens/Filtros';
import FiltrarPorPais from './Screens/FiltroPorPais';
import DetalhesPais from './Screens/DetalhesPais';
import FiltrarPorAutor from './Screens/FiltroPorAutor';
import BandeirasPaises from './Screens/BandeirasPaises';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// navegação com abas
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bandeiras') {
            iconName = focused ? 'flag' : 'flag-outline';
          } else if (route.name === 'Filtros') {
            iconName = focused ? 'filter' : 'filter-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
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
        },
      })}
    >
      <Tab.Screen name="Home" component={TelaInicial} options={{ title: 'Início' }} />
      <Tab.Screen name="Bandeiras" component={BandeirasPaises} options={{ title: 'Países' }} />
      <Tab.Screen name="Filtros" component={TelaFiltros} options={{ title: 'Filtros' }} />
      <Tab.Screen name="Cadastro" component={TelaCadastros} options={{ title: 'Cadastrar' }}/>
      <Tab.Screen name="Profile" component={TelaPerfil} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        initialRouteName="TelaLogin"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="AuthorDetail" component={DetalhesAutor} />
        <Stack.Screen name="RegisterObras" component={CadastrarObra} />
        <Stack.Screen name="RegisterAuthors" component={CadastrarAutor} />
        <Stack.Screen name="FilterByCountry" component={FiltrarPorPais} />
        <Stack.Screen name="CountryDetail" component={DetalhesPais} />
        <Stack.Screen name="FilterByAuthor" component={FiltrarPorAutor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}