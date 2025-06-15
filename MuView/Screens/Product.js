import {View, Text, StyleSheet, FlatList, TextInput, Button, Image} from 'react-native';
import { useEffect, useState } from 'react';
import CardProduct from '../components/cardProduct';
import { db } from '../controller';
import {collection,doc,getDocs} from "firebase/firestore";
import { useCarrinho } from '../CarrinhoProvider';

export default function Product({navigation}){

    const [produtos,setProdutos] = useState([])//Colchete diz que é um array 
    const {adicionarProduto} = useCarrinho();

    useEffect(() => { //É um hook do js, a gente usa quando for para renderizar cada vez que atualiza na tela
        async function carregarProdutos() {
            try{
                const querySnapshot = await getDocs(collection(db, 'produtos')); //Condição que precisa realizar antes de fazer a assync, getDocs(collection(db,'produtos)); isso pega as infos do banco
                const lista = []; //lista normal do js
                querySnapshot.forEach((doc) =>{  //Percorrer a constante para cada coisa na lista, e adiciona na lista(lista) os dados da lista, agora ele tem os itens, mas não foi mostrada ainda. 
                    lista.push({id:doc.id, ...doc.data()}); 
            });
            setProdutos(lista);//Em setProdutos foi colocado os dados da lista. É um state para trocar.
            } catch{
                console.log('Erro ao buscar o produto', Error);//Opcional
            }
        }
        carregarProdutos();
            
    }, []) //Isso só irá renderizar apenas uma vez, a função é para isso carregarProdutos(async), por que assíncrona?('Para usar o await, ela terá que esperar uma resposta para executar, ele carregará depois de realizar alguma condição anterior,')


    return(
        <View style={styles.container}>
            <Text style={styles.txt} >Produtos</Text>
            {/* {produtos.map((item) =>(
                <View>
                <Text>Id: {item.id}</Text>
                <br/>
                <Text>Nome: {item.nome}</Text>
                <br/>
                <Text>Valor em R${item.valor.toFixed(2)}</Text>
                <br/>
                </View>
            ))} */}
            <FlatList
            data={produtos}
            renderItem={({item}) =>(
                <CardProduct
                //id ={item.id}
                nome ={item.nome}
                valor ={item.valor}
                Imagem ={item.imagem}
                comprar={ () => {
                    adicionarProduto(item);
                    navigation.navigate('CarrinhoTab');
                    
                }}
                />
            )}
            keyExtractor={item => item.id}
            
            />
        </View>
    )
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