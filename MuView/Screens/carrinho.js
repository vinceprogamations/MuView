
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

import { useCarrinho } from '../CarrinhoProvider';

export default function Carrinho() {
    const {carrinho} = useCarrinho();


    return(
        <View style={styles.container}>
            <Text style={styles.txt}></Text>
            <FlatList
                data={carrinho}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Image style={styles.img} source={{uri: item.imagem}}     />
                        <Text style={styles.txtArray}>{item.nome}</Text>
                        <Text style={styles.txtArray}>R$ {item.valor}</Text>
                    </View>

                )}
            />
        </View>

    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
    txt:{
        fontSize: 25,
        color: 'black'
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