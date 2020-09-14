import React, { useState, useEffect } from 'react';
import Header from "./components/Header.js";
import Sidebar from './components/SideBar.js';
import axios from "axios"
import "./App.css";
function App() {
  const [notes, setNotes] = useState([]);
  const [del,setDel]=useState(true)
  const [searchNotes, setSearchNotes] = useState([]);
  const [searchCheck,setSearchCheck]=useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios.get("/api/list-issues")
      .then((res) => {
        setNotes(res.data.issues);
      })
      .catch((err) => {
        console.log(err);
      })
  },[del])
  function deleteNote(id) {
    axios.delete(`/api/delete-issue/${id}`)
      .then((res) => {
        setDel(!del)
      })
      .catch((err) => {
      console.log(err);
    })
  }
  function addNote(newNote) {
    setSearchCheck(false);
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  function selection(issues) {
    setNotes(issues)
    console.log(issues);
  }
  function onSearch(search){
    setSearchValue(search);
    if(search===""){
      setSearchNotes(notes);
      setSearchCheck(false);
    }
    else{
      const newNotes=notes.filter((noteItem,index)=>{
        return noteItem.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase())!==-1;
      })
      setSearchNotes(newNotes);
      setSearchCheck(true);
    }
  }
  return (
    <div >
      <Header search={onSearch}
      onSelection={selection}
      />
    <Sidebar 
        onAddition={addNote} 
    myNotes={searchCheck?searchNotes:notes} 
    onDelete={deleteNote} 
    searchValue={searchValue.toLocaleLowerCase()}
    check={searchCheck}
    />
    </div>
  );
}
export default App;
