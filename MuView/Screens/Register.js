import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';

export default function Register() {
  // Estados pra guardar os valores dos campos
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Controla se a senha fica visível
  const [loading, setLoading] = useState(false); // Mostra quando tá processando o cadastro

  // Função que é chamada quando o usuário aperta o botão de cadastrar
  const RegistroUsuario = async () => {
    // Verifica se o cara preencheu os campos
    if (!name.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true); // Ativa o loading pra mostrar que tá processando
    try {
      // Aqui você pode implementar sua lógica de registro
      // Por enquanto, só simula o cadastro
      console.log('Usuário cadastrado!', name);
      Alert.alert(
        'Sucesso!', 
        'Conta criada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpa os campos depois que deu certo
              setName('');
              setPassword('');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false); // Desativa o loading quando termina (deu certo ou errado)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Barra do topo com botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create an account to continue!</Text>

          {/* Formulário com os campos de entrada */}
          <View style={styles.form}>
            {/* Campo pra digitar o nome */}
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words" // Deixa a primeira letra de cada palavra maiúscula
            />

            {/* Campo da senha com botão de mostrar/esconder */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // Esconde a senha se showPassword for false
                autoCapitalize="none"
              />
              {/* Botão do olhinho pra mostrar ou esconder senha */}
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>

            {/* Botão de cadastrar que fica cinza quando tá carregando */}
            <TouchableOpacity 
              style={[styles.registerButton, loading && styles.buttonDisabled]}
              onPress={RegistroUsuario}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'Creating...' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Rodapé com link pra tela de login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => Alert.alert('Info', 'Login screen not implemented yet')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  form: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  eyeButton: {
    padding: 16,
  },
  registerButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
});