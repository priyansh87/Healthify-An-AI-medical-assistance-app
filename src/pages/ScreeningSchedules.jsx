import React from 'react';
import { useLocation } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';

function ScreeningSchedules() {
  const { state } = useLocation(); // Destructuring the state from useLocation
  console.log("coming from the state from screenig schedule s:",state)

  return (
    <div className='w-full overflow-scroll'>
      <KanbanBoard state={state} />
    </div>
  );
}

export default ScreeningSchedules;
