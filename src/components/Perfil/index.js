import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import Dialog from "react-native-dialog";
import DialogCodeInput from 'react-native-dialog/lib/CodeInput';
import DialogInput from 'react-native-dialog/lib/Input';

const Perfil = ({navigation}) => {

    const [visible, setVisible] = useState(false);
    const [senha, setSenha] = useState("");

    const acessoAdmin = () => {
        if (senha != '123') {
            setVisible(false);
            Alert.alert("Acesso Negado", "Senha inserida está incorreta");
            return;
        }

        navigation.navigate('Administrador');
    }

    const mostrarDialog = () => {
        setVisible(true);
    }

    const cancelarAcesso = () => {
        setVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de acesso</Text>
            <TouchableOpacity style={styles.btn} onPress={mostrarDialog}>
                <Text style={styles.text}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Usuario")}> 
                <Text style={styles.text}>Usuário</Text>
            </TouchableOpacity>
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Senha</Dialog.Title>
                    <Dialog.Description>
                        Insira a senha de admin para prosseguir
                    </Dialog.Description>
                    <DialogInput keyboardType='numeric' onChangeText={value => setSenha(value)} />
                    <Dialog.Button label="Cancelar" onPress={cancelarAcesso}/>
                    <Dialog.Button label="Continuar" onPress={acessoAdmin}/>
                </Dialog.Container>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    btn: {
        width: 250,
        height: 50,
        backgroundColor: '#00308F',
        padding: 10,
        marginBottom: 10
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 30,
        fontWeight: 800,
        marginBottom: 30
    }
})

export default Perfil;