

import {View, Text, Image, StyleSheet, Button, TextInput, ImageBackground, ScrollView} from 'react-native';


export default function Feed(){
    return(
        <ScrollView>
            <ImageBackground>
              <View style={estilo.containertexto}>    
            <Text style={estilo.containertexto}>
                Olá esse é o meu feed, aqui você encontrará informações importantes e totalmente aleatórias!
            </Text>
        <View>
        </View>
        
        <View style={estilo.containertexto2}>
        <Image style={estilo.tamanhoImg} source={require('../assets/SB.jpg')}/>
         <Text style={estilo.containertexto1}>
         Suicideboys (estilizado como $UICIDEBOY$ ) é uma dupla americana de hip hop de Nova Orleans, Louisiana . Formada em 2013 pelos primos Scrim (estilizado como $crim ) e Ruby da Cherry.
        </Text></View>

        <View style={estilo.containertexto}>
        <Image style={estilo.tamanhoImg} source={require('../assets/aurea.jpg')}/>
        </View>
        <View style={estilo.containertexto2}>
         <Text style={estilo.containertexto2}>
         A proporção áurea, representada pela letra grega φ (phi), é um número irracional que tem aproximadamente o valor de 1,618. Ela surge quando a razão entre duas partes de um todo é a mesma que a razão entre a soma dessas partes e a maior delas. Essa proporção é considerada esteticamente agradável e aparece frequentemente na natureza, na arte, na arquitetura e até mesmo em design moderno. A proporção áurea tem sido utilizada desde a Antiguidade, com destaque para a construção do Partenon, em Atenas, e obras de artistas como Leonardo da Vinci. Sua presença em diversos campos reflete sua harmonia e beleza universal.
        </Text>
        </View> 

        </View>
            </ImageBackground>
            </ScrollView>
 
    )}


const estilo=StyleSheet.create({
    containertexto : {
        flex: 1,
        color: '#000',
        alignSelf:'center',
        padding: 30,
        justifyContent: 'space-evenly'
        
    },
    containertexto1 : {
        flex: 2,
        color: '#000',
        alignSelf:'center',
        paddingTop: 20,
    },
    containertexto2 : {
        flex: 2,
        color: '#000',
        alignItems:'center',
        paddingTop: 20,

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

