import React, { useContext } from 'react';
import { TaskContext } from '../App';

const TaskList = ({ tasks, startEditing }) => {
  const { toggleTaskCompletion, deleteTask } = useContext(TaskContext);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ fontSize: 'inherit' }}>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleTaskCompletion(task.id)} 
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
