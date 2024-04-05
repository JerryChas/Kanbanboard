// Modal.jsx

import { useState } from 'react';

const Modal = ({ task, column, onClose, onDelete, setTasks }) => {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editBody, setEditBody] = useState(task.body);

  const handleEdit = (id, e) => {
    e.preventDefault();
    const date = new Date();
    const editedTask = {
      ...task,
      title: editTitle,
      body: editBody,
      editedAt: date.toLocaleString(),
    };
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? editedTask : t))
    );

    onClose(true);
  };

  return (
    <div className='modal' onClick={onClose}>
      <div
        className='modalContent'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className='modalHeader'>
          <div className='columnName'>{column.title}</div>
          <button className='closeBtn' onClick={onClose}>
            X
          </button>
        </div>

        {/* Edit Task Title */}
        <form className='editForm' onSubmit={(e) => handleEdit(task.id, e)}>
          <label htmlFor='taskTitle'>Title:</label>
          <input
            type='text'
            id='taskTitle'
            required
            autoComplete='off'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder='Task title...'
          />

          {/* Edit Body Title */}
          <label htmlFor='taskBody'>Description:</label>
          <textarea
            type='text'
            id='taskBody'
            autoComplete='off'
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            placeholder='Add a description...'></textarea>
          <button className='saveBtn' type='submit'>
            Save Changes
          </button>
        </form>

        <p className='date'>{`Created: ${task.createdAt}`}</p>
        {task.editedAt && <p className='date'>{`Edited: ${task.editedAt}`}</p>}

        <button className='deleteBtn' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
