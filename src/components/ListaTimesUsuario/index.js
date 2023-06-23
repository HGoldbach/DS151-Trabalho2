import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';


/**
 * Componente que exibe uma lista de times da NBA para o usuário.
 * Os times são buscados do banco de dados e exibidos em uma lista.
 * O usuário pode selecionar um time para ver mais detalhes.
 */
const ListaTimesUsuario = ({ navigation }) => {

    const [times, setTimes] = useState([]);

    /**
     * Função assíncrona para buscar os times inseridos no banco de dados.
     * Atualiza o estado 'times' com os dados obtidos.
     * Em caso de falha, exibe um alerta informando o erro.
     */
    const buscarTimesInseridos = async () => {
        try {
            const data = await NbaTime.listarTodos();
            const times = data.map(t => t);
            setTimes(times)
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao buscar os times inseridos')
        }
    };

    useEffect(() => {
        buscarTimesInseridos();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            buscarTimesInseridos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NBA TIMES</Text>
            <FlatList
                data={times}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Time Usuario", { data: item })}>
                                <Text style={styles.abbv}>{item.sigla}</Text>
                                <Text style={styles.fullName}>{item.nome}</Text>
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
})

export default ListaTimesUsuario;