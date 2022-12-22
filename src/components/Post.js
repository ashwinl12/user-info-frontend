import React from 'react'
import "./styles/post.css"

function Post(props) {
  return (
    <div className='box'>
        <span className='count'>{props.count}</span>
        <h3>Card</h3>
        <div className='info'>
            <label>Username</label>
            <h4>{props.username}</h4>
            <label>Date of Birth</label>
            <h4>{props.dob}</h4>
            <label>Email</label>
            <h4>{props.email}</h4>
            <label>Mobile</label>
            <h4>{props.mobile}</h4>
        </div>
    </div>
  )
}

export default Post