
function PlayersList(props) {

    function handleSetCurrentPlayer(event) {
        if (!props.passCurrentPlayerValueToParent) {
            return;
        }
        props.passCurrentPlayerValueToParent(JSON.parse(event.target.value));
    };

    if (props.passedPlayers && props.passedPlayers.length > 0) {
        return (
            <>
                <label htmlFor={props.selectId ? props.selectId : 'playerList'}>{props.labelText ? props.labelText : 'Select A Player'}</label>
                <select onChange={handleSetCurrentPlayer} id={props.selectId ? props.selectId : 'playerList'} ref={props.refToPass ? props.refToPass : null}>
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


//NOTES ARE MADE FOR THE FLOW OF THE CODE

//props are coming from PlayerDetails.js

//handleSetCurrentPlayer is getting actived by the onChange in the select element
//the IF statement if we dont have prop called passCurrentPlayerValuetoParent then it will return
//We have this as a saftey feature because we are using PlayersList is NewGameFrom
//props.passCurrentPlayerValueToParent(JSON.parse(event.target.value) is called from PlayerDetail and has to be JSON.parse turns a JSON String into a object

// if (props.passedPlayers && props.passedPlayers.length > 0), this is the condition for the select player list to show if not return a Error Message (there’s no players)

//htmlFor={props.selectId ? props.selectId : 'playerList'}
//This means for the element of htmlFor if it has (props.selectId) then display it if not then show ‘playerList’
//props are labelText, selectId & refToPass are coming from NewGameForm & PlayerDetail Components


//props.passedPlayers.map((player) => (
//props.passedPlayers is coming from PlayerDetails
//this maps through the whole array of players and gives each element a value from each object.

