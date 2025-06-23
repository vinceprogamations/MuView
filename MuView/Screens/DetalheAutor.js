import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../controller';
import { Ionicons } from '@expo/vector-icons';

// --- Componente: Cartão da Obra (reutilizado) --- //
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

// --- Tela de Detalhes do Autor --- //
export default function DetalheAutor({ route, navigation }) {
  // a gente pega o nome do autor que foi passado como parâmetro na navegação
  const { authorName } = route.params;
  
  // estados pra guardar as obras, o loading e os favoritos
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  // busca os dados assim que a tela abre
  useEffect(() => {
    buscarObrasDoAutor();
    buscarFavoritosDoUsuario();
  }, [authorName]); // se o nome do autor mudar, a gente busca de novo

  // função que busca no firebase só as obras que são do autor específico
  const buscarObrasDoAutor = async () => {
    try {
      setLoading(true);
      const obrasRef = collection(db, 'obras');
      // aqui tá a mágica: o 'where' filtra os documentos onde o campo "autor" é igual ao 'authorName'
      const q = query(obrasRef, where("autor", "==", authorName));
      const querySnapshot = await getDocs(q);
      const listaObras = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setObras(listaObras);
    } catch (error) {
      console.error("Deu ruim ao buscar as obras do autor:", error);
    } finally {
      setLoading(false);
    }
  };

  // essa função é a mesma da Home, pra saber o que já tá favoritado
  const buscarFavoritosDoUsuario = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().savedPosts) {
        setFavoritos(userDoc.data().savedPosts);
      }
    }
  };

  // essa função também é a mesma da Home, pra favoritar/desfavoritar
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
      console.error("Deu ruim na hora de favoritar:", error);
    }
  };

  // enquanto carrega, a gente mostra uma mensagem
  if (loading) {
    return <SafeAreaView style={styles.container}><Text>Carregando obras...</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* cabeçalho com o botão de voltar e o nome do artista */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{authorName}</Text>
        <View style={{ width: 24 }} /> 
      </View>
      
      {/* a FlatList é ótima pra mostrar listas, principalmente se forem grandes */}
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
        numColumns={2} // pra mostrar em duas colunas
        contentContainerStyle={styles.lista}
        // o que mostrar se a lista estiver vazia
        ListEmptyComponent={<Text style={styles.textoVazio}>Nenhuma obra encontrada para este autor.</Text>}
      />
    </SafeAreaView>
  );
}

// Estilos
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