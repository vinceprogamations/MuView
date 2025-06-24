import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { db } from '../controller';
import { collection, addDoc } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

// tela pra cadastrar obra
export default function CadastrarObra({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [pais, setPais] = useState('');
  const [imagem, setImagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // cadastra a obra no firebase
  const cadastrarObra = async () => {
    if (!titulo || !autor || !imagem) {
      Alert.alert('Opa!', 'Você precisa preencher pelo menos o título, autor e a imagem.');
      return;
    }
    setCarregando(true);
    try {
      await addDoc(collection(db, 'obras'), {
        titulo: titulo,
        autor: autor,
        pais: pais,
        imagem: imagem,
      });
      Alert.alert('Aê!', 'Obra cadastrada com sucesso!');
      
      setTitulo('');
      setAutor('');
      setPais('');
      setImagem('');
      navigation.navigate('Home');
    } catch (error) {
      console.error("Erro ao cadastrar obra: ", error);
      Alert.alert('Erro', 'Não deu pra cadastrar a obra. Tenta de novo.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Cadastrar Nova Obra</Text>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Título da Obra"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor da Obra"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          style={styles.input}
          placeholder="País de Origem"
          value={pais}
          onChangeText={setPais}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem"
          value={imagem}
          onChangeText={setImagem}
        />
        
        <TouchableOpacity 
          style={[styles.button, carregando && styles.buttonDisabled]} 
          onPress={cadastrarObra}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? 'Cadastrando...' : 'Cadastrar Obra'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 