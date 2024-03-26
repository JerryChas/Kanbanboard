// Modal.jsx

const Modal = ({ text, createdDate, status }) => {
  return (
    <div className='modal'>
      <h3>{text}</h3>
      <p>{createdDate}</p>
      <select name='' id=''>
        <option value='todo'>Todo</option>
        <option value='inProgress'>In Progress</option>
        <option value='done'>Done</option>
      </select>
    </div>
  );
};

export default Modal;
