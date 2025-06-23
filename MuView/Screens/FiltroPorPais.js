import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { db } from '../controller';
import { collection, getDocs } from 'firebase/firestore';

export default function FiltroPorPais({ navigation }) {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);

  // busca os países no firestore
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'paises'));
        const listaPaises = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPaises(listaPaises);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaises();
  }, []);

  // componente pra renderizar cada bandeirinha
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CountryDetail', { countryName: item.nome })}
    >
      <Image source={{ uri: item.bandeira }} style={styles.flag} />
      <Text style={styles.countryName}>{item.nome}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <SafeAreaView style={styles.container}><Text>Carregando países...</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de voltar pra tela anterior */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: '#007AFF' }}>{'<'} Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Filtrar por País</Text>
      <FlatList
        data={paises}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum país cadastrado ainda.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  flag: {
    width: '100%',
    height: 80,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
}); 