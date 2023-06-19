import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import nba from '../../services/api/nba';

/** 
  * Componente responsável por exibir um painel de administração relacionado a times da NBA.
 */
const AdminDashboard = ({ navigation }) => {
    const [results, setResults] = useState([]);

    /**
      * Função para buscar os dados da API NBA.
     */
    const fetchData = async () => {
        try {
            const { data } = await nba.request();
            setResults(data.data);
        } catch (erro) {
            console.log(erro);
            Alert.alert('Erro', 'Falha na conexão com a API');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NBA Times</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Inseridos')}>
                <Text style={styles.btnText}>Times Inseridos</Text>
            </TouchableOpacity>
            <FlatList
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Detalhes Time', { data: item })}
                    >
                        <Text style={styles.abbv}>{item.abbreviation}</Text>
                        <Text style={styles.fullName}>{item.full_name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: '#00308F'
    },
    card: {
        backgroundColor: '#00308F1D',
        marginVertical: 10,
        width: 300,
        height: 80,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 20
    },
    abbv: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00308F'
    },
    fullName: {
        fontSize: 16,
        color: '#00308F'
    },
    btn: {
        marginTop: 20,
        width: 150,
        height: 40,
        backgroundColor: '#00308F',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14
    }
});

export default AdminDashboard;