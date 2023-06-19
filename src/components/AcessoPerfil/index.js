import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Dialog from "react-native-dialog";
import DialogInput from 'react-native-dialog/lib/Input';

const AcessoPerfil = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [senha, setSenha] = useState("");

    /**
     * Função para verificar o acesso de administrador.
     * Navega para a tela 'NBAAdmin' se a senha for correta, caso contrário, exibe um alerta.
     */
    const acessoAdmin = () => {
        if (senha != '123') {
            setVisible(false);
            Alert.alert("Acesso Negado", "Senha inserida está incorreta");
            return;
        }

        setSenha("");
        navigation.navigate('NBAAdmin');
    }

    /**
     * Função para exibir o diálogo de senha.
     * Define a visibilidade do diálogo como true.
     */
    const mostrarDialog = () => {
        setVisible(true);
    }

    /**
     * Função para cancelar o acesso de administrador.
     * Define a visibilidade do diálogo como false.
     */
    const cancelarAcesso = () => {
        setVisible(false);
    }

    useEffect(() => {
        cancelarAcesso();

        // Limpa o acesso ao sair da tela
        const unsubscribe = navigation.addListener('focus', () => {
            cancelarAcesso();
        });

        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acesso</Text>
            <TouchableOpacity style={styles.adminButton} onPress={mostrarDialog}>
                <Text style={styles.adminButtonText}>Administrador</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate("Usuario")}>
                <Text style={styles.userButtonText}>Usuário</Text>
            </TouchableOpacity>
            <View>
                <Dialog.Container visible={visible} contentStyle={styles.dialogContainer}>
                    <Dialog.Title style={styles.dialogTitle}>Senha</Dialog.Title>
                    <Dialog.Description style={styles.dialogDescription}>
                        Insira a senha de administrador para prosseguir
                    </Dialog.Description>
                    <DialogInput
                        keyboardType='numeric'
                        onChangeText={value => setSenha(value)}
                        secureTextEntry
                        style={styles.dialogInput}
                    />
                    <View style={styles.dialogButtonsContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={cancelarAcesso}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.continueButton} onPress={acessoAdmin}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#F2F2F2'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#00308F'
    },
    adminButton: {
        width: '70%',
        height: 50,
        backgroundColor: '#00308F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10
    },
    adminButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    userButton: {
        width: '70%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#00308F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10
    },
    userButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00308F'
    },
    dialogContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    dialogTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    dialogDescription: {
        fontSize: 18,
        color: '#666666',
        marginBottom: 20,
    },
    dialogInput: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    dialogButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    cancelButton: {
        backgroundColor: '#FF5252',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    continueButton: {
        backgroundColor: '#64B5F6',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})

export default AcessoPerfil;