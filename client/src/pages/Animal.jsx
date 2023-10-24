import Card from ('../components/Card.jsx');
import  DropdownMenu from '../components/DropdownMenu';

import ('../style/general.css');
import ('../style/card.css');

export default function Concentration() {
    return (
      <div>
        <h1>Animal Concentration</h1>
  
        <h4>
         Instructions
        </h4>
  
        <p>
         Pick how many pairs of cards you would like to play with. Then click on one card at a time. Your goal is to match the animal to its characteristic. Example : you turn over a rabbit card, so you are looking for a rabbit characteristic as your second card. If you match them, they disappear and you try again. You are working against the clock. See how fast you can match the different pairs.
        </p>
        
        <div>
<DropdownMenu>
    
</DropdownMenu>
        </div>
     </div>
  
    )};