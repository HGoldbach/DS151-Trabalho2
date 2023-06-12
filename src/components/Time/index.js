import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';

const Time = ({ route }) => {

    const [time, setTime] = useState([]);
    const [excluir, setExcluir] = useState(false);
    const [salvar, setSalvar] = useState(false);

    const recuperaDadosTime = () => {
        const time = route.params.data;
        setTime(time);
    }

    const inserirTime = () => {
        NbaTime.create({ nome: time.full_name, sigla: time.abbreviation, cidade: time.city, conferencia: time.conference, divisao: time.division })
            .then(id => console.log(`Time inserido com o id: ${id}, Nome: ${time.full_name}`))
            .catch(erro => console.error(erro))
    }

    useEffect(() => {
        recuperaDadosTime();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{time.full_name}</Text>
            <Text>Sigla: {time.abbreviation}</Text>
            <Text>Cidade: {time.city}</Text>
            <Text>Conferência: {time.conference}</Text>
            <Text>Divisão: {time.division}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={inserirTime}>
                    <Text style={styles.text}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnExcluir]} >
                    <Text style={styles.text}>Excluir</Text>
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
    btnExcluir: {
        backgroundColor: '#EA3C53',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 12,
    },
})

export default Time;