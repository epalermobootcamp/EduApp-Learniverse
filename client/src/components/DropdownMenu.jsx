import "../style/general.css";
import "../style/card.css";
import { useState } from "react";

export function DropdownMenu() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    console.log(`Selected ${value} pairs`);
  };

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Select the number of pairs
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li>
          <a className="dropdown-item" href="#" onClick={() => handleSelect(2)}>
            2 pairs
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={() => handleSelect(3)}>
            3 pairs
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={() => handleSelect(4)}>
            4 pairs
          </a>
        </li>
      </ul>
    </div>
  );
}
