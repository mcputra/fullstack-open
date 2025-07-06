import Person from "./Person";

const Persons = ({ persons, search, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} person={person} onDelete={onDelete} />
        ))}
    </>
  );
};

export default Persons;
