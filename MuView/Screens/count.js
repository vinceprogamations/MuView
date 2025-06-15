
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useState } from 'react';


export default function Count(){

    const [contador, setContador] = useState(0);

    function Aumentar(){

        setContador(contador + 1)

    } 

    function Diminuir(){
        if (contador > 0){
            setContador(contador - 1)
        }
    } 
       return(
        <View style={styles.container}>
            <Text style={styles.title}> Meu contador</Text>
            <Text style={styles.txt}> {contador} </Text>
            <View style={styles.bots} >
            <TouchableOpacity
            style={styles.Button}
            onPress={Aumentar}>
                +
                </TouchableOpacity>

       <TouchableOpacity
            style={styles.Button}
            onPress={Diminuir}>
                -
                </TouchableOpacity>

  
             </View>   

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 40,
        color: 'grey',
    },
    txt:{
        fontSize:30,
        color: 'black'
    },
    bots:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 400

    },
    Button:{
        backgroundColor:'purple',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%'
    }
})