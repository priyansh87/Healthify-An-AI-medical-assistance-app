import { IconChevronRight, IconFolder } from '@tabler/icons-react'
import React from 'react'

function RecordCard({record , onNavigate }) {
  return (
    <div className='flex flex-col rounded-xl border shadow-sm  border-neutral-800 bg-[#13131a]'>

        <div className="flex flex-col gap-2 justify-between gap-x-3 p-4 md:p-5">
            <div className="flex h-11 w-11 flex-shrink items-center justify-center rounded-full text-blue-200 ">
                <IconFolder size={70} className='text-green-500' />
            </div>

            <a
                onClick={()=>{onNavigate( record.recordName )}}
                className='inline-flex cursor-pointer items-center justify-between rounded-b-xl border-t  px-4 py-3 text-sm text-neutral-400 md:px-5 border-neutral-800 hover:border-white hover:bg-neutral-800 '
            >
                {record.recordName}
                <IconChevronRight/>
            </a>


        </div>

    </div>
  )
}

export default RecordCard