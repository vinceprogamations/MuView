

import {View, Text, Image, StyleSheet, Button, TextInput} from 'react-native';


export default function Test(){
    return(

        <View style={estilo.containertexto}>    
            <Text style={estilo.containertexto}>Olá esse é meu texto, e aqui você encontrará imagens raríssimas sobre a natureza na savana africana</Text>
        
        <View>
        <Image style={estilo.containerImage1} source={require('../assets/download.jpg')}/> 
        </View>
        <View style={estilo.containertexto1}>
         <Text style={estilo.containertexto1}>
            Incrível né? 
            É sempre de tirar o folêgo ver a natureza ao vivo e a cores, 
            sempre com uma qualidade altíssima! testetestetstetswtasUYDGVFYSAHCUID\SFEI 
            
        </Text></View>

        <View style={estilo.containerImages}>
        <Image style={estilo.tamanhoImg} source={{uri:'data:image/jpeg;base64,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'}}/>
        <Image style={estilo.tamanhoImg} source={require('../assets/pernalonga.jpg')}/> 
        </View>
        <View style={estilo.containertexto2}>
         <Text style={estilo.containertexto2}>
            Obrigado por acompanhar minha tela, espero que tenha gostado!!
            Por: Daniel da Silva Cardoso 3190 (2025)

        </Text>
        </View> 

        <TextInput
            placeholder="Mensagem"
            placeholderTextColor={'white'}

        />

        <TextInput
            placeholder="Nome"
            placeholderTextColor={'white'}

        />
        <Button
            title="Enviar"
            color={'#blue'}
            />



        </View>
    )
}


const estilo=StyleSheet.create({
    containertexto : {
        flex: 1,
        backgroundColor: '#add8e6',
        alignSelf:'left',
        padding: 20,
        justifyContent: 'space-evenly'
    },
    containertexto1 : {
        flex: 2,
        backgroundColor: '',
        alignSelf:'flex-end',
    },
    containertexto2 : {
        flex: 2,
        backgroundColor: '#ada7e6',
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
        padding:5,
        alignSelf: 'center'
    },

})

