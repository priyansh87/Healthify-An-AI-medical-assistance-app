import { IconCircleDashedCheck, IconHourglass, IconHourglassHigh, IconUserScan } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricsCard from './MetricsCard';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../context';
function DisplayInfo() {
    const navigate = useNavigate() ;
     
    const { fetchUserRecords , records , fetchUserByEmail } = useStateContext() ; 
    const [metrics, setmetrics] = useState({
        totalFolders: 0,
        aiPersonalisedTreatement : 0 , 
        totalScreenings : 0 , 
        completedScreenings : 0 , 
        pendingScreenings : 0 , 
        overdueScreenings : 0 , 
    })
    const { user } = usePrivy() ;
    

    


    const metricsData = [
        {
            title:'Specialist Appointment Pending',
            subtitle:'view' ,
            value: metrics.pendingScreenings,
            icon: IconHourglassHigh,
            onclick: () =>navigate('/appointments/pending')
        },
        {
            title:'Treatement Progress Update',
            subtitle:'view' ,
            value: `${metrics.completedScreenings} of ${metrics.totalScreenings}`,
            icon: IconCircleDashedCheck,
            onclick: () =>navigate('/appointments/pending')
        },
        {
            title:'Total Folders',
            subtitle:'view' ,
            value: metrics.totalFolders,
            icon: IconCircleDashedCheck,
            onclick: () =>navigate('/folders')
        },
        {
            title:'Total Screenings',
            subtitle:'view' ,
            value: metrics.totalScreenings,
            icon: IconUserScan,
            onclick: () =>navigate('/screenings')
        },
        {
            title:'Completed Screenings',
            subtitle:'view' ,
            value: metrics.completedScreenings,
            icon: IconUserScan,
            onclick: () =>navigate('/screenings/completed')
        },
        {
            title:'Pending Screenings',
            subtitle:'view' ,
            value: metrics.pendingScreenings,
            icon: IconUserScan,
            onclick: () =>navigate('/screenings/pending')
        },
        {
            title:'Overdue Screenings',
            subtitle:'view' ,
            value: metrics.overdueScreenings,
            icon: IconUserScan,
            onclick: () =>navigate('/screenings/overdue')
        },
    ]
    

  return (
    <div className="flex  flex-wrap gap-[26px]">
        <div className="flex flex-wrap gap-[26px]">
         <div className="bg-green-600 text-white p-6 sm:p-8 md:p-10 rounded-lg w-[82vw] h-[20vw] sm:h-auto lg:h-[30vw] mx-auto mt-10">
         <h1 className="text-2xl sm:text-3xl md:text-8xl font-bold mb-2">
      Welcome back ! <span className="text-gray-100"></span>
        </h1>
        <p className="text-gray-100 mb-4 text-sm sm:text-base md:text-4xl md:mt-16">
      Hope you've been well.<br />
      What can we help you with today?
        </p>
        <button className="bg-white text-green-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100">
      let's get started 
        </button>
        </div>
        </div>



        {/* <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg: grid-cols-2">
            {metricsData.slice(0,2).map((metric)=>(
                <MetricsCard key={metric.title} {...metric} />
            ))}
        </div>

        <div className="mt-[px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {metricsData.slice(2).map((metric)=>(
                <MetricsCard key={metric.title} {...metric} />
            ))}
        </div> */}
    </div>
  )
}

export default DisplayInfo