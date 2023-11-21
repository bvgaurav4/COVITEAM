// SearchComponent.tsx
import React, { useState, useEffect } from 'react';
import {TextInput} from '@mantine/core'; // Make sure to import your TextInput component

const SearchComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);

    const handleInputClick = (event) => {
  console.log('search input click');
  event.stopPropagation(); // Stop the event from propagating to document click
  setShowDropdown(!showDropdown);
};

  useEffect(() => {
    const handleDocumentClick = (event) => {
        if (showDropdown && !event.target.closest('.dropdown-container')) {
          console.log('click outside of search container');
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showDropdown]);

  return (
    <div className="search-container">
      <TextInput radius="xl" placeholder="Search" onClick={handleInputClick} />

      {showDropdown && (
        <div className="dropdown-container">
          {/* Dropdown content goes here */}
          Result 1
          Result 2
          {/* ... */}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
