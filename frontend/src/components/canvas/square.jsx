import React from 'react';

const Square = ({children}) => (
    <div className="square" style={{
        width: "100%",
        height: "100%", 
        border: "none"
        }}>
        { children }
    </div>
)
export default Square; 