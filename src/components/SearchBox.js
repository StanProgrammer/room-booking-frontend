import React, { useState } from 'react';

const SearchBox = ({ setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      console.log(1)
      setSearchQuery(searchTerm)
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  return (
    <div className="input-group">
      <div className="form-outline" data-mdb-input-init>
        <input
          type="search"
          id="form1"
          placeholder="Search"
          className="form-control"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn bg-dark text-white" data-mdb-ripple-init onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBox;
