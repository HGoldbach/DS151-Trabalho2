import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { timeImages } from '../../const/TimeData';

const DetalhesTimeUsuario = ({ navigation, route }) => {

    // Extrai as propriedades necessárias do objeto route.params.data
    const { id, idapi, sigla, nome, cidade, conferencia, divisao } = route.params.data;

    // Obtém o nome da imagem do logotipo do time com base no idApi
    const imageLogo = timeImages[idapi].image;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nome}</Text>
            <View>
                <Image source={{ uri: `https://i.imgur.com/${imageLogo}.png` }} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={styles.text}>Sigla: {sigla}</Text>
            <Text style={styles.text}>Cidade: {cidade}</Text>
            <Text style={styles.text}>Conferência: {conferencia}</Text>
            <Text style={styles.text}>Divisão: {divisao}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Editar Time", { data: id })}>
                    <Text style={styles.textBtn}>Editar</Text>
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

export default DetalhesTimeUsuario;

