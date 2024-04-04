// Modal.jsx

const Modal = ({ content, source, onClose, onDelete }) => {
  return (
    <div className='modal' onClick={onClose}>
      <div
        className='modalContent'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className='columnName'>{source.title}</div>
        <button className='closeBtn' onClick={onClose}>
          X
        </button>
        <h3 className='text'>{content.text}</h3>
        <p className='createdAt'>{content.createdAt}</p>
        <p className='description'>{content.description}</p>
        <button className='deleteBtn' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
