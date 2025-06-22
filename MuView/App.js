import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- Telas --- //
// aqui a gente importa todas as telas que vamos usar no app
import Register from './Screens/Register';
import Login from './Screens/Login';  
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import AuthorDetail from './Screens/AuthorDetail';
import RegisterObras from './Screens/RegisterObras';
import RegisterAuthors from './Screens/RegisterAuthors';
import Cadastro from './Screens/Cadastro';
import Filtros from './Screens/Filtros';
import FilterByCountry from './Screens/FilterByCountry';
import CountryDetail from './Screens/CountryDetail';
import FilterByAuthor from './Screens/FilterByAuthor';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- Navegação Principal (com abas) --- //
// essa função cria o menu com as abinhas de baixo
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // aqui a gente escolhe o ícone pra cada aba
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Filtros') {
            iconName = focused ? 'filter' : 'filter-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // estilo das abas
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
        headerShown: false, // pra não mostrar o cabeçalho padrão
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
      })}
    >
      {/* aqui a gente define cada uma das abas */}
      <Tab.Screen name="Home" component={Home} options={{ title: 'Início' }} />
      <Tab.Screen name="Filtros" component={Filtros} options={{ title: 'Filtros' }} />
      <Tab.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastrar' }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

// --- App (Componente principal) --- //
// esse é o coração do nosso app, onde a mágica da navegação acontece
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {/* o Stack.Navigator é tipo um baralho de cartas, onde cada tela é uma carta */}
      <Stack.Navigator 
        initialRouteName="TelaLogin" // a primeira tela que o usuário vê
        screenOptions={{
          headerShown: false, // esconde o cabeçalho em todas as telas
        }}
      >
        {/* aqui a gente define todas as telas que o app pode ter */}
        <Stack.Screen name="TelaLogin" component={Login} />
        <Stack.Screen name="TelaCadastro" component={Register} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="AuthorDetail" component={AuthorDetail} />
        <Stack.Screen name="RegisterObras" component={RegisterObras} />
        <Stack.Screen name="RegisterAuthors" component={RegisterAuthors} />
        <Stack.Screen name="FilterByCountry" component={FilterByCountry} />
        <Stack.Screen name="CountryDetail" component={CountryDetail} />
        <Stack.Screen name="FilterByAuthor" component={FilterByAuthor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}