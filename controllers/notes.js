const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;

    const note = await Note.findById(id)
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

notesRouter.post("/", async (req, res, next) => {
    const {body} = req;

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    const savedNote = await note.save();
    res.json(savedNote);
});

notesRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    await Note.findByIdAndRemove(id);
    res.status(204).end();
});

notesRouter.put("/:id", async (req, res, next) => {
    const body = req.body;

    const note = {
        content: body.content,
        important: body.important,
    };

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {new: true});
    res.json(updatedNote);
});

module.exports = notesRouter;
