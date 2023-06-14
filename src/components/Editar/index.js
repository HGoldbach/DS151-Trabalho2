import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import NbaTime from "../../services/sqlite/NbaTime";

const Editar = ({ route }) => {

    const [id, setId] = useState([]);
    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');
    const [cidade, setCidade] = useState('');
    const [conferencia, setConferencia] = useState('');
    const [divisao, setDivisao] = useState('');

    const recuperarTime = async () => {
        try {
            const idTime = await NbaTime.buscarTime(route.params.data);
            setId(idTime);
        } catch (error) {
            console.error(error);
        }
    }

    const editarTime = async () => {
        const number = number(id);
        try {
            console.log("Editado");
            await NbaTime.update(number, { nome: nome, sigla: sigla, cidade: cidade, conferencia: conferencia, divisao: divisao })
            .then(() => console.log("Time editado com sucesso"));
        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(() => {
        recuperarTime();
    }, [])



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Time</Text>
            <View>
                <Text style={styles.text}>Nome</Text>
                <TextInput style={styles.input} onChangeText={valor => setNome(valor)} value={nome}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Sigla</Text>
                <TextInput style={styles.input} onChangeText={valor => setSigla(valor)} value={sigla}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Cidade</Text>
                <TextInput style={styles.input} onChangeText={valor => setCidade(valor)} value={cidade}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Conferência</Text>
                <TextInput style={styles.input} onChangeText={valor => setConferencia(valor)} value={conferencia}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Divisão</Text>
                <TextInput style={styles.input} onChangeText={valor => setDivisao(valor)} value={divisao}></TextInput>
            </View>
            <TouchableOpacity style={styles.btn} onPress={editarTime}>
                <Text style={[styles.text, styles.btnText]}>Salvar</Text>
            </TouchableOpacity>
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
        fontSize: 26,
        fontWeight: 700,
        textTransform: 'uppercase',
        marginBottom: 20
    },
    input: {
        height: 40,
        width: 300,
        borderWidth: 2,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20
    },
    btn: {
        width: 300,
        height: 50,
        margin: 10,
        backgroundColor: '#01796F',
        padding: 10,
    },
    text: {
        color: '#01796F',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    btnText: {
        color: 'white',
    }
})

export default Editar;