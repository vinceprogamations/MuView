import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../controller';
import { Ionicons } from '@expo/vector-icons';

// Componente pra cada obra, igual ao de outras telas
const CartaoObra = ({ obra, onFavorite, isFavorited }) => (
  <View style={styles.cartaoObraContainer}>
    <Image source={{ uri: obra.imagem }} style={styles.imagemObra} />
    <TouchableOpacity style={styles.coracaoContainer} onPress={() => onFavorite(obra.id, !isFavorited)}>
      <Ionicons 
        name={isFavorited ? 'heart' : 'heart-outline'} 
        size={24} 
        color={isFavorited ? '#E91E63' : '#fff'} 
      />
    </TouchableOpacity>
    <Text style={styles.obraTitulo}>{obra.titulo}</Text>
  </View>
);

export default function CountryDetail({ route, navigation }) {
  // a gente pega o nome do país que foi passado pela navegação
  const { countryName } = route.params;
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    buscarObrasDoPais();
    buscarFavoritos();
  }, [countryName]);

  // busca só as obras que são do país específico
  const buscarObrasDoPais = async () => {
    try {
      setLoading(true);
      const obrasRef = collection(db, 'obras');
      // aqui a gente filtra as obras pelo campo 'pais'
      const q = query(obrasRef, where("pais", "==", countryName));
      const querySnapshot = await getDocs(q);
      const listaObras = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setObras(listaObras);
    } catch (error) {
      console.error("Erro ao buscar obras do país:", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarFavoritos = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().savedPosts) {
        setFavoritos(userDoc.data().savedPosts);
      }
    }
  };

  const handleFavorite = async (obraId, shouldFavorite) => {
    const user = auth.currentUser;
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      if (shouldFavorite) {
        await updateDoc(userDocRef, { savedPosts: arrayUnion(obraId) });
        setFavoritos(prev => [...prev, obraId]);
      } else {
        await updateDoc(userDocRef, { savedPosts: arrayRemove(obraId) });
        setFavoritos(prev => prev.filter(id => id !== obraId));
      }
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  if (loading) {
    return <View style={styles.container}><Text>Carregando obras...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{countryName}</Text>
        <View style={{ width: 24 }} /> 
      </View>
      <FlatList
        data={obras}
        renderItem={({ item }) => (
          <CartaoObra
            obra={item}
            onFavorite={handleFavorite}
            isFavorited={favoritos.includes(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.textoVazio}>Nenhuma obra encontrada para este país.</Text>}
      />
    </SafeAreaView>
  );
}

// Estilos parecidos com o AuthorDetail
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lista: {
    padding: 10,
  },
  cartaoObraContainer: {
    flex: 1/2,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    elevation: 2,
  },
  imagemObra: {
    width: '100%',
    aspectRatio: 1,
  },
  obraTitulo: {
    fontWeight: '600',
    padding: 8,
  },
  coracaoContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    borderRadius: 20,
  },
  textoVazio: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#999',
  }
}); 