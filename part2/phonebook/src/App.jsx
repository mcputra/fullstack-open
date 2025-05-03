import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredName, setFilteredName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const searchResult = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim());
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = persons.find((person) => person.name === newName);
        const newPersonObject = { ...personObject, number: newNumber };

        personService
          .update(personObject.id, newPersonObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personObject.id ? person : response.data
              )
            );
            setMessage(`Updated ${newName}`);
            setMessageType("success");
          })
          .catch(() => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setMessageType("error");
          });
      } else {
        return;
      }
    } else {
      const personObject = { name: newName, number: newNumber };

      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });

      setMessage(`Added ${newName}`);
      setMessageType("success");
    }

    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete?")) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filteredName} onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onAdd={handleAdd}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={searchResult} onDelete={handleDelete} />
    </div>
  );
};

export default App;
