const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("format:");
  console.log("1. add person: node mongo.js <password> <name> <number>");
  console.log("2. list all person: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://drachansta:${password}@cluster0.8vmb7ua.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
}
