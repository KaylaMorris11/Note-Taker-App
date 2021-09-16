const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;



app.get("/api/notes", (req,res) => {
res.send("NOTES")
});

app.get("/notes", (req,res) => {
res.send("API NOTES")
});

app.listen(PORT, () => {
console.log(`App listening on PORT http://localhost:${PORT}`);
};

// const newNote = {
//     "title":"A New Note",
//     "text": "Testing text"
// };

// fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
// const notes = JSON.parse(data);
// const notesJSON = JSON.stringify(notes);
// });
 
