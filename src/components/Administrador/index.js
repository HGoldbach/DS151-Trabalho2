import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import nba from '../../services/api/nba';

const Administrador = ({navigation}) => {


    const [results, setResults] = useState([]);

    const chamaApi = async () => {
        const {data} = await nba.request();
        console.log(data.data);
        setResults(data.data);
    }

    const dadosTime = time => {
        console.log(time);
    }

    useEffect(() => {
        chamaApi();
    }, []);

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>NBA TIMES</Text>
            <FlatList 
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Time', {data: item})}>
                                <Text style={styles.abbv}>{item.abbreviation}</Text>
                                <Text>{item.full_name}</Text>
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
        alignItems: 'center'
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
    abbv: {
        
    }
})

export default Administrador;