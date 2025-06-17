import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Profile = ({ navigation, route }) => {
  const [user, setUser] = useState({
    name: 'Daniel',
    username: '@aeru',
    profileImage: null,
    followers: 0,
    following: 0,
  });

  const [createdPosts, setCreatedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Created');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    loadUserData();
    loadFavoritedPosts();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setEditName(parsedUser.name);
      }
    } catch (error) {
      console.log('Erro ao carregar dados do usuário:', error);
    }
  };

  const loadFavoritedPosts = async () => {
    try {
      const favoritedPosts = await AsyncStorage.getItem('favoritedPosts');
      if (favoritedPosts) {
        setSavedPosts(JSON.parse(favoritedPosts));
      }
    } catch (error) {
      console.log('Erro ao carregar posts favoritados:', error);
    }
  };

  const saveUserData = async (updatedUser) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.log('Erro ao salvar dados do usuário:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUser = { ...user, profileImage: result.assets[0].uri };
      saveUserData(updatedUser);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUser = { ...user, profileImage: result.assets[0].uri };
      saveUserData(updatedUser);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Alterar foto do perfil',
      'Escolha uma opção',
      [
        { text: 'Câmera', onPress: takePhoto },
        { text: 'Galeria', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      const updatedUser = { ...user, name: editName.trim() };
      saveUserData(updatedUser);
      setIsEditModalVisible(false);
    }
  };

  const renderPost = ({ item, index }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.image || item.uri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={showImagePicker} style={styles.profileImageContainer}>
          {user.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultProfileImage}>
              <Ionicons name="person" size={40} color="#999" />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <TouchableOpacity onPress={() => setIsEditModalVisible(true)}>
            <Text style={styles.profileName}>{user.name}</Text>
          </TouchableOpacity>
          <Text style={styles.profileUsername}>{user.username}</Text>
          <View style={styles.followInfo}>
            <Text style={styles.followText}>
              {user.followers} followers • {user.following} following
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Created' && styles.activeTab]}
          onPress={() => setActiveTab('Created')}
        >
          <Text style={[styles.tabText, activeTab === 'Created' && styles.activeTabText]}>
            Created
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Saved' && styles.activeTab]}
          onPress={() => setActiveTab('Saved')}
        >
          <Text style={[styles.tabText, activeTab === 'Saved' && styles.activeTabText]}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={activeTab === 'Created' ? createdPosts : savedPosts}
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={activeTab === 'Created' ? styles.row : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'Created' 
                ? 'Nenhuma foto criada ainda' 
                : 'Nenhuma foto favoritada ainda'
              }
            </Text>
          </View>
        }
      />

      {/* Modal para editar nome */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Nome</Text>
            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Digite seu nome"
              maxLength={50}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveName}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  profileUsername: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  followInfo: {
    alignItems: 'center',
  },
  followText: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  postItem: {
    width: (width - 6) / 3,
    aspectRatio: 1,
    marginBottom: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;