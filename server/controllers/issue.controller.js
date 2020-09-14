const Issue = require("../models/issue.model")

exports.addIssue = (req, res) => {
    const { title, comment } = req.body
    const issue = new Issue({
        title: title,
        comment: comment,
        createdAt: new Date().getTime(), 
    })
    issue.save((err) => {
        if (err) {
            return res.json({ 
                error:err
            })
        }
        return res.json({
            message:"Issue saved successfully"
        }) 
    })
}

exports.getIssues = (req, res) => {
    Issue.find({},null, { sort: { createdAt: -1 } }, (err, issue) => {
        if (err) {
            return res.json({
                error:"Something went wrong!!"
            })
        }
        return res.json({
            issues:issue
        })
    })
}

exports.updateIssue = (req, res) => {
    const { issueId } = req.params
    const { title, comment } = req.body
    Issue.find({ _id: issueId }, (err, issue) => {
        if (err) {
            return res.json({
                error:err
            })
        }
        if (issue.length===0) {
            return res.json({
                error:"issue does not exist!!"
            })
        }
        Issue.updateMany({ _id: issueId }, { $set: { title: title, comment: comment } }, (err, __) => {
            if (err) {
                return res.json({
                    error:err
                })
            }
            return res.status(200).json({
                message:"Issue updated successfully"
            })
        })
    })

}

exports.deleteIssue = (req, res) => {
    const { issueId } = req.params
    Issue.findOneAndDelete({ _id: issueId }, (err) => {
        if (err) {
            return res.json({
                error:"Something went wrong!!"
            })
        }
        return res.status(200).json({
            message:"Deleted successfully"
        })
    })
}
