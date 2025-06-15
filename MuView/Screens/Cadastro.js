

import {View, Text, Image, StyleSheet, Button, TextInput, ImageBackground} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';
import { useState } from 'react';

export default function Cadastro({navigation}){

      const [email, setEmail] = useState("");
      const [senha, setSenha] = useState("");

    const CadastroUsuário = () => {
        createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    console.log("Usuário cadastrado!", userCredential.user.email)
    navigation.navigate('TelaLogin')
  })
  .catch((error) => {

    console.log('error',error.message);
    // ..
  });
    }
    return(

            <ImageBackground >
              <View style={estilo.containertexto}>    
            <Text style={estilo.containertexto}>
          Olá seja bem vindo(a)!
          Aqui é sua tela de Cadastro!

          Digite seus dados para criar sua conta:


         </Text>
          </View>

          <View style={estilo.containertexto}>    
          <Text style={estilo.containertexto1}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'black'}

        />
            <br></br>            <br></br>

        <TextInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
            placeholderTextColor={'black'}

        />
        <br></br><br></br>

        <Button
            title="Cadastrar"
            color={'blue'}
            onPress={CadastroUsuário}
            />
            <br></br><br></br><br></br><br></br>

        </Text>        
        </View>


{/* 
        <View style={estilo.containertexto}>
        <Image style={estilo.tamanhoImg1} source={require('../assets/aizen.png')}/>
        </View>
           */}
            </ImageBackground>
 
    )}


const estilo=StyleSheet.create({
    containertexto : {
        flex: 1,
        color: '#000',
        alignSelf:'center',
        padding: 30,
        alignItems: 'center',
        
        flexDirection: 'column',
    },
    containertexto1 : {
        flex: 2,
        color: '#fff',
        alignSelf:'center',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'column',

    
    },
    containertexto2 : {
        flex: 2,
        color: '#fff',
        alignItems:'center',
    },
    containerImage1 : {
        flex: 2,
        width:200,
        height: 200,
        alignSelf:'flex-end'
    },
    containerImages: {
        flex: 4,
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    tamanhoImg: {
        width: 100,
        height:100,

    },
    txtinput:{
        borderWidth: 2,
        borderColor: 'black',
        borderRadius:5,
        padding:10,
        alignSelf: 'center'
    },
    tamanhoImg1: {
        width: 200,
        height:200,
    }

})

