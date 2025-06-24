import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { db } from '../controller';
import { collection, addDoc } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

// tela pra cadastrar artista
export default function CadastrarAutor({ navigation }) {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // cadastra o artista no firebase
  const cadastrarAutor = async () => {
    if (!nome.trim() || !imagem.trim()) {
      Alert.alert('Opa!', 'Você precisa preencher o nome e a URL da imagem.');
      return;
    }
    setCarregando(true);
    try {
      await addDoc(collection(db, 'artistas'), {
        nome: nome,
        imagem: imagem,
      });
      Alert.alert('Aê!', 'Artista cadastrado com sucesso!');
      setNome('');
      setImagem('');
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar artista: ", error);
      Alert.alert('Erro', 'Não deu pra cadastrar o artista. Tenta de novo.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cadastrar Novo Artista</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Artista"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem do Artista"
          value={imagem}
          onChangeText={setImagem}
        />

        <TouchableOpacity 
          style={[styles.button, carregando && styles.buttonDisabled]} 
          onPress={cadastrarAutor}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? 'Cadastrando...' : 'Cadastrar Artista'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// nossos estilos, tipo um CSS pro app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1F2937',
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