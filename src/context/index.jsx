import React , { createContext , useContext , useState , useCallback } from 'react'

import {db} from '../utils/dbConfig'

import {Users , Records } from '../utils/Schema'
import {eq} from 'drizzle-orm'

const StateContext = createContext(); 

export const StateContextProvider = ({children})=>{
    const [users, setUsers] = useState([]);
    const [records, setRecords] = useState([]);
    const [currentUser , setCurrentUser] = useState([]);


    const fetchUsers = useCallback(async ()=>{
        try {
            const result = await db.select().from(Users).execute();
            setUsers(result)
        } catch (error) {
            console.error("error while fetching users " , error ) ;
        }
    },[]) 

    const fetchUserByEmail = useCallback(async (email)=>{
        try {
            const result = await db.select().from(Users).where(eq(Users.createdBy,email)).execute();
            if( result.length > 0 ){
                setCurrentUser(result[0]);
            }
        } catch (error) {
            console.error("error while fetching user by email " , error ) ;
        }
    },[])

    const createUser = useCallback(async(userData)=>{
        try {
            const newUser = await db.insert(Users).values(userData).returning().execute();
            setUsers([...users , newUser[0] ])
        } catch (error) {
            console.error("error while creating user " , error ) ;
        }
    },[])



    const fetchUserRecords = useCallback( async (userEmail)=> {
        try {
            const result = await db.select().from(Records).where(eq(Records.createdBy , userEmail)).execute() ;
            if( result.length > 0 ){
                setRecords(result) ;
            }
        } catch (error) {
            console.error("error while fetching user records " , error ) ;
        }
    },[])

    const createRecord = useCallback(async (recordData)=>{
        try {
            const newRecord = await db.insert(Records).values(recordData).returning({id: Records.id}).execute() ;
            setRecords([...records , newRecord[0] ]) ;
            return newRecord[0] ;
        } catch (error) {
            console.error("error while creating record " , error ) ;
        }
    },[])

    const updateRecord = useCallback( async (recordData)=>{
        try {
            const {documentID , ...dataToUpdate} = recordData ;
            const updateRecords = await db.update(Records).set(dataToUpdate).where(eq(Records.id , documentID)). returning().execute() ;
            setRecords( (prevRec)=> prevRec.map((rec)=>( rec.id === documentID) ? updateRecords[0] : rec) )
        } catch (error) {
            console.error ( "error while updating data " , error ) ;
            return null ;
        }
    },[])

    return (
        <StateContext.Provider value={{
            users,
            records,
            currentUser,
            fetchUsers,
            fetchUserByEmail,
            createUser,
            fetchUserRecords,
            createRecord,
            updateRecord
        }}>
            {children}
        </StateContext.Provider>
    )



};
// custom hook : 
export const useStateContext = ()=>{
    return useContext(StateContext);  // returns the context object
}

