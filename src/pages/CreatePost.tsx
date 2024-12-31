import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

const CreatePost: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const { createPost, loading, error } = usePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Comprobación básica
    if (!content.trim()) {
      alert("El contenido no puede estar vacío");
      return;
    }

    const postData = {
      content,
      likes: 0, // Likes iniciales
      date: new Date().toISOString(), // Fecha automática
    };

    const result = await createPost(postData.content);

    if (result) {
      alert("¡Publicación creada con éxito!");
      setContent(""); // Limpiar el formulario
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Publicación</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Escribe el contenido aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Publicando..." : "Publicar"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
