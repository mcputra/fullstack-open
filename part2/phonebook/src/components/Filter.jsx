const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      filter shown with a<input value={filter} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
