import Task from './components/Task';

const CustomDragLayer = ({ item, offset }) => {
  if (!item) return null; // Don't render if no item is being dragged

  const { x, y } = offset || { x: 0, y: 0 };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 1000, // Ensure drag layer is above other elements
      }}>
      <Task text={item.text} createdDate={item.createdDate} />
    </div>
  );
};

export default CustomDragLayer;
