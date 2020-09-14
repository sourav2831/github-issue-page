import React,{useState} from 'react';
import { Form, FormControl } from 'react-bootstrap';

function SearchBar(props){
  const [search,setSearch]=useState("");
  function handleChange(event){
    setSearch(event.target.value);
    props.search(event.target.value);
  }
    return(
      <Form className="form-center">
        <FormControl type="text" placeholder="Search Issues...." onChange={handleChange} value={search}/>
      </Form>
    );
}
export default SearchBar;