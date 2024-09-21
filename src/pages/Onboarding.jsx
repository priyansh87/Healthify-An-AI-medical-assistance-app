import React, { useState, useEffect } from 'react';
import {useStateContext} from '../context'
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const [username, setUsername] = useState("")
    const [age, setAge] = useState("")
    const [location, setLocation] = useState("")
    const {user}= usePrivy()
    const navigate = useNavigate() ; 

    const {createUser} = useStateContext()

    const handleOnboarding = async(e)=>{
        e.preventDefault()

        const userData = {
            username, 
            age : parseInt(age, 10 ) , 
            location , 
            createdBy : user.email.address ,
        }

        const newUser = await createUser(userData)
        console.log(newUser)
        console.log(username,age,location);

        if( newUser ){
            navigate('/profile') ;
        }
        else navigate('/') ; 
    }


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13131a]">
        <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg">
            <h2 className="mb-2 text-center text-5xl font-bold">👋</h2>
            <h2 className='mb-6 text-center text-2xl font-bold text-white'>Welcome, Let's get started </h2>

            <form onSubmit={handleOnboarding}>
                <div className="mb-4">
                    <label htmlFor="username"
                    className='mb-2 block text-sm text-gray-300'
                    >
                        username
                    </label>
                    <input type="text" id='username' value={username}  onChange={(e)=>setUsername(e.target.value)} required
                        className='w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:outline-none'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age"
                    className='mb-2 block text-sm text-gray-300'
                    >
                        Age
                    </label>
                    <input type="number" id='age' value={age}  onChange={(e)=>setAge(e.target.value)} required
                        className='w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:outline-none'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location"
                    className='mb-2 block text-sm text-gray-300'
                    >
                        Location
                    </label>
                    <input type="text" id='location' value={location}  onChange={(e)=>setLocation(e.target.value)} required
                        className='w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:outline-none'
                    />
                </div>

                <button type="submit"
                    className='mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
                >Get Started</button>

            </form>


        </div>

    </div>
  )
}
