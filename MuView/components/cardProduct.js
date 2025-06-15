import {View, Text, Image, StyleSheet, Button} from 'react-native';

export default function CardProduct({id,nome,valor,Imagem, comprar}){
    return(
    <View style={styles.card}>
        <Image style={styles.img} source={{uri: Imagem}}/>
        <Text  style={styles.txtArray}>{id}</Text>
        <Text  style={styles.txtArray}>{nome} - R${valor.toFixed(2)}</Text>
        <Button title='Add ao carrinho' onPress={comprar}/>
    </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#abc',
        borderRadius: 10,
        height: 500,
        width: 500,
        justifyContent: 'space-around',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtArray:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'light-grey',

    },
    img:{
        width: 200,
        height: 200,
    }
})