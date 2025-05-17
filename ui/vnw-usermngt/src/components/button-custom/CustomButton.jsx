import React, { Component, useEffect } from 'react';
import './CustomButton.scss'



export default function CustomButton({content, handleClick}) {

  return (
    <div>
      <button type="button" className="custom-button" onClick={handleClick}>{content}</button>
    </div>
  )
}
