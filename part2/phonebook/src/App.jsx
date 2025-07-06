import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    personService.create(personObject).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onFilterChange={handleFilterChange} />
      <Form
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <Persons persons={persons} search={search} onDelete={handleDelete} />
    </div>
  );
};

export default App;
