const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const express =require('express');
const app=express();
const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', function(req, res) {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    dbData = JSON.parse(data);
    res.send(dbData);
  });
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

function makeNote(body, notesArray){
  const newN = body;
  if(!Array.isArray(notesArray))
    notesArray=[];
  if(notesArray.length===0)
    notesArray.push(0);
   
  body.id = notesArray[0];
  notesArray[0]++;  

  notesArray.push(newN);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return newN;
  
}

app.post('/api/notes', function(req, res){
  const newN=makeNote(req.body,notes);
  res.json(newN);
});

function delNote(id, notesArray){
  for(i=0;i<notesArray.length;i++){
    let _note = notesArray[i];
    if (_note.id==id){
      notesArray.splice(i,1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    break;
    }
  }
}


app.delete('/api/notes/:id', (req, res) => {
  delNote(req.params.id, notes);
  res.json(true);
});

app.listen(PORT, function(){
  console.log(`Now listening on PORT: ${PORT}`);
});  