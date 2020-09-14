import React from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter"

function Header(props) {
  function onSearch(search){
    props.search(search);
    }
    function selection(issues) {
        props.onSelection(issues)
    }
  return (
    <header>
      <h1>
              Github Issue
      </h1>
          <Filter onSelection={selection}/>
      <SearchBar search={onSearch} />
    </header>
  );
}

export default Header;