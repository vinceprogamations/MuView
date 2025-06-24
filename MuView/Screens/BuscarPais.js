import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { db } from '../controller';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegistroBandeira from './RegistroBandeira';

// tela pra cadastrar país/bandeira E pesquisar
export default function CadastrarPais({ navigation }) {
  const [nome, setNome] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [carregando, setCarregando] = useState(false);

  // pesquisa o país no firebase
  const pesquisarPais = async () => {
    if (!nome.trim()) {
      Alert.alert('Opa!', 'Você precisa digitar o nome do país para pesquisar.');
      return;
    }

    setCarregando(true);
    try {
      const q = query(
        collection(db, 'paises'), 
        where('nome', '==', nome.trim())
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const paisEncontrado = querySnapshot.docs[0].data();
        setBandeira(paisEncontrado.bandeira);
        Alert.alert('Encontrado!', `País ${paisEncontrado.nome} encontrado!\nURL da bandeira preenchida automaticamente.`);
      } else {
        Alert.alert('Não encontrado', 'País não encontrado na base de dados.');
        setBandeira('');
      }
    } catch (error) {
      console.error("Erro ao pesquisar país: ", error);
      Alert.alert('Erro', 'Não deu pra pesquisar o país. Tenta de novo.');
    } finally {
      setCarregando(false);
    }
  };


  const cadastrarPais = async () => {
    if (!nome.trim() || !bandeira.trim()) {
      Alert.alert('Opa!', 'Você precisa preencher o nome do país e a URL da bandeira.');
      return;
    }
        
    setCarregando(true);
    try {
      await addDoc(collection(db, 'paises'), {
        nome: nome.trim(),
        bandeira: bandeira.trim(),
      });
      Alert.alert('Aê!', 'País cadastrado com sucesso!');
      setNome('');
      setBandeira('');
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar país: ", error);
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
        <Text style={styles.title}>Gerenciar Países</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do País"
          value={nome}
          onChangeText={setNome}
        />
        
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, styles.searchInput]}
            placeholder="URL da Bandeira do País"
            value={bandeira}
            onChangeText={setBandeira}
          />
          <TouchableOpacity
            style={[styles.searchButton, carregando && styles.buttonDisabled]}
            onPress={pesquisarPais}
            disabled={carregando}
          >
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
                
        <TouchableOpacity 
          style={[styles.button, carregando && styles.buttonDisabled]}
          onPress={RegistroBandeira}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? 'Processando...' : 'Adicionar País'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
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