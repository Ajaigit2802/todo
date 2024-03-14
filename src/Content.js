import React from 'react'
import { useState } from 'react'
import {  FaTrashAlt } from "react-icons/fa";
export const Content  = ({items,handleCheck,handleDelete}) => {
    
  return (
    <>
       <ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input type="checkbox"
            onChange={() => handleCheck(item.id)}
            checked={item.checked} />
            <label 
            style={(item.checked) ? {textDecoration:'line-through'}:null}
            onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
            <FaTrashAlt
             role="button"
             onClick={() => handleDelete(item.id)}
             tabIndex="0"
             />
          </li>
        ))}
       </ul>
    </>
    
  )
}
export default Content