
import {View, Text,Image,StyleSheet, Button, TextInput, ImageBackground} from 'react-native';
import { useState } from 'react';
import { db } from '../controller';
import {addDoc, collection,doc,getDocs} from "firebase/firestore";

export default function cadastroProduto({navigation}){

      const [valor, setValor] = useState("");
      const [nome, setNome] = useState("");
      const [imagem, setImagem] = useState("")

      const CadastrarProduct =  async () => {

        try{
            await addDoc(collection(db, 'produtos'), {
                nome,
                valor: parseFloat(valor),
                imagem
            });
                setNome();
                setValor();
                setImagem();
            }
            catch{
                console.log('Erro ao cadastrar produto!', Error)
            }
        }
    return(

            <ImageBackground >
              <View style={estilo.containertexto}>    
            <Text style={estilo.containertexto}>
          Olá seja bem vindo(a)!
          Aqui é sua tela de Cadastro dos Produtos!
          Digite os dados do Produto que deseja cadastrar:
         </Text>
          </View>

          <View style={estilo.containertexto}>    
          <Text style={estilo.containertexto1}>
          <TextInput
            placeholder="Valor"
            value={valor}
            onChangeText={setValor}
            placeholderTextColor={'black'}
        />
            <br></br>            <br></br>
        <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor={'black'}

        />
        <br></br><br></br>

        <TextInput
            placeholder="Imagem"
            value={imagem}
            onChangeText={setImagem}
            placeholderTextColor={'black'}
            />
            <br></br><br></br><br></br><br></br>

            <Button
            title="Cadastrar"
            color={'blue'}
            onPress={CadastrarProduct}
            />
            <br></br><br></br><br></br><br></br>

        </Text>        
        </View>

{ 

           }
            </ImageBackground>
 
    )
}


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

