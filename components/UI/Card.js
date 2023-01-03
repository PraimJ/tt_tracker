import cardstyle from './Card.module.css';

function Card(props) {
    return <div className={cardstyle.card}>{props.children}</div>;
}

export default Card;

//This cardstyle is a imported from the Card.module.css
//Then you use cardstyle.(what ever the class you want to name it, apply it to any eleemnt you want)
//{props.children} is all the children elements within the div, so style applies to all within the div