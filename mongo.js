const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://alfred:${password}@cluster0.zfo8u.mongodb.net/fullstackopen-notes-2?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "GraphQL over REST",
  date: new Date(),
  important: true,
});

note
  .save()
  .then((result) => {
    console.log(result);
    console.log("note saved");
    mongoose.connection.close();
  })
  .catch((e) => {
    console.log(e.message);
    mongoose.connection.close();
  });

// Note.find({})
//   .then((result) => {
//     result.forEach((note) => {
//       console.log(note);
//     });
//     mongoose.connection.close();
//   })
// .catch((e) => {
//   console.log(e.message);
//   mongoose.connection.close();
// });
