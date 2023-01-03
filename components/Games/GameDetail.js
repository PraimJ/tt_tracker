import Card from '../UI/Card';

function GameDetail(props) {
    return (
        <Card>
            <div>Winner: {props.winner}</div>
            <div>PlayerOne:{props.playerOne} & Score:{props.playerOneScore}</div>
            <div>PlayerTwo:{props.playerTwo} & Score:{props.playerTwoScore}</div>
            <div>Date:{props.date}</div>
        </Card>
    );
}

export default GameDetail;