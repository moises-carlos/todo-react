import { useState, useEffect } from 'react';

// Atualiza a URL base da API para incluir o versionamento
const API_URL = 'http://localhost:3001/api/v1/todos';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");

  // Efeito para buscar as tarefas da API ao carregar o componente
  useEffect(() => {
    fetch(API_URL) // Acessa a rota GET /api/v1/todos
      .then(res => res.json())
      .then(data => setTarefas(data))
      .catch(err => console.error("Falha ao buscar tarefas:", err));
  }, []);

  async function adicionarTarefa() {
    if (!input) return;

    const res = await fetch(API_URL, { // Acessa a rota POST /api/v1/todos
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    });

    if (res.ok) {
      const novaTarefa = await res.json();
      setTarefas([...tarefas, novaTarefa]);
      setInput("");
    } else {
      console.error("Falha ao adicionar tarefa");
    }
  }

  async function removerTarefa(id) {
    const res = await fetch(`${API_URL}/${id}`, { // Acessa a rota DELETE /api/v1/todos/:id
      method: 'DELETE'
    });

    if (res.ok) {
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } else {
      console.error("Falha ao remover tarefa");
    }
  }

  async function toggleCompleta(id, completed) {
    const res = await fetch(`${API_URL}/${id}`, { // Acessa a rota PUT /api/v1/todos/:id
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
    });

    if (res.ok) {
        const tarefaAtualizada = await res.json();
        setTarefas(tarefas.map(t => t.id === id ? tarefaAtualizada : t));
    } else {
        console.error("Falha ao atualizar tarefa");
    }
  }

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Nova tarefa" />
      <button className='button_adicionar' onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {tarefas.map((tarefa) => (
          <li 
            key={tarefa.id} 
            style={{ textDecoration: tarefa.completed ? 'line-through' : 'none' }}
          >
            <span onClick={() => toggleCompleta(tarefa.id, tarefa.completed)} style={{ cursor: 'pointer' }}>
              {tarefa.title}
            </span>
            <button className='button_remover' onClick={() => removerTarefa(tarefa.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;