import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NbaTime from '../../services/sqlite/NbaTime';

/**
  Componente de Lista de Times Inseridos.
  Exibe uma lista dos times da NBA que foram inseridos no banco de dados, e permite remover um time da lista.
*/
const ListaTimesInseridos = ({ navigation }) => {
  const [times, setTimes] = useState([]);

  /**
    Função assíncrona para recuperar as informações dos times inseridos.
    Faz uma chamada à função estática "listarTodos" da classe "NbaTime".
    Os times obtidos são armazenados no estado "times".
    Em caso de erro, exibe uma mensagem de erro no console e um alerta na tela.
  */
  const fetchTimesInseridos = async () => {
    try {
      const data = await NbaTime.listarTodos();
      const times = data.map(t => t);
      setTimes(times);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao buscar os times inseridos');
    }
  };

  const removerTime = async (id) => {
    try {
      await NbaTime.remove(id);
      Alert.alert('Time excluído', 'Remoção concluída');
      fetchTimesInseridos();
    } catch (erro) {
      console.error('Erro ao remover o time', erro);
      Alert.alert('Erro', 'Falha ao remover o time');
    }
  };

  useEffect(() => {
    fetchTimesInseridos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Times Inseridos</Text>
      {times.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum time inserido.</Text>
      ) : (
        <FlatList
          data={times}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.sigla}>{item.sigla}</Text>
                <Text style={styles.nome}>{item.nome}</Text>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => removerTime(item.id)}>
                <Text style={styles.btnText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: 'bold',
    color: '#00308F',
    textTransform: 'uppercase'
  },
  card: {
    backgroundColor: '#00308F1D',
    marginVertical: 10,
    width: 300,
    height: 60,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  sigla: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00308F'
  },
  nome: {
    fontSize: 14,
    color: '#00308F'
  },
  btn: {
    width: 80,
    height: 30,
    backgroundColor: 'crimson',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#00308F',
    textAlign: 'center',
    marginVertical: 20
  }
});

export default ListaTimesInseridos;