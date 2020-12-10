const { json } = require("express");
const fs = require("fs");

// Read the db.json file
let jsonDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// API routing app

module.exports = function(app) {
    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        return res.json(jsonDB);
    });

    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, 
    // and then return the new note to the client.
    app.post("/api/notes", function(req, res) {
        // receive a new note to save on the request body.
        let newNote = req.body;

        // make the unique id match the length of the data.
        let uniqueId = (jsonDB.length).toString();        
        console.log(uniqueId);
        newNote.id = uniqueId;

        // Add it to the db.json file
        jsonDB.push(newNote);        
        fs.writeFileSync("./db/db.json", JSON.stringify(jsonDB), function(err) {
            if (err) throw (err);        
        }); 

        // Return the new note to the client.
        res.json(jsonDB);    
    });

// I tried to use splice to remove the note, but it kept returning undefined.
// this would be more effecient working with large amounts of data.

    // // DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
    // app.delete("/api/notes/:id", function(req, res) {
    //     let noteId = req.params.id;
    //     console.log(`Deleting note with id ${noteId}`);
    //     //finds note by id, then converts the string into a JSON object with the id parameters of the request made
    //     let findNote = jsonDB.find(({ id }) => id === JSON.parse(noteId));
    //     console.log(findNote);
    //     // Delete object matching the index of the note ID
    //     jsonDB.splice(jsonDB.indexOf(findNote), 1);
    //     res.end("Note was deleted");
    // });

    
    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        jsonDB = jsonDB.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of jsonDB) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(jsonDB));
        res.json(jsonDB);
    }); 

};
