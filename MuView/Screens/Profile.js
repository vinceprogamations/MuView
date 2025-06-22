import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../controller'; // Trazendo o auth e o db do controller
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Componente principal do perfil
export default function Profile({ navigation }) {
  // estados pra guardar os dados do usuário e das obras salvas
  const [user, setUser] = useState(null); // o usuário da autenticação
  const [profile, setProfile] = useState(null); // os dados do perfil (nome, foto, etc)
  const [savedPosts, setSavedPosts] = useState([]); // as obras salvas (objetos completos)
  const [loading, setLoading] = useState(true);

  // esse useEffect fica "ouvindo" se o usuário está logado ou não
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // se tem usuário, a gente guarda ele no estado e busca o perfil
        setUser(currentUser);
        fetchUserProfile(currentUser.uid);
      } else {
        // se não tem, manda pra tela de login
        navigation.navigate('TelaLogin');
      }
    });
    // função de limpeza pra parar de "ouvir" quando a tela fecha
    return unsubscribe;
  }, []);

  // função que busca os dados do perfil do usuário no firestore
  const fetchUserProfile = async (uid) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfile(userData);
        // se o usuário tiver um array de 'savedPosts', a gente busca os detalhes
        if (userData.savedPosts && userData.savedPosts.length > 0) {
          fetchSavedPostsDetails(userData.savedPosts);
        } else {
          setSavedPosts([]); // se não tiver, a lista fica vazia
          setLoading(false);
        }
      } else {
        // isso aqui é uma segurança: se o usuário foi autenticado mas não tem perfil no banco,
        // a gente cria um perfil básico pra ele na hora
        console.log("Usuário sem perfil no Firestore, criando um agora...");
        const newProfile = { name: 'Novo Usuário', username: `@novo_usuario`, savedPosts: [] };
        await setDoc(userDocRef, newProfile);
        setProfile(newProfile);
        setLoading(false);
      }
    } catch (error) {
      console.error("Deu ruim ao buscar o perfil:", error);
      setLoading(false);
    }
  };

  // função pra buscar os detalhes das obras que o usuário favoritou
  const fetchSavedPostsDetails = async (postIds) => {
    try {
      const obrasRef = collection(db, "obras");
      // aqui a gente busca na coleção 'obras' todos os documentos cujo ID está na nossa lista de 'postIds'
      const q = query(obrasRef, where("__name__", "in", postIds));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedPosts(posts); // guarda a lista de objetos completos das obras
    } catch (error) {
      console.error("Deu ruim ao buscar os detalhes dos posts salvos:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // função pra deixar o usuário mudar a foto de perfil com uma URL
  const handleChangeProfileImage = () => {
    Alert.prompt(
      "Alterar Foto de Perfil",
      "Cole a URL da sua nova imagem aqui:",
      async (url) => {
        if (url && user) {
          const userDocRef = doc(db, 'users', user.uid);
          // atualiza o campo 'profileImage' no firestore
          await updateDoc(userDocRef, { profileImage: url });
          // atualiza o estado local pra gente ver a mudança na hora
          setProfile(prevProfile => ({ ...prevProfile, profileImage: url }));
        }
      },
      'plain-text',
      profile?.profileImage || ''
    );
  };

  if (loading || !profile) {
    return <SafeAreaView style={styles.container}><Text>Carregando perfil...</Text></SafeAreaView>;
  }

  // Componente que renderiza o cabeçalho do perfil
  const renderHeader = () => (
    <View style={styles.profileSection}>
      <TouchableOpacity onPress={handleChangeProfileImage}>
        {profile.profileImage ? (
          <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
        ) : (
          // se não tiver foto, mostra um ícone padrão
          <View style={styles.defaultProfileImage}>
            <Ionicons name="person" size={50} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileUsername}>{profile.username}</Text>
      <View style={styles.followInfo}>
        <Text style={styles.followText}>
          {profile.followers || 0} followers • {profile.following || 0} following
        </Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Salvos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={savedPosts}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Image source={{ uri: item.imagem }} style={styles.postImage} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não salvou nada.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#eee',
  },
  defaultProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
  },
  profileUsername: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  followInfo: {
    marginTop: 12,
  },
  followText: {
    fontSize: 14,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    justifyContent: 'center',
  },
  activeTab: {
    paddingVertical: 12,
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  activeTabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  postItem: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});