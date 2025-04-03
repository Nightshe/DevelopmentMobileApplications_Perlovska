import React, { useContext } from 'react';
import { TaskContext } from '../App';

const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { fontSize } = useContext(TaskContext);

  return (
    <div className="task-item" style={{ fontSize }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
