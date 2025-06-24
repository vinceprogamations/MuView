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

// --- Tela de Registro --- //
export default function TelaCadastro({ navigation }) {
  // estados pra guardar o que o usuário digita
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false); // pra mostrar/esconder a senha
  const [carregando, setCarregando] = useState(false); // pra mostrar quando tá carregando

  // função que roda quando clica no botão de cadastrar
  const cadastrarUsuario = async () => {
    // verifica se preencheu tudo direitinho
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Opa!', 'Você precisa preencher todos os campos.');
      return;
    }

    setCarregando(true); // ativa o loading pra mostrar que tá processando
    try {
      // aqui a gente usa a função do firebase pra criar o usuário só na autenticação
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      console.log("Usuário cadastrado na autenticação!", userCredential.user.email);
      
      // se der tudo certo, mostra um alerta de sucesso
      Alert.alert(
        'Aê!', 
        'Sua conta foi criada com sucesso!',
        [
          {
            text: 'Beleza!',
            onPress: () => {
              // limpa os campos do formulário
              setEmail('');
              setSenha('');
              // e manda o usuário pra tela de login
              navigation.navigate('TelaLogin');
            }
          }
        ]
      );
    } catch (error) {
      // se der erro, a gente pega o código do erro pra mostrar uma mensagem mais amigável
      console.error('Erro ao criar conta:', error);
      let errorMessage = 'Não foi possível criar a conta. Tenta de novo.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Hmm, esse email já está sendo usado por outra pessoa.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Sua senha precisa ter pelo menos 6 caracteres, blz?';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Esse email não parece válido. Dá uma olhadinha de novo.';
      }
      
      Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
      setCarregando(false); // desativa o loading, dando certo ou errado
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Registrar</Text>
          <Text style={styles.subtitle}>Crie uma conta para continuar!</Text>

          {/* nosso formulário */}
          <View style={styles.form}>
            {/* campo do email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* campo da senha com o botão do olhinho */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <Ionicons 
                  name={mostrarSenha ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>

            {/* botão de cadastrar */}
            <TouchableOpacity 
              style={[styles.registerButton, carregando && styles.buttonDisabled]}
              onPress={cadastrarUsuario}
              disabled={carregando}
            >
              <Text style={styles.registerButtonText}>
                {carregando ? 'Criando...' : 'Registrar'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* rodapé com o link pra tela de login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('TelaLogin')}>
              <Text style={styles.loginLink}>Faça Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
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