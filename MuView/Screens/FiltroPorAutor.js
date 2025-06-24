import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { db } from '../controller';
import { collection, getDocs } from 'firebase/firestore';

// Ei, essa é a tela que mostra todos os autores pra gente filtrar
// É tipo um catálogo de artistas, sabe?
export default function FiltrarPorAutor({ navigation }) {
  // Aqui a gente guarda a lista de autores que vem do banco
  const [autores, setAutores] = useState([]);
  // E aqui a gente controla se tá carregando ou não
  const [carregando, setCarregando] = useState(true);

  // Essa função aqui é tipo um useEffect que roda quando a tela abre
  // É como se fosse "ei, quando essa tela aparecer, vai lá no banco e pega os autores"
  useEffect(() => {
    const buscarAutores = async () => {
      try {
        // Aqui a gente vai no Firestore e pega todos os documentos da coleção 'artistas'
        // É tipo fazer uma consulta no banco de dados
        const querySnapshot = await getDocs(collection(db, 'artistas'));
        
        // Depois a gente transforma cada documento em um objeto mais fácil de usar
        // Cada autor vai ter um id e todos os outros dados dele
        const listaAutores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // E salva na nossa lista de autores
        setAutores(listaAutores);
      } catch (error) {
        // Se der algum erro, a gente só mostra no console mesmo
        console.error("Erro ao buscar autores:", error);
      } finally {
        // Independente se deu certo ou não, a gente para de carregar
        setCarregando(false);
      }
    };
    
    // Chama a função pra buscar os autores
    buscarAutores();
  }, []);

  // Essa função aqui é pra renderizar cada autor na lista
  // É tipo um template que vai ser usado pra cada autor
  const renderizarItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      // Quando clicar no autor, vai pra tela de detalhes dele
      onPress={() => navigation.navigate('AuthorDetail', { authorName: item.nome })}
    >
      {/* Aqui mostra a foto do autor */}
      <Image source={{ uri: item.imagem }} style={styles.authorImage} />
      {/* E aqui o nome dele */}
      <Text style={styles.authorName}>{item.nome}</Text>
    </TouchableOpacity>
  );

  // Se ainda tá carregando, mostra uma mensagem de "carregando..."
  if (carregando) {
    return <SafeAreaView style={styles.container}><Text>Carregando autores...</Text></SafeAreaView>;
  }

  // Aqui é o que a tela vai mostrar quando carregar tudo
  return (
    <SafeAreaView style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Filtrar por Autor</Text>
      
      {/* Aqui é a lista de autores */}
      <FlatList
        data={autores} // Lista de autores que a gente pegou do banco
        renderItem={renderizarItem} // Função que vai renderizar cada autor
        keyExtractor={item => item.id} // Chave única pra cada item
        numColumns={2} // Mostra 2 autores por linha
        contentContainerStyle={styles.list} // Estilo do container da lista
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum autor cadastrado ainda.</Text>} // Se não tiver autores, mostra essa mensagem
      />
    </SafeAreaView>
  );
}

// Aqui são os estilos da tela
// É tipo o CSS do React Native, sabe?
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#f8f9fa', // Cor de fundo bem clarinha
  },
  title: {
    fontSize: 24, // Tamanho da fonte do título
    fontWeight: 'bold', // Deixa o texto em negrito
    textAlign: 'center', // Centraliza o texto
    padding: 20, // Espaçamento em volta
  },
  list: {
    paddingHorizontal: 10, // Espaçamento nas laterais da lista
  },
  card: {
    flex: 1, // Cada card ocupa metade da largura (porque são 2 por linha)
    margin: 10, // Espaçamento entre os cards
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    padding: 15, // Espaçamento interno
    alignItems: 'center', // Centraliza o conteúdo
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Posição da sombra
    shadowOpacity: 0.1, // Transparência da sombra
    shadowRadius: 5, // Raio da sombra
    elevation: 3, // Sombra no Android
  },
  authorImage: {
    width: 100, // Largura da imagem
    height: 100, // Altura da imagem
    borderRadius: 50, // Deixa a imagem circular
    marginBottom: 10, // Espaçamento embaixo da imagem
  },
  authorName: {
    fontSize: 16, // Tamanho da fonte do nome
    fontWeight: '600', // Deixa um pouco em negrito
  },
  emptyText: {
    textAlign: 'center', // Centraliza o texto
    marginTop: 50, // Espaçamento em cima
    fontSize: 16, // Tamanho da fonte
    color: '#999', // Cor cinza
  },
}); 