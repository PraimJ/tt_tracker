// import GameItem from './GameItem';
// import classes from './MeetupList.module.css';


function PlayersList(props) {

    if (props.passedPlayers && props.passedPlayers.length > 0) {
        return (
            <>
                <label htmlFor={props.selectId ? props.selectId : 'playerList'}>{props.labelText ? props.labelText : 'Select A Player'}</label>
                <select id={props.selectId ? props.selectId : 'playerList'} ref={props.refToPass ? props.refToPass : null}>
                    {props.passedPlayers.map((player) => (
                        <option
                            key={player.id}
                            id={player.id}
                            value={JSON.stringify(player)}>
                            {player.fullName}
                        </option>
                    ))}
                </select>
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


export default PlayersList;

//props are coming from pages/index.js
//props.games is mapped to become gamelist.