import { IconChevronRight } from '@tabler/icons-react';
import React from 'react';

function MetricsCard({ title, subtitle, value, icon: Icon, onClick }) {
  return (
    <div className="flex flex-col rounded-xl border bg-gray-900 shadow-sm dark:border-neutral-100 dark:bg-[#13131a]">
      <div className="flex justify-between gap-x-3 p-4 md:p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">{title}</p>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl font-medium text-neutral-200 sm:text-2xl">{value}</h3>
          </div>
        </div>

        {/* Aligning the icon inside the flex container */}
        <div className="flex size-[46px] h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-500 dark:bg-[#1c1c24] text-blue-200">
          <Icon size={25} className="text-white-500" />
        </div>
      </div>

      <a
        href="#"
        onClick={onClick}
        className="inline-flex items-center justify-between rounded-b-xl border-t px-4 py-3 text-sm md:px-5 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
      >
        {subtitle} <IconChevronRight />
      </a>
    </div>
  );
}

export default MetricsCard;
