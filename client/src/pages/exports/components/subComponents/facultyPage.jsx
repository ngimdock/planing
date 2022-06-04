import React from 'react'
import exportBaseStyle from '../../css/exports.module.css'

const FacultyPage = ({ name }) => {
  return (
    <div className={exportBaseStyle.divisor} style={{
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <h1>
            {name}
        </h1>
    </div>
  )
}

export default FacultyPage