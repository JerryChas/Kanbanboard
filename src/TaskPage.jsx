import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackIcon from './Icons/BackIcon';
import DataContext from './context/DataContext';

const TaskPage = () => {
  // Context
  const { tasks } = useContext(DataContext);

  //  Params
  const { taskId } = useParams();

  // State
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // Find index of current column

    setCurrentTask(tasks.find((task) => task.id === Number(taskId)));

    return () => {};
  }, []);

  return (
    <main className='TaskPage'>
      <Link to={'/'}>
        <div className='backButton'>
          <BackIcon />
        </div>
      </Link>
      {currentTask && (
        <div className='taskDisplay'>
          <h2>{currentTask.title}</h2>

          <div
            className='wrapper'
            style={{
              flexDirection: 'row',
              gap: '1rem',
              fontSize: '0.9rem',
              fontStyle: 'italic',
            }}
          >
            <p className='bold'>Created: </p>
            <p>{currentTask.createdAt}</p>
          </div>

          {currentTask.editedAt && (
            <div
              className='wrapper'
              style={{
                flexDirection: 'row',
                gap: '1rem',
                fontSize: '0.9rem',
                fontStyle: 'italic',
              }}
            >
              <p className='bold'>Edited: </p>
              <p>{currentTask.editedAt}</p>
            </div>
          )}

          <div className='wrapper'>
            <p className='bold'>Description:</p>
            <p>
              {currentTask.body === '' ? 'No description...' : currentTask.body}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default TaskPage;
