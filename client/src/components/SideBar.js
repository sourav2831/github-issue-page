import React from 'react';
import CreateArea from "./CreateArea.js"
import Note from "./Notes.js"
import { makeStyles } from "@material-ui/core/styles"
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText, 
  Container
} from "@material-ui/core";

 
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({ 
  drawerPaper: { 
    width: 'inherit',
    margin:'78px 0px 0px 0px',
},
  link: {    
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function SideBar(props) {
  const classes = useStyles();
  function addThis(note){
    props.onAddition(note);
  }
  function modifyNote(note){
    props.onAddition(note);
  }
  function deleteNote(id) {
    props.onDelete(id);    
  }
  let si=-1;
  function cSi(noteItem){
    si=noteItem.title.toLocaleLowerCase().indexOf(props.searchValue);
  }
  // const noMatch=()=>{
    
  // }
  return (
    <Router>
      <div style={{ display: 'flex' }} >
        <Drawer
          style={{ width: '220px'}}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText  primary={"Add Issues"} />
              </ListItem>
            </Link>
            {
              props.myNotes.map((noteItem,index)=>{
                return <Link to={`/${noteItem.title}`} className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>
                {cSi(noteItem)}
                {props.check && <>
                {`${noteItem.title.substring(0,si)}`}
                <mark>{noteItem.title.substring(si,si+props.searchValue.length)}</mark>
                {`${noteItem.title.substring(si+props.searchValue.length)}`}
                </>}
                {!props.check && <>
                  <ListItemText  primary={`${noteItem.title}`} />
                </>}
              </ListItem>
            </Link>
              }
              )
            }
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/">
            <Container>
                <CreateArea onAdd={addThis}/>
            </Container>
          </Route>
          {
            props.myNotes.map((noteItem,index)=>{
              return<Route exact path={`/${noteItem.title}`}>
            <Container>
            <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.comment}
            onModify={modifyNote}
            onDelete={deleteNote}
          />
            </Container>
          </Route>
            })
          }
          {/* <Route component={noMatch}>
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default SideBar;