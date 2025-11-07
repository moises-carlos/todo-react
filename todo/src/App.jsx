import { useState } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");


  function adicionarTarefa() {
    if (input) {
      setTarefas([...tarefas, input]);
      setInput("");
    }
  }

  function removerTarefas(itemParaRemover) {

    const novoArray = tarefas.filter((itemIgnorado, index) => {
    
      if (index != itemParaRemover) {
        return true;
      } else {
        return false;
      }
    })
    setTarefas(novoArray)
  }

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Nova tarefa" />
      <button className='button_adicionar' onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index} > {tarefa} <button className='button_remover' onClick={() => removerTarefas(index)}> Remover </button></li>
          
        ))}
      </ul>
      
    </div>
  );
}
export default App;