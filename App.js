import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import Perfil from './src/components/Perfil';
import Administrador from './src/components/Administrador';
import Time from './src/components/Time';
import TimesInseridos from './src/components/TimesInseridos';
import Usuario from './src/components/Usuario';
import TimeUsuario from './src/components/TimeUsuario';
import Editar from './src/components/Editar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Perfil" component={Perfil}/>
        <Stack.Screen name="Administrador" component={Administrador}/>
        <Stack.Screen name="Time" component={Time}/>
        <Stack.Screen name="Inseridos" component={TimesInseridos}/>
        <Stack.Screen name='Usuario' component={Usuario}/>
        <Stack.Screen name='Time Usuario' component={TimeUsuario} />
        <Stack.Screen name='Editar Time' component={Editar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

