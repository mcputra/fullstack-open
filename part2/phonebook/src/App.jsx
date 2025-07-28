import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        const person = persons.find((person) => person.id === id);
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === id ? returnedPerson : person
              )
            );

            setType("success");
            setMessage("Number updated");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(() => {
            setPersons(persons.filter((person) => person.id !== id));

            setType("error");
            setMessage(
              `Information of ${person.name} has already been removed from server`
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response));

        setType("success");
        setMessage("Person added");
        setTimeout(() => {
          setMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
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
      <Notification message={message} type={type} />
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
