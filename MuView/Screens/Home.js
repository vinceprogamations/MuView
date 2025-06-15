import React, { useState } from 'react';
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

// Componente para os artistas em círculo
const CartaoArtista = ({ nome, imagem }) => (
  <TouchableOpacity style={styles.cartaoArtista}>
    <Image source={{ uri: imagem }} style={styles.imagemArtista} />
    <Text style={styles.nomeArtista}>{nome}</Text>
  </TouchableOpacity>
);

// Componente para as obras de arte
const CartaoObra = ({ imagem, estilo }) => (
  <TouchableOpacity style={[styles.cartaoObra, estilo]}>
    <Image source={{ uri: imagem }} style={styles.imagemObra} />
  </TouchableOpacity>
);

// Componente para o botão de navegação
const BotaoNav = ({ icone, ativo }) => (
  <TouchableOpacity style={[styles.botaoNav, ativo && styles.botaoNavAtivo]}>
    <Text style={[styles.iconeNav, ativo && styles.iconeNavAtivo]}>{icone}</Text>
  </TouchableOpacity>
);

export default function AppMuView() {
  const [artistas] = useState([
    {
      id: 1,
      nome: 'DaVinci',
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg/400px-Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg'
    },
    {
      id: 2,
      nome: 'Michelan.',
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Miguel_%C3%81ngel%2C_por_Daniele_da_Volterra_%28detalle%29.jpg/400px-Miguel_%C3%81ngel%2C_por_Daniele_da_Volterra_%28detalle%29.jpg'
    },
    {
      id: 3,
      nome: 'Botticelli',
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sandro_Botticelli_083.jpg/400px-Sandro_Botticelli_083.jpg'
    }
  ]);

  const [obrasArte] = useState([
    {
      id: 1,
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/757px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
    },
    {
      id: 2,
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/471px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg'
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>MuView</Text>
      </View>

      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
        {/* Imagem principal */}
        <View style={styles.containerImagemPrincipal}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Ivan_the_Terrible_and_His_Son_Ivan_on_November_16%2C_1581.jpg/640px-Ivan_the_Terrible_and_His_Son_Ivan_on_November_16%2C_1581.jpg'
            }}
            style={styles.imagemPrincipal}
          />
        </View>

        {/* Seção de Artistas */}
        <View style={styles.secaoArtistas}>
          {artistas.map((artista) => (
            <CartaoArtista
              key={artista.id}
              nome={artista.nome}
              imagem={artista.imagem}
            />
          ))}
        </View>

        {/* Seção de Obras de Arte */}
        <View style={styles.secaoObras}>
          <CartaoObra
            imagem={obrasArte[0].imagem}
            estilo={styles.obraEsquerda}
          />
          <CartaoObra
            imagem={obrasArte[1].imagem}
            estilo={styles.obraDireita}
          />
        </View>
      </ScrollView>

      {/* Barra de Navegação */}
      <View style={styles.barraNavegacao}>
        <BotaoNav icone="🏠" ativo={true} />
        <BotaoNav icone="❓" />
        <BotaoNav icone="🔍" />
        <BotaoNav icone="🔔" />
        <BotaoNav icone="👤" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cabecalho: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tituloCabecalho: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerImagemPrincipal: {
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imagemPrincipal: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  secaoArtistas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  cartaoArtista: {
    alignItems: 'center',
  },
  imagemArtista: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  nomeArtista: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  secaoObras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginBottom: 100,
  },
  cartaoObra: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  obraEsquerda: {
    width: '48%',
    height: 150,
  },
  obraDireita: {
    width: '48%',
    height: 150,
  },
  imagemObra: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  barraNavegacao: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  botaoNav: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
  },
  botaoNavAtivo: {
    backgroundColor: '#000',
  },
  iconeNav: {
    fontSize: 20,
    color: '#666',
  },
  iconeNavAtivo: {
    color: '#fff',
  },
});