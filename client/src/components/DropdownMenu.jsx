import ('../style/general.css');
import ('../style/card.css');
import {useState} from 'react';
import {QUERY_ANIMALS} from '../utils/queries.js';

export default function DropdownMenu() {
    const [selectedValue, setSelectedValue] = useState(null);
  
    const handleSelect = (value) => {
      setSelectedValue(value);
     
     }
      //if pick 2 pairs need to render 4 cards - 2 with animals and 2 with characteristics
      //if pick 3 pairs need to render 6 cards - 3 with animals and 3 with characteristics
      //if pick 4 pairs need to render 8 cards - 4 with animals and 4 with characteristics

      console.log(`Selected ${value} pairs`);
    
  
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
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSelect(2)}
            >
              2 pairs
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSelect(3)}
            >
              3 pairs
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSelect(4)}
            >
              4 pairs
            </a>
          </li>
        </ul>
        <div className = "cardContainer">
            {
                [Animal(selectedValue).keys().map((index) => (
                    <div key = {index} className = "pair">
                        <AnimalCard />
                        <CharacteristicsCard/>
                        </div>
                ))]
            }

        </div>
      </div>
    );
  };
  