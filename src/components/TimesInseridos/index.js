import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';

const TimesInseridos = ({navigation}) => {

    const [times, setTimes] = useState([]);

    const buscarTimesInseridos = async () => {
        try {
            const data = await NbaTime.listarTodos();
            const times = data.map(t => t);
            console.log(times);
            setTimes(times)
        } catch (error) {
            console.error(error);
        }
    };

    const removerTime = async id => {
        try {
            await NbaTime.remove(id);
            Alert.alert("Time excluído", "Remoção concluída");
            buscarTimesInseridos();
        } catch (error) {
            console.error("Erro ao remover o time");
        }
    }

    const teste = () => {
        console.log("TESTE");
    }

    useEffect(() => {
        buscarTimesInseridos();
    }, [])


    return (
        <View>
            <Text>Times Inseridos</Text>
            <FlatList
                data={times}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <View>
                                <Text>{item.sigla}</Text>
                                <Text>{item.nome}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removerTime(item.id)}>
                                <Text>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }

})

export default TimesInseridos;