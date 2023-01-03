import { useRouter } from 'next/router';
import Card from '../UI/Card';
import classes from './GameItem.module.css';
// import classes from './MeetupItem.module.css';

function GameItem(props) {
    const router = useRouter();

    function showDetailsHandler() {
        router.push('/' + props.id);
    }

    return (
        <Card>
            <div className={classes.cardData}>
                <div>Winner: {props.winner}</div>
                <div>PlayerOne:{props.playerOne} & Score:{props.playerOneScore}</div>
                <div>PlayerTwo:{props.playerTwo} & Score:{props.playerTwoScore}</div>
                <div>Date:{props.date}</div>
                <div>
                    <button onClick={showDetailsHandler}>Show Details</button>
                </div>
            </div>
        </Card>
    );
}

export default GameItem;

//props are coming from GameList.js
//when the Show Details button is clicked the showDetailhandler will active
//the function showDetailsHandler pushes the props.id into the route, this will show you the indivaul gameitem on its own page
////SHOW DETAILS PAGE = our-domian.com/(gameID), this is going to pages/[gameID]/index.js