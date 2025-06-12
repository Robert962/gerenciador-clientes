import { useState } from "react";

function AddTasks({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-slate-100 p-4 rounded-md shadow flex flex-col gap-2">
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="p-2 rounded border border-slate-300"
        required
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="p-2 rounded border border-slate-300"
      />
      <button type="submit" className="bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-700 transition">
        Adicionar Tarefa
      </button>
    </form>
  );
}
export default AddTasks;
