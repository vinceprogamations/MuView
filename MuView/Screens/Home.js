import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../controller'; 
import { Ionicons } from '@expo/vector-icons';

// --- COMPONENTES --- //

// esse é o componente pra mostrar cada artista na bolinha
// agora ele navega pra tela de detalhes do artista quando é clicado
const CartaoArtista = ({ artista, navigation }) => (
  <TouchableOpacity 
    style={styles.cartaoArtista}
    onPress={() => navigation.navigate('AuthorDetail', { authorName: artista.nome })}
  >
    <Image source={{ uri: artista.imagem }} style={styles.imagemArtista} />
    <Text style={styles.nomeArtista}>{artista.nome}</Text>
  </TouchableOpacity>
);

// esse aqui é pras fotinhas das obras de arte
// adicionei o coração pra favoritar
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
  </View>
);

// --- TELA PRINCIPAL --- //

export default function TelaInicial({ navigation }) {
  const [artistas, setArtistas] = useState([]);
  const [obras, setObras] = useState([]);
  const [favoritos, setFavoritos] = useState([]); // lista de IDs das obras favoritas

  // essa função vai ser chamada toda vez que a tela for focada
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarDados();
      buscarFavoritosDoUsuario();
    });
    return unsubscribe;
  }, [navigation]);

  // função pra buscar os dados no firebase
  const buscarDados = async () => {
    try {
      // busca artistas
      const artistasSnapshot = await getDocs(collection(db, 'artistas'));
      const listaArtistas = artistasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArtistas(listaArtistas);

      // busca obras
      const obrasSnapshot = await getDocs(collection(db, 'obras'));
      const listaObras = obrasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setObras(listaObras);

    } catch (erro) {
      console.log('Erro ao buscar dados:', erro);
    }
  };
  
  // função pra buscar os favoritos do usuário
  const buscarFavoritosDoUsuario = async () => {
    const user = auth.currentUser;
    if (user) {
      // a gente vai salvar os favoritos dentro do documento de cada usuário
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().savedPosts) {
        setFavoritos(userDoc.data().savedPosts);
      }
    }
  };

  // função pra lidar com o clique no coração
  const lidarComFavorito = async (obraId, deveFavoritar) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Você precisa estar logado para favoritar!");
      return;
    }
    
    const userDocRef = doc(db, 'users', user.uid);
    
    try {
      if (deveFavoritar) {
        // adiciona o ID da obra no array de 'savedPosts' do usuário
        await updateDoc(userDocRef, { savedPosts: arrayUnion(obraId) });
        setFavoritos(prev => [...prev, obraId]); // atualiza o estado local
      } else {
        // remove o ID da obra do array
        await updateDoc(userDocRef, { savedPosts: arrayRemove(obraId) });
        setFavoritos(prev => prev.filter(id => id !== obraId)); // atualiza o estado local
      }
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => navigation.navigate('MainApp')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.tituloCabecalho}>MuView</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.containerImagemPrincipal}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Ivan_the_Terrible_and_His_Son_Ivan_on_November_16%2C_1581.jpg/640px-Ivan_the_Terrible_and_His_Son_Ivan_on_November_16%2C_1581.jpg'
            }}
            style={styles.imagemPrincipal}
          />
        </View>

        <Text style={styles.tituloSecao}>Artistas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.secaoArtistas}>
          {artistas.map((artista) => (
            <CartaoArtista
              key={artista.id}
              artista={artista}
              navigation={navigation}
            />
          ))}
        </ScrollView>

        <Text style={styles.tituloSecao}>Obras</Text>
        <View style={styles.secaoObras}>
          {obras.map((obra) => (
            <CartaoObra
              key={obra.id}
              obra={obra}
              onFavorite={lidarComFavorito}
              isFavorited={favoritos.includes(obra.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* A barra de navegação foi removida daqui pra usar a do App.js */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  tituloCabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  conteudo: {
    flex: 1,
  },
  containerImagemPrincipal: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imagemPrincipal: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  secaoArtistas: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 20,
  },
  cartaoArtista: {
    alignItems: 'center',
    marginRight: 20,
  },
  imagemArtista: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#eee',
  },
  nomeArtista: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  secaoObras: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cartaoObraContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  imagemObra: {
    width: '100%',
    height: '100%',
  },
  coracaoContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    borderRadius: 20,
  },
}); 