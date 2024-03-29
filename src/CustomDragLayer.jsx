// CustomDragLayer.jsx

import Task from './components/Task';

const CustomDragLayer = ({ item, offset }) => {
  if (!item) return null; // Don't render if no item is being dragged

  const { x, y } = offset || { x: 0, y: 0 };

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 1000,

        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
      }}>
      <Task text={item.text} createdDate={item.createdDate} />
    </div>
  );
};

export default CustomDragLayer;
