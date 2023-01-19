
import PlayersList from "./PlayersList";


function PlayerDetails(props) {

    if (props.players && props.players.length > 0) {
        return (
            <>
                <PlayersList passedPlayers={props.players}></PlayersList>
            </>
        );
    }

    return (
        <>
            <div>
                Sorry, there are no players on this organization, click here to add a player.
            </div>
        </>
    );


}


export default PlayerDetails;
