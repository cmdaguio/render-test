const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

console.log("connecting to", url);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((results) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    consoole.log("error connecting to MongDB", error.message);
  });

const noteSchema = mongoose.Schema({
  content: String,
  important: Boolean,
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
