import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';
import { timeImages } from '../../const/TimeData';


/**
 * Componente de exibição de detalhes de um time da NBA.
 */
const DetalhesTime = ({ navigation, route }) => {
    const { id, full_name, abbreviation, city, conference, division } = route.params.data;
    const imageLogo = timeImages[id].image;

    /**
     * Função de confirmação para inserir o time no banco de dados.
    */
    const inserirConfirmacao = () =>
        Alert.alert(`Inserir ${full_name}`, 'Aperte OK para confirmar a inserção do time', [
            { text: 'OK', onPress: inserirTime },
        ]);

    /**
     * Função assíncrona para inserir o time no banco de dados.
     * Utiliza a função NbaTime.create para realizar a inserção.
    */    
    const inserirTime = async () => {
        try {
            const idTime = await NbaTime.create({ idApi: id, nome: full_name, sigla: abbreviation, cidade: city, conferencia: conference, divisao: division });
            console.log(`Time inserido com o id: ${idTime}, Nome: ${full_name}`)
                navigation.navigate("Inseridos")
        } catch (erro) {
            console.error("Erro ao inserir o time", erro);
            Alert.alert('Erro ao inserir', `O Time já existe no banco de dados!`);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{full_name}</Text>
            <View>
                <Image source={{ uri: `https://i.imgur.com/${imageLogo}.png` }} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={styles.text}>Sigla: {abbreviation}</Text>
            <Text style={styles.text}>Cidade: {city}</Text>
            <Text style={styles.text}>Conferência: {conference}</Text>
            <Text style={styles.text}>Divisão: {division}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={inserirConfirmacao}>
                    <Text style={styles.textBtn}>Salvar</Text>
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
        width: 150,
        height: 40,
        backgroundColor: '#00308F',
        padding: 10,
        marginTop: 20
    },
    text: {
        fontSize: 15,
        fontWeight: 600,

    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 15,
    },
})

export default DetalhesTime;