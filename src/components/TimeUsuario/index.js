import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';
import { useEffect, useState } from 'react';

const TimeUsuario = ({ navigation, route }) => {

    const [time, setTime] = useState([]);

    const recuperaDadosTime = () => {
        const time = route.params.data;
        setTime(time);
    }

    useEffect(() => {
        recuperaDadosTime();
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{time.nome}</Text>
            <Text>Sigla: {time.sigla}</Text>
            <Text>Cidade: {time.cidade}</Text>
            <Text>Conferência: {time.conferencia}</Text>
            <Text>Divisão: {time.divisao}</Text>
            <Text>Divisão: {time.id}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Editar Time", {data: time.id})}>
                    <Text style={styles.text}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 800,
        textTransform: 'uppercase',
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 10
    },
    btn: {
        width: 80,
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

export default TimeUsuario;

