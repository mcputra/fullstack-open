import Person from "./Person";

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Persons;
