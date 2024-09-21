import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Home, Onboarding, Profile } from './pages';
import { useStateContext } from './context';
import { usePrivy } from '@privy-io/react-auth';
import MedicalRecords from './pages/records/index'
import ScreeningSchedules from './pages/ScreeningSchedules'
import SingleRecordDetails from './pages/records/single-record-details';
import Footer from './components/Footer';
function App() {
    const navigate = useNavigate()
    const {currentUser , users , setUsers , fetchUsers } = useStateContext()
    const {user , authenticated , ready , login , logout , } = usePrivy()
    const [ checkUser , setCheckUser ] = useState([]) ;

    useEffect(()=>{
        if(ready && !authenticated){
          login() ;
          

        } else if ( user && !currentUser  ){
            navigate('/onboarding')
        } 
    }, [  ready, currentUser  , navigate])
    const t = true ;
    useEffect(() => {
      if(ready &&  authenticated){
        fetchUsers();
      setCheckUser(users);
    
      let checker = checkUser.filter((u) => u.createdBy === currentUser?.createdBy);
      
      if (checkUser.length === 0) {
        navigate('/onboarding');
      }
      }
    }, [currentUser, authenticated, ready]);
    

  return (
    <div className="relative flex  min-h-screen flex-row bg-[#13131a] p-4">
      {/* Sidebar */}
      <div className="relative mr-20 hidden sm:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1280px] flex-1 w-full sm:pr-5">
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/onboarding' element={<Onboarding/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/medical-records' element={<MedicalRecords/>} />
          <Route path='/medical-records/:recordName' element={<SingleRecordDetails/>} />
          <Route path='/screening-schedules' element={<ScreeningSchedules/>} />
        </Routes>
      <Footer/>
      </div>
    </div>
  )
}

export default App;
