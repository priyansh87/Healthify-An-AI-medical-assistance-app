import { IconCircleDashedCheck, IconHourglass, IconHourglassHigh, IconUserScan } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricsCard from './MetricsCard';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../context';
function DisplayInfo() {
    const navigate = useNavigate() ;
    const { user } = usePrivy() ; 
    const { fetchUserRecords , records , fetchUserByEmail } = useStateContext() ; 
    const [metrics, setmetrics] = useState({
        totalFolders: 0,
        aiPersonalisedTreatement : 0 , 
        totalScreenings : 0 , 
        completedScreenings : 0 , 
        pendingScreenings : 0 , 
        overdueScreenings : 0 , 
    })

    


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
        <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg: grid-cols-2">
            {metricsData.slice(0,2).map((metric)=>(
                <MetricsCard key={metric.title} {...metric} />
            ))}
        </div>

        <div className="mt-[px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {metricsData.slice(2).map((metric)=>(
                <MetricsCard key={metric.title} {...metric} />
            ))}
        </div>
    </div>
  )
}

export default DisplayInfo