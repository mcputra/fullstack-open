const PersonForm = ({ onAdd, onNameChange, onNumberChange, name, number }) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onAdd}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
