import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// tela com opções de cadastro
export default function TelaCadastros({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Central de Cadastros</Text>
      </View>
      <Text style={styles.subtitle}>O que você deseja adicionar hoje?</Text>
      
      {/* Botão pra ir pra tela de cadastrar obra */}
      <TouchableOpacity 
        style={styles.cardButton} 
        onPress={() => navigation.navigate('RegisterObras')}
      >
        <Ionicons name="color-palette-outline" size={32} color="#fff" />
        <Text style={styles.cardButtonText}>Cadastrar Obra</Text>
      </TouchableOpacity>
      
      {/* Botão pra ir pra tela de cadastrar artista */}
      <TouchableOpacity 
        style={styles.cardButton} 
        onPress={() => navigation.navigate('RegisterAuthors')}
      >
        <Ionicons name="person-outline" size={32} color="#fff" />
        <Text style={styles.cardButtonText}>Cadastrar Artista</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// nossos estilos
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
    backgroundColor: '#343a40',
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