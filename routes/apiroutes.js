const router = require('express').Router();
const storage = require ('../db/storage')


//request
router.get('/notes', (req, res) => {
    storage
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
})


//post
router.post('/notes', (req, res) => {
    console.log(req.body)
    storage
        .addNote(req.body)
        .then(note => {
            res.json(note)
        })
})

//delete route
router.delete('/notes/:id', (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
})

module.exports = router;