import "../style/general.css";
import "../style/card.css";
import { useState } from "react";

import Dropdown from 'react-bootstrap/Dropdown';

export function DropdownMenu({handleSelect}) {
  const [selectedValue, setSelectedValue] = useState(null);



  return (

        <Dropdown onSelect={(eventKey, eventObject)=>{handleSelect(eventKey)}}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select the number of pairs
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item eventKey={2}>2 Pairs</Dropdown.Item>
            <Dropdown.Item eventKey={3}>3 Pairs</Dropdown.Item>
            <Dropdown.Item eventKey={4}>4 Pairs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

    
  );
}
