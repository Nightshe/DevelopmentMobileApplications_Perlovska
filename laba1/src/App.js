import React, { useState, useEffect, useCallback, useMemo, createContext, useRef } from 'react';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

export const TaskContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [fontSize, setFontSize] = useState('16px');
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Статус редагування завдання
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskText) => {
    if (taskText.trim() === '') return;
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText('');
    inputRef.current.focus();
  }, []);

  // Редагування існуючого завдання
  const editTask = useCallback((id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setEditingTaskId(null); // Зупинка редагування після завершення
  }, []);

  const toggleTaskCompletion = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (editingTaskId) {
      editTask(editingTaskId, taskText); // Якщо ми редагуємо завдання
    } else {
      addTask(taskText); // Додаємо нове завдання
    }
  };

  const startEditing = (id, currentText) => {
    setEditingTaskId(id);
    setTaskText(currentText); // Встановлюємо текст завдання в input для редагування
  };

  return (
    <TaskContext.Provider value={{ addTask, toggleTaskCompletion, deleteTask, fontSize }}>
      <div className="app" style={{ fontSize: fontSize }}>
        <h1>Task Manager</h1>
        <div className="settings">
          <label>
            Font Size:
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
            </select>
          </label>
        </div>

        <div className="task-form">
          <input
            type="text"
            value={taskText}
            onChange={handleInputChange}
            ref={inputRef}
            placeholder={editingTaskId ? "Edit task" : "Enter task"}
          />
          <button onClick={handleAddTask}>
            {editingTaskId ? "Save Task" : "Add Task"}
          </button>
        </div>

        <TaskFilter setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          startEditing={startEditing} // Передаємо функцію редагування в TaskList
        />
      </div>
    </TaskContext.Provider>
  );
};

export default App;
