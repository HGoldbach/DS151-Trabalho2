import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import NbaTime from "../../services/sqlite/NbaTime";


/**
 * Componente de edição de time da NBA.
 * Permite editar as informações de um time da NBA, como nome, sigla, cidade, conferência e divisão.
 */
const EditarTimeNBA = ({ navigation, route }) => {

    const [id, setId] = useState([]);

    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');
    const [cidade, setCidade] = useState('');
    const [conferencia, setConferencia] = useState('');
    const [divisao, setDivisao] = useState('');


    /**
     * Função assíncrona para recuperar as informações do time a ser editado.
     * Obtém o ID do time a partir dos parâmetros de rota e armazena-o no estado "id".
     * Em caso de erro, exibe uma mensagem de erro no console.
    */
    const recuperarTime = async () => {
        try {
            const idTime = await NbaTime.buscarTime(route.params.data);
            setId(idTime);
        } catch (erro) {
            console.error("Erro ao recuperar o time", erro);
        }
    }

    /**
     * Função assíncrona para editar o time.
     * Chama a função de atualização do NbaTime, passando o ID e as informações atualizadas do time.
     * Em caso de sucesso, navega para a tela "Usuario".
     * Em caso de erro, exibe uma mensagem de erro no console.
    */
    const editarTime = async () => {

        // Verifica se algum dos campos está vazio
        if (!nome || !sigla || !cidade || !conferencia || !divisao) {
            Alert.alert('Erro', 'Preencha todos os campos antes de salvar');
            return;
        }

        try {
            console.log("Editado");
            await NbaTime.update(id, { nome: nome, sigla: sigla, cidade: cidade, conferencia: conferencia, divisao: divisao })
                .then(() => navigation.navigate("Usuario"));
        } catch (erro) {
            console.error("Erro ao editar o time", erro);
            Alert.alert('Erro', 'Falha ao editar o time selecionado')
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
        height: 35,
        width: 250,
        borderWidth: 1,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 15
    },
    btn: {
        width: 250,
        height: 40,
        margin: 10,
        backgroundColor: '#00308F',
        padding: 10,
    },
    text: {
        color: '#00308F',
        textTransform: 'uppercase',
        fontSize: 15,
    },
    btnText: {
        color: 'white',
        textAlign: 'center'
    }
})

export default EditarTimeNBA;