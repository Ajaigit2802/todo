

import { Content } from './Content';
import Header from './Header';
import Footer from './Footer';
import './index.css';
import { useState } from 'react'
import AddItem from './AddItem';
import Searchitem from './Searchitem';
import { useEffect } from 'react';
/* import apiRequest from './apiRequest'; */


function App() {
  

  const [items, setItems]=useState(JSON.parse(localStorage.getItem('todo'))||[])
  /* const API_URL ="http://localhost:3500/item" */
    const [newItem, setNewItem] =useState('')
    const [search, setSearch]=useState('')
    const[fetchError, setFetchError]=useState(null)
    const[isLoading, setIsLoading]=useState(true)

   /*  useEffect( () => {
      const fetchItems = async () => {
        try{
          const response=await fetch(API_URL)
          if(!response.ok) throw Error ("Data not received")
          const listItems=await response.json()
          console.log(listItems)
          setItems(listItems)
          setFetchError(null)
        }catch(err){
          setFetchError(err.message)
        }finally{
          setIsLoading(false)
        }
      }
      setTimeout (() =>{
        (async () => await fetchItems())()
      },2000)
      JSON.parse(localStorage.getItem('todo'))
    },[]) */

  const handleCheck =  (id)=> {
        const listItems=items.map(item => item.id===id ? {...item,checked:!item.checked} : item)
        setItems(listItems)
       /*  const myItem=listItems.filter((item)=>item.id===id) */
        localStorage.setItem('todo', JSON.stringify(listItems))
        /* const updateOptions ={
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({checked:myItem[0].checked})
        }
        const rurl=`${API_URL}/${id}`
        const result=await apiRequest(rurl,updateOptions)
        if(result) setFetchError(result) */
  }
  const handleDelete =  (id) =>{
    const listItems=items.filter((item) => item.id!==id)
    setItems(listItems)
    localStorage.setItem('todo', JSON.stringify(listItems))

    /* const deleteOptions ={method:'DELETE'}
    const rurl=`${API_URL}/${id}`
    const result=await apiRequest(rurl,deleteOptions)
    if(result) setFetchError(result) */
  }

  const addItem =(item) =>{
    const id= items.length ? items[items.length-1].id + 1 : 1
    const addNewItem={id,checked:false,item}
    const listItems=[...items,addNewItem]
    setItems(listItems)
    localStorage.setItem('todo', JSON.stringify(listItems))
    /* const postOptions ={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }
    const result=await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result) */
  }


  const handleSubmit = (e) =>{
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }
  
      
  return (
    <div>
      <Header />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Searchitem 
      search={search}
      setSearch={setSearch}
      />
    <main>
      
    {/* {fetchError && <p>{`Error:${fetchError}`}</p>}
    {isLoading && <p>{`Data is Loading`}</p>}
      {!isLoading && !fetchError && */} <Content 
        items={items .filter(item => (item.item).includes(search))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
     
    </main>
    <Footer
    length={items.length}
    />
    </div>
  );
}

export default App;
