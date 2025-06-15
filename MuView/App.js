import Login from './Screens/Login';
import Home from './Screens/Home';
// import Feed from './Screens/Feed';
// import Count from './Screens/count';
import Product from './Screens/Product';
import Cadastro from './Screens/Cadastro';
import { CarrinhoProvider } from './CarrinhoProvider';
import Carrinho from './Screens/carrinho'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import cadastroProduto from './Screens/cadastroProduto';

function BottomTab(){
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 25,
          height: 75,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
          borderWidth: 1,
          borderColor: '#f0f0f0',
          paddingVertical: 15,
        },
      }}
    >
      <Tab.Screen 
        name='HomeTab' 
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[
              { width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 22.5 },
              focused && { backgroundColor: '#000' }
            ]}>
              <Text style={{ fontSize: 20, color: focused ? '#fff' : '#666' }}>🏠</Text>
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name='ProductTab' 
        component={Product}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[
              { width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 22.5 },
              focused && { backgroundColor: '#000' }
            ]}>
              <Text style={{ fontSize: 20, color: focused ? '#fff' : '#666' }}>❓</Text>
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name='CarrinhoTab' 
        component={Carrinho}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[
              { width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 22.5 },
              focused && { backgroundColor: '#000' }
            ]}>
              <Text style={{ fontSize: 20, color: focused ? '#fff' : '#666' }}>🔍</Text>
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name='CadastroProdutoTab' 
        component={cadastroProduto}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[
              { width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 22.5 },
              focused && { backgroundColor: '#000' }
            ]}>
              <Text style={{ fontSize: 20, color: focused ? '#fff' : '#666' }}>🔔</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App () {
  const Stack = createStackNavigator();
  
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen options={{headerShown:false}} name='TelaLogin' component={Login}/>
          <Stack.Screen options={{headerShown:false}} name='TelaCadastro' component={Cadastro}/>
          <Stack.Screen options={{headerShown:false}} name='Home' component={BottomTab}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}