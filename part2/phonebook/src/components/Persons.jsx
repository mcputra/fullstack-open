import Person from "./Person";

const Persons = ({ persons, search }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} person={person} />
        ))}
    </>
  );
};

export default Persons;
