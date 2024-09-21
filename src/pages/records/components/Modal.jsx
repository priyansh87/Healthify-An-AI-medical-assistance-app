import React from 'react';
import { IconX } from '@tabler/icons-react';

function Modal({ title, children, isOpen, onClose, onAction, actionLabel }) {
  if (!isOpen) return null;

  return (
    <div className='fixed z-10 inset-0 flex  items-center justify-center bg-neutral-700 bg-opacity-70'>
      <div className='relative w-full max-w-md mx-4 md:mx-0 bg-neutral-800 rounded-xl border border-white'>
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h2 className='text-2xl font-bold text-white'>
              {title}
            </h2>
          </div>

          <div className="mt-5">{children}</div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              className='inline-flex items-center justify-center bg-blue-700 p-2 rounded-md text-xl text-white font-bold mx-auto'
              onClick={onAction}
            >
              {actionLabel}
            </button>
          </div>

          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-400 hover:text-white'
          >
            <IconX />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
