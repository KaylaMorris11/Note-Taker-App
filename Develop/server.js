const fs = require('fs');
const util = require('util');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const express = require("express");
// const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
            const parsedData = JSON.parse(data);
            res.json(parsedData);

            return parsedData;
        }
    });
});

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            content.id = uuidv4();
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

app.post("/api/notes", (req, res) => {
    //Get the current Notes by reading them from `db.json`
    var readData = fs.readFile("./db/db.json", 'utf8', (err, data) => {
        // const notes = JSON.parse(data);

        //Save the newly extended collection back to db.json
        // const notesJSON = JSON.stringify(notes);

        if (req.body) {
            readAndAppend(req.body, './db/db.json');
            return readData;
        } else {
            res.error('Error in adding note');
        }
    });
});


// app.delete("/delete/:id", (req, res) => {
//     db.notes.remove(
//       {
//         _id: mongojs.ObjectID(req.params.id)
//       },
//       (error, data) => {
//         if (error) {
//           res.send(error);
//         } else {
//           res.send(data);
//         }
//       }
//     );
//   });


app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, '/public/index.html'))

});

app.listen(PORT, () => {
    console.log(`App listening on PORT http://localhost:${PORT}`);
});