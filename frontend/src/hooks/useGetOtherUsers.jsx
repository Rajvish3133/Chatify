import axios from 'axios'
import React, {useEffect} from 'react'
import { setOtherUsers } from '../redux/userSlice'
import {useDispatch} from "react-redux"
import { BACKEND_URL } from '../main.jsx'

const useGetOtherUsers = () => {

   const dispatch = useDispatch();

useEffect(()=>{

 const fetchOtherUsers = async () =>{
    try {
     const res = await axios.get(`${BACKEND_URL}/api/v1/user/`,{
      withCredentials:true
     });
     dispatch(setOtherUsers(res.data))

    } catch (error) {
        console.log(error);
    }
 }
   fetchOtherUsers();
},[])
    
}

export default useGetOtherUsers

