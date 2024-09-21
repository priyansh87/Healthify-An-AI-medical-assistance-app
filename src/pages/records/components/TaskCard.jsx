import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { IconTrash } from '@tabler/icons-react';

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false); // Set to false initially

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode, // Disables drag when in edit mode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      toggleEditMode(); // Save and exit edit mode when Enter + Shift is pressed
    }
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='relative flex h-[100px] min-h-[100px] cursor-pointer' />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex h-[100px] min-h-[100px] text-white"
      >
        <textarea
          className='h-[90%] w-full resize-none border rounded-lg hover:border-green-500 bg-black text-white '
          value={task.content}
          autoFocus
          placeholder='Task Content Here'
          onChange={(e) => updateTask({ id: task.id, content: e.target.value })}
          onBlur={toggleEditMode} // Exit edit mode when focus is lost
          onKeyDown={handleKeyDown} // Exit edit mode on Enter + Shift
        />
      </div>
    );
  }

  return (
    <div
      className="task relative flex h-[100px] min-h-[100px] overflow-scroll cursor-grab items-center rounded-xl bg-[#13131a] p-2.5 text-left hover:border-green-300"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode} // Enter edit mode on click
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className="my-auto text-white h-90% w-full overflow-auto overflow-x-hidden">{task.content}</p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className='absolute right-4 top-1/2 -translate-y-1/2 -translate-x-1/2'
        >
          <IconTrash />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
