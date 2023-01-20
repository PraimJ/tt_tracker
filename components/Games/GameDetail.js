import Card from '../UI/Card';
import classes from './GameDetail.module.css'

function GameDetail(props) {
    return (
        <Card>
            <div className={classes.cardData}>
                <div>Winner: {props.winner}</div>
                <div>PlayerOne:{props.playerOne} & Score:{props.playerOneScore}</div>
                <div>PlayerTwo:{props.playerTwo} & Score:{props.playerTwoScore}</div>
                <div>Date:{props.date}</div>
            </div>
        </Card>
    );
}

export default GameDetail;

//props are coming from pages/[gameID]/index.js
// Card is just styling the component