import {View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { auth } from '../controller';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({navigation}){
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    const VerificaUser = () => {
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            navigation.navigate('Home');
        })
        .catch((error) => {
            console.log('Erro ao logar!', error.message);
        });
    }
    
    return(
        <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <SafeAreaView style={estilo.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#F5E6D3" />
                
                {/* Header */}
                <View style={estilo.header}>
                    <Text style={estilo.appName}>MuView</Text>
                </View>
                
                {/* Login Card */}
                <View style={estilo.loginCard}>
                {/* Icon */}
                <View style={estilo.iconContainer}>
                    <MaterialIcons name="account-balance" size={40} color="#2C3E50" />
                </View>
                
                {/* Title */}
                <Text style={estilo.loginTitle}>Login</Text>
                <Text style={estilo.loginSubtitle}>Digite seu email e senha para entrar</Text>
                
                {/* Email Input */}
                <View style={estilo.inputContainer}>
                    <TextInput
                        style={estilo.input}
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#8E8E93"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                
                {/* Password Input */}
                <View style={estilo.inputContainer}>
                    <TextInput
                        style={estilo.input}
                        placeholder="••••••••"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#8E8E93"
                    />
                    <TouchableOpacity 
                        style={estilo.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Entypo 
                            name={showPassword ? "eye" : "eye-with-line"} 
                            size={20} 
                            color="#8E8E93" 
                        />
                    </TouchableOpacity>
                </View>
                
                {/* Remember Me & Forgot Password */}
                <View style={estilo.optionsContainer}>
                    <TouchableOpacity 
                        style={estilo.rememberContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View style={[estilo.checkbox, rememberMe && estilo.checkboxChecked]}>
                            {rememberMe && <Entypo name="check" size={12} color="#007AFF" />}
                        </View>
                        <Text style={estilo.rememberText}>Lembre-me</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style={estilo.forgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Login Button */}
                <TouchableOpacity style={estilo.loginButton} onPress={VerificaUser}>
                    <Text style={estilo.loginButtonText}>Entrar</Text>
                </TouchableOpacity>
                
                {/* Divider */}
                <Text style={estilo.dividerText}>Ou entre com</Text>
                
                {/* Sign Up Button */}
                <TouchableOpacity 
                    style={estilo.signUpButton} 
                    onPress={() => navigation.navigate('TelaCadastro')}
                >
                    <Text style={estilo.signUpButtonText}>Cadastrar</Text>
                </TouchableOpacity>
                            </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5E6D3',
    },
    header: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 40,
    },
    appName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2C3E50',
    },
    loginCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#E9ECEF',
    },
    loginTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 8,
    },
    loginSubtitle: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#2C3E50',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#E3F2FD',
        borderColor: '#007AFF',
    },
    rememberText: {
        fontSize: 14,
        color: '#6B7280',
    },
    forgotText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    dividerText: {
        textAlign: 'center',
        color: '#8E8E93',
        fontSize: 14,
        marginBottom: 20,
    },
    signUpButton: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});