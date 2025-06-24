import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { db } from '../controller';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

// tela pra cadastrar país/bandeira E pesquisar
export default function RegistroBandeira({ navigation }) {
  const [nome, setNome] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [paisEncontrado, setPaisEncontrado] = useState(null); 

  const buscarPais = async () => {
    if (!nome.trim()) {
      return;
    }

    setCarregando(true);
    try {
      const consulta = query(
        collection(db, 'paises'), 
        where('nome', '==', nome.trim())
      );
      const resultado = await getDocs(consulta);
      
      if (!resultado.empty) {
        const dadosPais = resultado.docs[0].data();
        setPaisEncontrado(dadosPais);
        Alert.alert('Achei!', `Opa, ${dadosPais.nome} tá aqui sim!`);
      } else {
        setPaisEncontrado(null);
      }
    } catch (erro) {
      console.error("Erro ", erro);
      setPaisEncontrado(null);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarPais = async () => {
    if (!nome.trim() || !bandeira.trim()) {
      Alert.alert('Ô!', 'Preenche o nome do país e o link da bandeira aí.');
      return;
    }
        
    setCarregando(true);
    try {
      await addDoc(collection(db, 'paises'), {
        nome: nome.trim(),
        bandeira: bandeira.trim(),
      });
      Alert.alert('Massa!', 'País cadastrado na moral!');
      setNome('');
      setBandeira('');
      setPaisEncontrado(null);
      navigation.goBack();
    } catch (erro) {
      console.error("Erro no cadastro: ", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Cadastro de Países</Text>
      </View>

      <View style={estilos.formulario}>
        <View style={estilos.containerBusca}>
          <TextInput
            style={[estilos.campo, estilos.campoBusca]}
            placeholder="Nome do País"
            value={nome}
            onChangeText={setNome}
          />
          <TouchableOpacity
            style={[estilos.botaoBusca, carregando && estilos.botaoDesabilitado]}
            onPress={buscarPais}
            disabled={carregando}
          >
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Card do país achado na busca */}
        {paisEncontrado && (
          <View style={estilos.cardPaisEncontrado}>
            <Text style={estilos.tituloPaisEncontrado}>Achei esse aqui:</Text>
            <View style={estilos.containerCard}>
              <Image source={{ uri: paisEncontrado.bandeira }} style={estilos.imagemBandeira} />
              <Text style={estilos.nomePais}>{paisEncontrado.nome}</Text>
            </View>
          </View>
        )}
        
        <TextInput
          style={estilos.campo}
          placeholder="Link da Bandeira do País"
          value={bandeira}
          onChangeText={setBandeira}
        />
                
        <TouchableOpacity 
          style={[estilos.botaoAdicionar, carregando && estilos.botaoDesabilitado]}
          onPress={adicionarPais}
          disabled={carregando}
        >
          <Text style={estilos.textoBotao}>
            {carregando ? 'Cadastrando...' : 'Cadastrar País'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// estilos da tela
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 20,
  },
  formulario: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  campo: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  containerBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  campoBusca: {
    flex: 1,
    marginBottom: 0,
    marginRight: 10,
  },
  botaoBusca: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  cardPaisEncontrado: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tituloPaisEncontrado: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  containerCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagemBandeira: {
    width: 80,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
    resizeMode: 'cover',
  },
  nomePais: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  botaoAdicionar: {
    backgroundColor: '#1F2937',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});