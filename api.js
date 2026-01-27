// require const's
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const dataCfg = require("./src/cfg")
const { createConnection } = require("node:net")
const defs = require("./src/responses")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(3000, () => {
    console.log("API is running")
})
const API_VERSION = "1.0.0"
const API_AVAILABLE = true
app.use((req, res, next) => {
    if (API_AVAILABLE === true) {
        next()
    } else {
        return res.status(503).json(defs.response("Error", "Sorry, the API is in maintence", 0, null))
    }
})

const connection = mysql.createConnection(dataCfg.user)
// get NOTES
app.get("/allNotes", (req, res) => {
    connection.query("SELECT * FROM notes", (err, result) => {
        if (err) {
            return res.status(503).json(defs.response("ERROR", "Notes NOT found", 0, null))
        } else {
            return res.status(200).json(result)
        }
    })
})
// Get note by ID
app.get("/note/:id", (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return res.status(400).json(defs.response("Error", "ID must be a number !", 0, null))
    }
    connection.query("SELECT * FROM notes WHERE id = ?", [id], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                return res.json(defs.response("Success", "Task found", rows.affectedRows, rows))
            } else {
                return res.status(404).json(defs.response("Error", "Task not found", 0, null))
            }
        } else {
            res.status(500).json(defs.response("Error", err.message, 0, null))
        }
    })
})
app.get("/note/search/:note", (req, res) => {
    const note = String(req.params.note)
    if (!note || note.trim() === "") {
        return res.status(400).json(defs.response("Error", "Search term is required", 0, null))
    }
    connection.query("SELECT * FROM notes WHERE note LIKE ?", [`%${note}%`], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                return res.json(defs.response("Success", "Note found", rows.affectedRows, rows))
            } else {
                return res.status(404).json(defs.response("Error", "Note not found", 0, null))
            }
        } else {
            res.status(500).json("Error", err.message, 0, null)
        }
    })
})
// create a note 
app.post("/note/create", (req, res) => {
    const postData = req.body
    const note = postData.note
    const title = postData.title
    //check if data is invalid
    if (!title || title.trim() === "") {
        return res.status(400).json(defs.response("Error", "Title can not be empty", 0, null))
    }
    if (!note || note.trim() === "") {
        return res.status(400).json(defs.response("Error", "Note must be a content", 0, null))
    }
    // query connection  
    connection.query("INSERT INTO notes (title, note, created_at, modified_at) VALUES (?, ?, NOW(), NOW())", [title, note], (err, result) => {
        if (!err) {
            return res.status(201).json(defs.response("Success", "Note created", result.affectedRows, null))
        } else {
            return res.status(500).json(defs.response("Error", err.message, 0, null))
        }
    })
})
// edit NOTE
app.put("/note/edit/:id", (req, res) => {
    const postData = req.body
    const title = postData.title
    if (!title || title.trim() === "") {
        return res.status(400).json(defs.response("Error", "Title can not be empty", 0, null))
    }
    const note = postData.note
    if (!note || note.trim() === "") {
        return res.status(400).json(defs.response("Error", "Note must be a content", 0, null))
    }
    const id = req.params.id
    // query
    connection.query("UPDATE notes SET note = ?, modified_at = NOW() WHERE id = ?", [note, id], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                res.json(defs.response("Success", "Note sussefully updated", result.affectedRows, result))
            } else {
                return res.status(404).json(defs.response("error", "ID not found"), 0, null)
            }
        } else {
            return res.status(500).json(defs.response("Internal error", err.message, 0, null))
        }
    })
})
// DELETE ALL NOTES
app.delete("/notes/deleteAll", (req, res) => {
    connection.query("DELETE FROM notes", (err, rows) => {
        if (!err) {
            if (rows.affectedRows <= 0) {
                res.status(400).json(defs.response("Error", "Do not exists notes here!", 0, null))
            } else {
                res.status(200).json(defs.response("Success", "All notes are deleted", rows.affectedRows,))
            }
        } else {
            res.status(500).json(defs.response("Internal Error", err.message, 0, null))
        }
    })
})
// delete specifc note
app.delete("/note/delete/:id", (req, res) => {
    const id = req.params.id
    // query connection
    connection.query("DELETE FROM notes WHERE id = ?", [id], (err, rows) => {
        if (!err) {
            if (rows.affectedRows > 0) {
                res.status(200).json(defs.response(`Success`, `Task ${id} are deleted`, rows.affectedRows, null))
            } else {
                res.status(404).json(defs.response("Error", "Task not found", 0, null))
            }
        } else {
            res.status(500).json(defs.response("Error", err.message, 0, null))
        }
    })
})
app.use((req, res) => {
    res.status(404).json(defs.response("Error", "Route NOT found", 0, null))
})
