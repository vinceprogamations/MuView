import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { db } from '../controller';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function BandeirasPaises({ navigation }) {
  const [paises, setPaises] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // busca países e suas obras
  useEffect(() => {
    const buscarPaisesEObras = async () => {
      try {
        setCarregando(true);
        
        // busca todos os países
        const paisesSnapshot = await getDocs(collection(db, 'paises'));
        const listaPaises = paisesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // para cada país, busca quantas obras tem
        const paisesComObras = await Promise.all(
          listaPaises.map(async (pais) => {
            const obrasRef = collection(db, 'obras');
            const q = query(obrasRef, where("pais", "==", pais.nome));
            const obrasSnapshot = await getDocs(q);
            return {
              ...pais,
              quantidadeObras: obrasSnapshot.size
            };
          })
        );
        
        // filtra só países que têm obras
        const paisesComObrasFiltrados = paisesComObras.filter(pais => pais.quantidadeObras > 0);
        setPaises(paisesComObrasFiltrados);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarPaisesEObras();
  }, []);

  // renderiza cada bandeira
  const renderizarBandeira = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CountryDetail', { countryName: item.nome })}
    >
      <Image source={{ uri: item.bandeira }} style={styles.flag} />
      <Text style={styles.countryName}>{item.nome}</Text>
      <Text style={styles.obraCount}>{item.quantidadeObras} obra{item.quantidadeObras !== 1 ? 's' : ''}</Text>
    </TouchableOpacity>
  );

  if (carregando) {
    return <SafeAreaView style={styles.container}><Text>Carregando países...</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Países</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={paises}
        renderItem={renderizarBandeira}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum país com obras encontrado.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
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
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  obraCount: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
}); 