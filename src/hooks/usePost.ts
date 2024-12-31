import { useState } from "react";
import axios from "axios";

interface PostResponse {
  id: string;
  content: string;
  likes: number;
  date: string;
}

export const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (content: string): Promise<PostResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const postData = {
        content,
        likes: 0,
        date: new Date().toISOString(),
      };

      const response = await axios.post<PostResponse>(
        "http://localhost:3000/api/posts",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // Timeout de 5 segundos
        }
      );

      return response.data;
    } catch (err: any) {
      if (err.response) {
        // Mostrar detalles de la respuesta del error
        setError(`Error: ${err.response.status} - ${err.response.data}`);
      } else if (err.request) {
        // No se recibió respuesta del servidor
        setError("No se recibió respuesta del servidor");
      } else {
        // Otro tipo de error
        setError(`Error desconocido: ${err.message}`);
      }
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};
