import React, { useState, useEffect } from 'react'
import axios from "axios"
import "../App.css"

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Filter(props) {
    const [selection, setSelection] = useState(3);
    const [issues, setIssues] = useState([]);
    const [issues1, setIssues1] = useState([]);
    const [issues2, setIssues2] = useState([]);
    const [issues3, setIssues3] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    useEffect(() => {
        axios.get("/api/list-issues")
            .then((res) => {
                setIssues(res.data);
                selection === 0 ? (
                    issues.issues.forEach((issue) => { 
                        if(issue.isOpen===false)
                        setIssues1((prevIssue) => {
                            return [
                                ...prevIssue,
                                issue
                            ]
                        })
                    })
                ) : (
                        selection===1 ? (
                            issues.issues.forEach((issue) => {
                                if(issue.isOpen===true)
                                setIssues2((prevIssue) => {
                                    return [
                                        ...prevIssue,
                                        issue
                                    ]
                                })
                            })
                        ) : (
                            issues.issues.forEach((issue) => {
                                setIssues3((prevIssue) => {
                                    return [
                                        ...prevIssue,
                                        issue
                                    ]
                                })
                            })
                        )
                    )
            })
            .catch((err) => {
            console.log(err);
            })
    },[selection])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <div>
        <div className="set-filter">
        <Button aria-controls="simple-menu"  variant="contained" aria-haspopup="true" onClick={handleClick}>
        Filter
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
            >
                    <MenuItem onClick={() => { setSelection(1);props.onSelection(issues3);setSelection(2);setAnchorEl(null);}}>All Issues</MenuItem>
                    <MenuItem onClick={() => { setSelection(2);props.onSelection(issues2);setSelection(1);setAnchorEl(null);}}>Open Issues</MenuItem>
                    <MenuItem onClick={() => { setSelection(1);props.onSelection(issues1);setSelection(0);setAnchorEl(null);}}>Closed Issues</MenuItem>
            </Menu>
            </div>

        </div>

    )
}

export default Filter
