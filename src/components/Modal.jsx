// Modal.jsx

const Modal = ({ text, createdAt }) => {
  return (
    <div className='modal'>
      <h3>{text}</h3>
      <p>{createdAt}</p>
      {/* <select name='' id=''>
        <option value='todo'>Todo</option>
        <option value='inProgress'>In Progress</option>
        <option value='done'>Done</option>
      </select> */}
    </div>
  );
};

export default Modal;
