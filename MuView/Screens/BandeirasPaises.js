import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { db } from '../controller';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

// Remove acentos e espaços para comparar textos
const normalizarTexto = (texto) => {
  if (!texto) return '';
  return texto.toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export default function BandeirasPaises({ navigation }) {
  // Estados do componente
  const [paises, setPaises] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(true);

  // Busca dados quando carrega a tela
  useEffect(() => {
    const buscarPaisesEObras = async () => {
      try {
        setCarregando(true);
        
        // Busca todos os países do banco
        const paisesSnapshot = await getDocs(collection(db, 'paises'));
        const listaPaises = paisesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Busca todas as obras do banco
        const obrasSnapshot = await getDocs(collection(db, 'obras'));
        const todasObras = obrasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Debug: mostra o que encontrou
        console.log('=== DEBUG ===');
        console.log('Países encontrados:', listaPaises.map(p => p.nome));
        console.log('Países das obras:', [...new Set(todasObras.map(o => o.pais))]);
        
        // Para cada país, conta quantas obras tem
        const paisesComObras = listaPaises.map(pais => {
          const paisNormalizado = normalizarTexto(pais.nome); // "Itália" vira "italia"
          
          // Filtra obras que pertencem a este país
          const obrasDestePais = todasObras.filter(obra => {
            const obraPaisNormalizado = normalizarTexto(obra.pais); // "Italia" vira "italia"
            return obraPaisNormalizado === paisNormalizado; // Compara "italia" == "italia"
          });
          
          console.log(`${pais.nome} (normalizado: "${paisNormalizado}") = ${obrasDestePais.length} obras`);
          
          // Retorna país com a contagem de obras
          return {
            ...pais,
            quantidadeObras: obrasDestePais.length
          };
        });
        
        // Decide quais países mostrar baseado no filtro
        if (mostrarTodos) {
          setPaises(paisesComObras); // Mostra todos
        } else {
          const paisesComObrasFiltrados = paisesComObras.filter(pais => pais.quantidadeObras > 0);
          setPaises(paisesComObrasFiltrados); // Só países com obras
        }
        
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      } finally {
        setCarregando(false); // Para o loading
      }
    };
    
    buscarPaisesEObras();
  }, [mostrarTodos]); // Roda novamente se 'mostrarTodos' mudar

  // Alterna entre mostrar todos ou só com obras
  const alternarFiltro = () => {
    setMostrarTodos(!mostrarTodos);
  };

  // Como cada país vai aparecer na lista
  const renderizarBandeira = ({ item }) => (
    <TouchableOpacity 
      style={styles.paisCard}
      onPress={() => navigation.navigate('CountryDetail', { countryName: item.nome })}
    >
      <Image source={{ uri: item.bandeira }} style={styles.bandeira} />
      <Text style={styles.nomePais}>{item.nome}</Text>
      <Text style={styles.quantidadeObras}>
        {item.quantidadeObras} obra{item.quantidadeObras !== 1 ? 's' : ''}
      </Text>
    </TouchableOpacity>
  );

  // Tela de loading
  if (carregando) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.carregando}>Carregando países...</Text>
      </SafeAreaView>
    );
  }

  // Tela principal
  return (
    <SafeAreaView style={styles.container}>
      {/* Header com título e botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.botaoVoltar}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Países</Text>
        <View style={styles.espacoVazio} />
      </View>
      
      {/* Botões de ação */}
      <View style={styles.containerBotoes}>
        <TouchableOpacity 
          style={styles.botaoAdicionar}
          onPress={() => navigation.navigate('RegistroBandeira')}
        >
          <Ionicons name="add" size={20} color="#007AFF" />
          <Text style={styles.textoBotaoAdicionar}>Adicionar País</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoBuscar}
          onPress={() => navigation.navigate('BuscarPais')}
        >
          <Ionicons name="search" size={20} color="#007AFF" />
          <Text style={styles.textoBotaoAdicionar}>Buscar País</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de filtro */}
      <View style={styles.containerFiltro}>
        <TouchableOpacity 
          style={[styles.botaoFiltro, mostrarTodos && styles.botaoFiltroAtivo]}
          onPress={alternarFiltro}
        >
          <Text style={[styles.textoFiltro, mostrarTodos && styles.textoFiltroAtivo]}>
            {mostrarTodos ? 'Mostrando todos' : 'Só com obras'}
          </Text>
          <Text style={styles.contadorPaises}>
            ({paises.length} país{paises.length !== 1 ? 'es' : ''})
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Lista de países em grid */}
      <FlatList
        data={paises}
        renderItem={renderizarBandeira}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            {mostrarTodos ? 'Nenhum país cadastrado ainda.' : 'Nenhum país com obras encontrado.'}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  botaoVoltar: {
    padding: 4,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  espacoVazio: {
    width: 32,
  },
  containerBotoes: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  botaoAdicionar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  botaoBuscar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  textoBotaoAdicionar: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  containerFiltro: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  botaoFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#007AFF',
  },
  textoFiltro: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  textoFiltroAtivo: {
    color: '#FFFFFF',
  },
  contadorPaises: {
    fontSize: 12,
    color: '#999',
  },
  grid: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  paisCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bandeira: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  nomePais: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  quantidadeObras: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  carregando: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});