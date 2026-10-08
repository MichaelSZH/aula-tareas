import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTareas } from './src/modules/tareas/useTareas';

export default function App() {
  const { tareas, agregarTarea, alternarTarea, actualizarTarea } = useTareas();
  const [texto, setTexto] = useState('');
  const [idEditando, setIdEditando] = useState<string | null>(null);

  function guardarTarea() {
    const guardada = idEditando
      ? actualizarTarea(idEditando, texto)
      : agregarTarea(texto);

    if (guardada) {
      setTexto('');
      setIdEditando(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <TextInput
        onChangeText={setTexto}
        onSubmitEditing={guardarTarea}
        placeholder={idEditando ? 'Editar tarea' : 'Nueva tarea'}
        value={texto}
        style={styles.input}
      />
      <Button
        onPress={guardarTarea}
        title={idEditando ? 'Guardar cambios' : 'Agregar tarea'}
      />

      {tareas.map((tarea) => (
        <View key={tarea.id} style={styles.task}>
          <Text
            onPress={() => alternarTarea(tarea.id)}
            style={tarea.completada ? styles.completed : undefined}
          >
            {tarea.completada ? '✓ ' : '○ '}
            {tarea.titulo}
          </Text>
          <Button
            onPress={() => {
              setIdEditando(tarea.id);
              setTexto(tarea.titulo);
            }}
            title="Editar"
          />
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});
