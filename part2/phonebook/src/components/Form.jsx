const Form = ({
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
