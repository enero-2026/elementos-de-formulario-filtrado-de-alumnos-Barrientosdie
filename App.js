import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import AlumnosData from './Alumnos';

export default function App() {

  const [alumnos, setAlumnos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    console.log("Pantalla cargada");

    setTimeout(() => {
      setAlumnos(AlumnosData);
    }, 1500);

  }, []);

  const toggleAlumno = (matricula) => {
    setSeleccionado(seleccionado === matricula ? null : matricula);
  };

  const alumnosFiltrados = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    alumno.matricula.includes(busqueda)
  );

  return (
    <PaperProvider>

      {alumnos.length === 0 ? (

        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Cargando lista...</Text>
        </View>

      ) : (

        <View style={styles.container}>

          <TextInput
            label="Buscar alumno..."
            value={busqueda}
            onChangeText={text => setBusqueda(text)}
            style={styles.input}
            mode="outlined"
          />

          {alumnosFiltrados.length === 0 ? (
            <Text style={styles.noEncontrado}>
              Alumno no encontrado
            </Text>
          ) : (

            <FlatList
              data={alumnosFiltrados}
              keyExtractor={(item) => item.matricula}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => toggleAlumno(item.matricula)}
                >

                  <Ionicons name="person-circle-outline" size={30} color="white" />

                  <View style={styles.textContainer}>

                    <Text style={styles.nombre}>
                      {item.nombre}
                    </Text>

                    {seleccionado === item.matricula && (
                      <Text style={styles.matricula}>
                        Matrícula: {item.matricula}
                      </Text>
                    )}

                  </View>

                </TouchableOpacity>

              )}
            />

          )}

          <StatusBar style="light" />

        </View>

      )}

    </PaperProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050574',
    paddingTop: 50,
    paddingHorizontal: 10
  },

  input: {
    marginBottom: 15,
    backgroundColor: 'white'
  },

  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2087ee',
    padding: 18,
    borderRadius: 16,
    marginBottom: 8
  },

  textContainer: {
    marginLeft: 18,
    flex: 1
  },

  nombre: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },

  matricula: {
    marginTop: 5,
    fontSize: 16,
    color: '#dfe6ff'
  },

  noEncontrado: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00001e'
  },

  loading: {
    fontSize: 18,
    color: 'black',
    backgroundColor: '#5ae8e8',
    padding: 15,
    borderRadius: 20
  }

});