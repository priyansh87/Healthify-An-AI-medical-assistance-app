import React, { useState } from 'react';
import Modal from './Modal.jsx';

function CreateRecordModal({ isOpen, onClose, onCreate }) {
  const [folderName, setFolderName] = useState('');

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName);
      setFolderName(''); // Reset folder name after creation
      onClose(); // Close the modal after creation
    }
  };

  return (
    <Modal
      title='Create Record'
      isOpen={isOpen}
      onClose={onClose} // Ensure onClose is correctly passed
      onAction={handleCreate}
      actionLabel='Create Folder'
    >
      <div className='grid gap-y-4'>
        <div>
          <label htmlFor="folder-name" className='mb-2 block text-sm text-white'>
            Record Name
          </label>

          <div className='relative'>
            <input
              type="text"
              name="folder-name"
              id='folder-name'
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
              className='block w-full rounded-lg border-2 px-4 py-3 text-sm focus-border-2 focus:outline-none dark:text-neutral-800 dark:placeholder-neutral-500'
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateRecordModal;
