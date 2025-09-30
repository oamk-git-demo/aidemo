import { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState({ title: '', description: '', user_id: 1 });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) throw new Error('Failed to add task');
      const created = await response.json();
      onAdd(created);
      setNewTask({ title: '', description: '', user_id: 1 });
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={newTask.description}
        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button type="submit" disabled={adding || !newTask.title}>
        {adding ? 'Adding...' : 'Add Task'}
      </button>
      {addError && <div className="error">{addError}</div>}
    </form>
  );
}

export default AddTaskForm;
