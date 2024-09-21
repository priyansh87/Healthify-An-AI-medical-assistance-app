import { IconCirclePlus } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import RecordCard from './components/RecordCard';
import CreateRecordModal from './components/create-record-modal';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../../context';

import { useLocation, useParams } from 'react-router-dom'

function Index() {
  const navigate = useNavigate();
  const  state = useLocation() ;
  const { user } = usePrivy();
  const { records, fetchUserRecords, createRecord, fetchUserByEmail, currentUser } = useStateContext();

  const [userRecords, setUserRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);

  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem('userRecords', JSON.stringify(records));
  }, [records]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createFolder = async (folderName) => {
    try {
      const newRecord = await createRecord({
        userId: currentUser.id,
        recordName: folderName,
        analysisResult: '',
        kanbanRecords: '',
        createdBy: user.email.address,
      });

      if (newRecord) {
        fetchUserRecords(user.email.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (name) => {
    const filteredRecords = userRecords.filter((record) => record.recordName === name);
    if (filteredRecords.length > 0) {
      navigate(`/medical-records/${name}`, {
        state: filteredRecords[0],
        
      });
    } else {
      console.log('Record not found');
    }
  };

  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
        onClick={handleOpenModal}
      >
        <IconCirclePlus />
        Create Record
      </button>

      <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // Correctly pass onClose
        onCreate={createFolder}
      />

      <div className="grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {userRecords.map((record) => (
          <RecordCard key={record.recorderName} record={record} onNavigate={handleNavigate} />
        ))}
      </div>
    </div>
  );
}

export default Index;
