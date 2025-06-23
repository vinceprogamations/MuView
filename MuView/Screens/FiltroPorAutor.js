import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { db } from '../controller';
import { collection, getDocs } from 'firebase/firestore';

export default function FiltroPorAutor({ navigation }) {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  // busca os autores no firestore
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artistas'));
        const listaAutores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAutores(listaAutores);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAutores();
  }, []);

  // componente pra renderizar cada autor
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('AuthorDetail', { authorName: item.nome })}
    >
      <Image source={{ uri: item.imagem }} style={styles.authorImage} />
      <Text style={styles.authorName}>{item.nome}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <SafeAreaView style={styles.container}><Text>Carregando autores...</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filtrar por Autor</Text>
      <FlatList
        data={autores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum autor cadastrado ainda.</Text>}
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
  authorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  authorName: {
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