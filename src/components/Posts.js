import React, { isValidElement, useState } from 'react'
import Post from "./Post"
import "./styles/posts.css"
import Axios from "axios"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Posts() {

    const [userData, setUserData] = useState([]);
    const [counter, setCounter] = useState(0);

    const getCount = ()=> {
        setCounter(++counter);
        return counter;
    }

    useEffect(()=> {
        Axios.get("https://user-info-api.onrender.com/posts").then((response)=>{
            setUserData(response.data)
            console.log(userData)
        })
    }, [])

  return (
    <div className='myContainer'>
        <Link to="/" style={{ textDecoration: 'none', color: '#555' }}><button className='home'>Home</button></Link>
        <div className='box-container'>
            { 
                userData.map((val, key)=>{
                    return <Post key={key} 
                        username={val.username}
                        dob={val.dob}
                        email={val.email}
                        mobile={val.mobile}
                        count={key+1}
                    />
                })
            }
        </div>
    </div>
  )
}

export default Posts