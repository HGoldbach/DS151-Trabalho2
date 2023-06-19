import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


/**
 * Tela inicial do aplicativo.
 * Permite autenticação biométrica para acessar o perfil.
*/
const HomeScreen = ({ navigation }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Manipula a autenticação biométrica.
     * Verifica se a biometria está cadastrada e autentica o usuário.
    */
    async function lidarAutenticacao() {
        try {
            const biometriaCadastrada = await LocalAuthentication.isEnrolledAsync();
            if (!biometriaCadastrada) {
                return Alert.alert('biometria', 'Nenhum biometria encontrada');
            }

            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login',
                fallbackLabel: 'Biometria não reconhecida'
            });


            if (auth.success) {
                setIsAuthenticated(true);
                navigation.navigate('Perfil');
            }
        }
        catch (erro) {
            Alert.alert('Erro', 'Ocorreu um erro durante a autenticação.');
        }
    }

    const image = { uri: 'https://wallpapercave.com/wp/UiA1t25.jpg' }

    useEffect(() => {
        // Redireciona para a tela de perfil se o usuário estiver autenticado
        if (isAuthenticated) {
            navigation.navigate('Perfil');
        }
    }, [isAuthenticated])

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                <Text style={styles.title}>Trabalho 2</Text>
                <TouchableOpacity style={styles.btn} onPress={lidarAutenticacao}>
                    <Text style={styles.btnText}>ENTRAR</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    btn: {
        backgroundColor: '#00308F',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '80%',
        maxWidth: 300,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default HomeScreen;