import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import ListaTimesUsuario from './src/components/ListaTimesUsuario';
import DetalhesTimeUsuario from './src/components/DetalhesTimeUsuario';
import AdminDashboard from './src/components/AdminDashboard';
import EditarTimeNBA from './src/components/EditarTimeNBA';
import AcessoPerfil from './src/components/AcessoPerfil';
import DetalhesTime from './src/components/DetalhesTime';
import ListaTimesInseridos from './src/components/ListaTimesInseridos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Perfil" component={AcessoPerfil}/>
        <Stack.Screen name="NBAAdmin" component={AdminDashboard}/>
        <Stack.Screen name="Detalhes Time" component={DetalhesTime}/>
        <Stack.Screen name="Inseridos" component={ListaTimesInseridos}/>
        <Stack.Screen name="Usuario" component={ListaTimesUsuario}/>
        <Stack.Screen name="Time Usuario" component={DetalhesTimeUsuario} />
        <Stack.Screen name="Editar Time" component={EditarTimeNBA}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

