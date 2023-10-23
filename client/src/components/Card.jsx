import '../style/card.css';
import '../style/general.css';

export default function Card({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,

}) {

   
    return (
    <div className="card">
<img src={imgSrc} alt= {imgAlt} className="cardImage"/>
    
    <h1 className="cardTitle">{title}</h1>

    <p className="cardDescription">{description}</p>

   {buttonText && link && <a href={link} className="cardBtn">{buttonText}</a>
    }
    </div>
    );
}