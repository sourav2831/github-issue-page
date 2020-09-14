const express = require("express")
const { addIssue,getIssues,updateIssue,deleteIssue } = require("../controllers/issue.controller")
const { issueValidator } = require("../validators/issue.validator")
const { runValidation } = require("../validators");

const router = express.Router()

router.post("/add-issue", issueValidator, runValidation, addIssue)

router.get("/list-issues", getIssues)

router.patch("/update-issue/:issueId", updateIssue)

router.delete("/delete-issue/:issueId", deleteIssue)

module.exports=router