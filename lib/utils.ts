import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Función para generar un password seguro.
 *
 * @param longitud - Longitud deseada del password (mínimo 4)
 * @returns Password generado como string
 * @throws Error si la longitud es menor a 4
 */
export function generateSecurePassword(longitud: number = 12): string {
    if (longitud < 4) {
        throw new Error("La longitud mínima debe ser 4 para incluir todos los tipos de caracteres.");
      }
    
      const minusculas = "abcdefghijklmnopqrstuvwxyz";
      const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const digitos = "0123456789";
      const simbolos = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
      /**
       * Función auxiliar que devuelve un índice aleatorio entre 0 y max - 1 usando crypto.
       *
       * @param max - Valor máximo (no inclusivo)
       * @returns Número aleatorio entre 0 y max - 1
       */
      function obtenerIndiceAleatorio(max: number): number {
        const array = new Uint32Array(1);
        // Si se utiliza en ambiente Node.js puede que necesitemos "crypto.webcrypto" o importar el módulo "crypto"
        crypto.getRandomValues(array);
        return array[0] % max;
      }
    
      // Aseguramos incluir al menos un carácter de cada conjunto.
      const passwordArray: string[] = [
        minusculas[obtenerIndiceAleatorio(minusculas.length)],
        mayusculas[obtenerIndiceAleatorio(mayusculas.length)],
        digitos[obtenerIndiceAleatorio(digitos.length)],
        simbolos[obtenerIndiceAleatorio(simbolos.length)]
      ];
    
      // Combinamos todos los caracteres en un solo string para el resto de la password.
      const todosLosCaracteres = minusculas + mayusculas + digitos + simbolos;
    
      // Completa la contraseña hasta alcanzar la longitud deseada.
      for (let i = 4; i < longitud; i++) {
        passwordArray.push(todosLosCaracteres[obtenerIndiceAleatorio(todosLosCaracteres.length)]);
      }
    
      /**
       * Función para mezclar (shuffle) el arreglo usando el algoritmo de Fisher-Yates.
       *
       * @param array - Arreglo de elementos a mezclar
       */
      function mezclarArreglo<T>(array: T[]): void {
        for (let i = array.length - 1; i > 0; i--) {
          const j = obtenerIndiceAleatorio(i + 1);
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    
      mezclarArreglo(passwordArray);
    
      // Retorna la contraseña generada.
      return passwordArray.join('');
}
