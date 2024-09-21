import React, { useState, useEffect, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ColumnContainer from './records/components/ColumnContainer';
import { IconPlus } from '@tabler/icons-react';

function KanbanBoard({ state }) {
  const defaultCols = state?.Columns?.map((col) => ({
    id: col?.id,
    title: col?.title,
  })) || [];
  
  const defaultTasks = state?.Tasks?.map((task) => ({
    id: task?.id,
    columnId: task?.columnId,
    content: task?.content,
  })) || [];

  const [columns, setColumns] = useState(defaultCols);
  const [tasks, setTasks] = useState(defaultTasks);
  const columnId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  // Optional: Use effect to update state if `state` changes
  useEffect(() => {
    console.log("prinintg state from the kanban which is being passed as a prop : " , state )
    console.log( "testing whether the kanban is working or not ? ", state?.Columns)
    setColumns(defaultCols);
    setTasks(defaultTasks);
  }, [state]);

  return (
    <div className="mt-5 min-h-screen w-72 text-white">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createNewColumn()}
            className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer"
          >
            <IconPlus />
            Add Column
          </button>
        </div>
      </DndContext>
    </div>
  );

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  function deleteColumn(id) {
    const newColumns = columns.filter((col) => col.id !== id);
    setColumns(newColumns);
    setTasks(tasks.filter((task) => task.columnId !== id));
  }

  function updateColumn({id, title}) {
    const newColumns = columns.map((col) =>
      col.id === id ? { ...col, title } : col
    );
    setColumns(newColumns);
  }

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function updateTask({id, content}) {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, content } : task
    );
    setTasks(newTasks);
  }

  function handleDragStart(event) {
    const { active } = event;
    setActiveTask(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }
    setActiveTask(null);
  }

  function handleDragOver() {
    // Logic for handling task drag-over event (optional)
  }

  function createNewColumn() {
    const newColumn = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  }
}

export default KanbanBoard;
