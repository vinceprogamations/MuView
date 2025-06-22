import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// essa é a tela que vai juntar os filtros
export default function Filtros({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filtros</Text>
      <Text style={styles.subtitle}>Encontre obras por país ou por artista.</Text>
      
      {/* Botão pra ir pra tela de filtro por país */}
      <TouchableOpacity 
        style={styles.cardButton} 
        onPress={() => navigation.navigate('FilterByCountry')}
      >
        <Ionicons name="flag-outline" size={32} color="#fff" />
        <Text style={styles.cardButtonText}>Filtrar por País</Text>
      </TouchableOpacity>
      
      {/* Botão pra ir pra tela de filtro por autor */}
      <TouchableOpacity 
        style={styles.cardButton} 
        onPress={() => navigation.navigate('FilterByAuthor')}
      >
        <Ionicons name="people-outline" size={32} color="#fff" />
        <Text style={styles.cardButtonText}>Filtrar por Autor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  cardButton: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
}); 