import { IconFolderOpen } from '@tabler/icons-react';
import React from 'react';

const RecordDetailsHeader = ({ recordName }) => {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <div className="flex flex-col rounded-xl border bg-[#13131a] shadow-sm">
        <div className="flex justify-between gap-x-3 p-4 md:p-5">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-blue-200">
            <IconFolderOpen size={70} className="text-green-500" />
          </div>
        </div>
        <div
          className="inline-flex items-center justify-between border-t border-neutral-700 px-4 py-3 text-sm text-neutral-500 hover:bg-neutral-800 md:px-5"
          
        >
          {recordName}
        </div>
      </div>
    </div>
  );
};

export default RecordDetailsHeader;
