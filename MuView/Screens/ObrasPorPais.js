import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { db } from '../controller';
import { collection, getDocs } from 'firebase/firestore';

// Tela pra mostrar só os países que realmente têm obras cadastradas
export default function ObrasPorPais({ navigation }) {
  // estados pra guardar os países (com obras) e as obras do país selecionado
  const [paisesComObras, setPaisesComObras] = useState([]); // [{ nome, bandeira, obras: [] }]
  const [paisSelecionado, setPaisSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  // busca todas as obras e agrupa por país
  useEffect(() => {
    const fetchObrasEAgruparPorPais = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'obras'));
        const obras = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // agrupa as obras por país
        const agrupado = {};
        obras.forEach(obra => {
          if (!obra.pais) return; // ignora se não tem país
          if (!agrupado[obra.pais]) {
            agrupado[obra.pais] = [];
          }
          agrupado[obra.pais].push(obra);
        });
        // transforma em array e pega a bandeira da primeira obra de cada país
        const listaPaises = Object.keys(agrupado).map(paisNome => ({
          nome: paisNome,
          bandeira: agrupado[paisNome][0].bandeira || agrupado[paisNome][0].imagem, // tenta pegar a bandeira, se não tiver pega a imagem da obra
          obras: agrupado[paisNome],
        }));
        setPaisesComObras(listaPaises);
      } catch (error) {
        console.error('Erro ao buscar obras e agrupar por país:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchObrasEAgruparPorPais();
  }, []);

  // se estiver carregando, mostra um textinho
  if (loading) {
    return <SafeAreaView style={styles.container}><Text>Carregando...</Text></SafeAreaView>;
  }

  // se não escolheu país, mostra só as bandeiras dos países que têm obras
  if (!paisSelecionado) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={paisesComObras}
          numColumns={3}
          keyExtractor={item => item.nome}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => setPaisSelecionado(item)}>
              <Image source={{ uri: item.bandeira }} style={styles.bandeira} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30 }}>Nenhum país com obras ainda.</Text>}
        />
      </SafeAreaView>
    );
  }

  // se escolheu país, mostra as obras desse país
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setPaisSelecionado(null)} style={styles.voltar}>
        <Text style={{ color: '#007AFF' }}>{'<'} Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Obras de {paisSelecionado.nome}</Text>
      <FlatList
        data={paisSelecionado.obras}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.cardObra}>
            <Image source={{ uri: item.imagem }} style={styles.imagemObra} />
            <Text style={styles.nomeObra}>{item.titulo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30 }}>Nenhuma obra desse país ainda.</Text>}
      />
    </SafeAreaView>
  );
}

// estilos bem simples
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  lista: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1/3,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  bandeira: {
    width: 50,
    height: 35,
    borderRadius: 5,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  nomePais: {
    fontSize: 14,
    fontWeight: '600',
  },
  voltar: {
    marginLeft: 10,
    marginBottom: 10,
  },
  cardObra: {
    flex: 1/2,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  imagemObra: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  nomeObra: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 