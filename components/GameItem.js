// import { useRouter } from 'next/router';
import Card from './UI/Card';
// import classes from './MeetupItem.module.css';

function GameItem(props) {
    //   const router = useRouter();

    //   function showDetailsHandler() {
    //     router.push('/' + props.id);
    //   }

    return (
        <Card>
            <div>Winner: {props.winner}</div>
            <div>PlayerOne:{props.playerOne} & Score:{props.playerOneScore}</div>
            <div>PlayerTwo:{props.playerTwo} & Score:{props.playerTwoScore}</div>
            <div>Date:{props.date}</div>
            {/* <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div> */}
        </Card>
    );
}

export default GameItem;