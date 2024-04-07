// Modal.jsx

import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

const Modal = () => {
  // Context
  const {
    columns,
    setTasks,
    handleToggleModal,
    handleDeleteTask,
    selectedTask,
  } = useContext(DataContext);

  const [editTitle, setEditTitle] = useState(selectedTask.title);
  const [editBody, setEditBody] = useState(selectedTask.body);

  const handleEdit = (id, e) => {
    e.preventDefault();
    const date = new Date();
    const editedTask = {
      ...selectedTask,
      title: editTitle,
      body: editBody,
      editedAt: date.toLocaleString(),
    };
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? editedTask : t))
    );

    handleToggleModal(true);
  };

  return (
    <div className='modal' onClick={handleToggleModal}>
      <div
        className='modalContent'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className='columnName'>
          {columns.find((col) => col.id === selectedTask.stateid).title}
        </div>
        <button className='closeBtn' onClick={handleToggleModal}>
          &times;
        </button>

        {/* Edit Task Title */}
        <form
          className='editForm'
          onSubmit={(e) => handleEdit(selectedTask.id, e)}>
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
          {/* DATESTAMP */}
          <p className='date'>{`Created: ${selectedTask.createdAt}`}</p>
          {selectedTask.editedAt && (
            <p className='date'>{`Edited: ${selectedTask.editedAt}`}</p>
          )}

          <div className='btnsContainer'>
            <button className='saveBtn' type='submit'>
              Save
            </button>
            <button
              className='deleteBtn'
              onClick={() => handleDeleteTask(selectedTask)}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
