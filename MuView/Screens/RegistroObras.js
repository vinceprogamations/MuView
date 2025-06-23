import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { db } from '../controller';
import { collection, addDoc } from 'firebase/firestore';

// --- Tela de Cadastro de Obras --- //
export default function RegistroObras({ navigation }) {
  // estados pra guardar o que a gente digita nos campos
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [pais, setPais] = useState('');
  const [imagem, setImagem] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [loading, setLoading] = useState(false);

  // função que roda quando a gente aperta o botão de cadastrar
  const handleRegisterObra = async () => {
    // validação simples pra ver se os campos mais importantes não tão vazios
    if (!titulo || !autor || !imagem) {
      Alert.alert('Opa!', 'Você precisa preencher pelo menos o título, autor e a imagem.');
      return;
    }
    setLoading(true); // mostra que tá carregando
    try {
      // aqui a gente adiciona um novo "documento" na coleção "obras" lá no firebase
      await addDoc(collection(db, 'obras'), {
        titulo: titulo,
        autor: autor,
        pais: pais,
        imagem: imagem,
        bandeira: bandeira,
      });
      Alert.alert('Aê!', 'Obra cadastrada com sucesso!');
      
      // limpa os campos depois de cadastrar
      setTitulo('');
      setAutor('');
      setPais('');
      setImagem('');
      setBandeira('');
      // volta pra tela Home pra gente ver a obra nova
      navigation.navigate('Home');
    } catch (error) {
      console.error("Deu ruim pra cadastrar a obra: ", error);
      Alert.alert('Erro', 'Não deu pra cadastrar a obra. Tenta de novo.');
    } finally {
      setLoading(false); // para de carregar
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cadastrar Nova Obra</Text>
        
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
        <TextInput
          style={styles.input}
          placeholder="URL da Bandeira do País"
          value={bandeira}
          onChangeText={setBandeira}
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleRegisterObra}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Cadastrando...' : 'Cadastrar Obra'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// nossos estilos
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