import { useRef, useState } from 'react';
import type { Tarea } from './types';

export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const siguienteId = useRef(1);

  function agregarTarea(texto: string): boolean {
    const titulo = texto.trim();

    if (!titulo) {
      return false;
    }

    const nuevaTarea: Tarea = {
      id: String(siguienteId.current++),
      titulo,
      completada: false,
    };

    setTareas((anteriores) => [...anteriores, nuevaTarea]);

    return true;
  }

  function alternarTarea(id: string) {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  }

  function actualizarTarea(id: string, texto: string): boolean {
    const titulo = texto.trim();

    if (!titulo || !tareas.some((tarea) => tarea.id === id)) {
      return false;
    }

    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, titulo } : tarea
      )
    );

    return true;
  }

  return { tareas, agregarTarea, alternarTarea, actualizarTarea };
}
