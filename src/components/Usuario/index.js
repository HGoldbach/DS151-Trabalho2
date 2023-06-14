import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';
import { useEffect, useState } from 'react';

const Usuario = ({navigation}) => {

    const [times,setTimes] = useState([]);

    const buscarTimesInseridos = async () => {
        try {
            const data = await NbaTime.listarTodos();
            const times = data.map(t => t);
            console.log(times);
            setTimes(times)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        buscarTimesInseridos();
    },[])

    return(
        <View style={styles.container}> 
            <Text style={styles.title}>NBA TIMES</Text>
            <FlatList 
                data={times}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Time Usuario", {data: item})}>
                                <Text>{item.sigla}</Text>
                                <Text>{item.nome}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 800,
        color: '#00308F'
    },
    card: {
        backgroundColor: '#00308F1D',
        marginVertical: 10,
        width: 300,
        height: 60,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },
    btn: {
        width: 200,
        height: 40,
        backgroundColor: '#00308F',
        padding: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 12,
    },
})

export default Usuario;