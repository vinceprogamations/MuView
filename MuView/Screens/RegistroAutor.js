import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { db } from '../controller';
import { collection, addDoc } from 'firebase/firestore';

// tela pra cadastrar um artista novo
export default function RegistroAutor({ navigation }) {
  // estados pra guardar o que a gente digita nos campos
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [loading, setLoading] = useState(false);

  // função que roda quando a gente aperta o botão de cadastrar
  const handleRegisterAuthor = async () => {
    // validação simples pra ver se os campos não tão vazios
    if (!nome.trim() || !imagem.trim()) {
      Alert.alert('Opa!', 'Você precisa preencher o nome e a URL da imagem.');
      return;
    }
    setLoading(true); // mostra que tá carregando
    try {
      // aqui a gente adiciona um novo "documento" na coleção "artistas" lá no firebase
      await addDoc(collection(db, 'artistas'), {
        nome: nome,
        imagem: imagem,
      });
      Alert.alert('Aê!', 'Artista cadastrado com sucesso!');
      // limpa os campos depois de cadastrar
      setNome('');
      setImagem('');
      navigation.goBack(); // volta pra tela anterior
    } catch (error) {
      console.error("Deu ruim pra cadastrar o artista: ", error);
      Alert.alert('Erro', 'Não deu pra cadastrar o artista. Tenta de novo.');
    } finally {
      setLoading(false); // para de carregar
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Cadastrar Novo Artista</Text>
        
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
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleRegisterAuthor}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Cadastrando...' : 'Cadastrar Artista'}
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