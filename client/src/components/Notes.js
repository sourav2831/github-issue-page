import React, { useState } from "react";
import axios from "axios"

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import "../App.css";
function Note(props) {
  const [note, setNote] = useState(
    {
      title:props.title,
      content:props.content
    }
  );
function handleDelete(){
    props.onDelete(props.id);
}
  function handleModify() {
    const issueDetail = {
      title: note.title,
      comment:note.content
  }
  axios.patch(`/api/update-issue/${props.id}`, issueDetail)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
          console.log(err);
      })
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
  return (
    <div>
          <Fab onClick={handleDelete} className="fab">
        <DeleteIcon />
      </Fab>
      <form className="create-note">
        {(
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Comment..."
          rows={13.5}
        />
          <Fab onClick={handleModify}>
            <AddIcon />
          </Fab>
      </form>
    </div>
  );
}

export default Note;
