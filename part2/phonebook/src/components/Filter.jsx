const Filter = ({ search, onFilterChange }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
