import React from 'react'
import { Link } from 'react-router-dom'
const Payment = () => {
  return (
    <div>
      <h2>Payment Page</h2>
      <p>After Successfully registered</p>
      <p>Click Here!!</p>
      <Link to='/QuizHome'>Start</Link>
    </div>
  )
}

export default Payment