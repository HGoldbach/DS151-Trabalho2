import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';



const HomeScreen = ({navigation}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function verificarAutenticacao() {
        const resposta = await LocalAuthentication.hasHardwareAsync();
        console.log(resposta);
        const tipos = await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log(tipos);
    }

    async function lidarAutenticacao() {
        const biometriaCadastrada = await LocalAuthentication.isEnrolledAsync();
        if(!biometriaCadastrada) {
            return Alert.alert('biometria', 'Nenhum biometria encontrada');
        }

        const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login',
            fallbackLabel: 'Biometria não reconhecida'
        });

        setIsAuthenticated(auth.success);

        if (isAuthenticated) {
            navigation.navigate('Perfil');
        }
    }

    useEffect(() => {
        verificarAutenticacao();
    },[])


    const image = { uri: 'https://wallpapercave.com/wp/UiA1t25.jpg' }
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                <Text style={styles.title}>Trabalho 2</Text>
                <TouchableOpacity style={styles.btn} onPress={lidarAutenticacao}>
                    <Text style={styles.text}>ENTRAR</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    btn: {
        width: 300,
        height: 50,
        marginLeft: 45,
        backgroundColor: '#00308F',
        padding: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 50,
        fontWeight: 800
    }
});

export default HomeScreen;