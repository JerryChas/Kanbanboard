// Modal.jsx

const Modal = ({ task, closeModal }) => {
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modalContent'>
        <div className='columnName'>columnName</div>
        <button className='closeBtn' onClick={closeModal}>
          X
        </button>
        <h3 className='text'>{task.text}</h3>
        <p className='createdAt'>{task.createdAt}</p>

        {/* <select name='' id=''>
          <option value='todo'>Todo</option>
          <option value='inProgress'>In Progress</option>
          <option value='done'>Done</option>
        </select> */}
        <p className='description'>{task.description}</p>
        <button className='deleteBtn'>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
