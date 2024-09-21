import React, { useState, useEffect, useMemo } from 'react';
import {
    DndContext, DragOverlay, PointerSensor, useSensors, useSensor
} from '@dnd-kit/core';

import {
    SortableContext, arrayMove, useSortable
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import TaskCard from "./TaskCard";
import { IconPlug, IconTrash, IconPlus } from '@tabler/icons-react';

function ColumnContainer({
    column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask
}) {
    const [editMode, setEditMode] = useState(false);
    
    const taskIds = useMemo(() => tasks.map(task => task.id), [tasks]);
    
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className='relative flex h-[100px] min-h-[100px] cursor-pointer'
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className='flex h-[500px] w-[350px] max-h-500px flex-col rounded-xl bg-[#1c1c24]'
        >
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                className='text-md m-2 flex h-[60px] cursor-grab items-center'
            >
                <div className="flex gap-2">
                    {!editMode && column.title}
                    {editMode && (
                        <input
                            type='text'
                            value={column.title}
                            onChange={(e) => updateColumn({ id: column.id, title: e.target.value })}
                            className='w-full px-4 py-2 text-sm text-black'
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') {
                                    return;
                                }
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={(e) => {
                        deleteColumn(column.id);
                    }}
                    className='rounded stroke-gray-500 px-1 py-2 hover:text-white'
                >
                    <IconTrash />
                </button>
            </div>

            <div className='flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2'>
                <SortableContext items={taskIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>

            <button
                className='flex items-center gap-2 rounded-md border'
                onClick={() => createTask(column.id)}
            >
                <IconPlus />
                Add Task
            </button>
        </div>
    );
}

export default ColumnContainer;
