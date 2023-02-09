//For pages/new-player.js

import { useState } from 'react';
import NewPlayer from './NewPlayerForm.module.css';

function PlayerForm(props) {

    if (props?.playerToUpdate) {
        console.log('in edit mode', props.playerToUpdate);
    }

    const [playerName, setPlayerName] = useState(props?.playerToUpdate ? props.playerToUpdate.fullName : '');
    const [playerDOB, setPlayerDOB] = useState(props?.playerToUpdate ? props.playerToUpdate.dateOfBirth : '');
    const [playerDescription, setPlayerDescription] = useState(props?.playerToUpdate ? props.playerToUpdate.description : '');
    const [image, setImageOne] = useState(props?.playerToUpdate ? props.playerToUpdate.image : '');

    const onSetPlayerNameHandler = (event) => {
        setPlayerName(event.target.value);
    }
    const onSetPlayerDOBHandler = (event) => {
        setPlayerDOB(event.target.value);
    }
    const onSetPlayerDescriptionHandler = (event) => {
        setPlayerDescription(event.target.value);
    }

    const convert2base64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageOne(reader.result.toString());
        };
        reader.readAsDataURL(file)
    };

    function submitHandler(event) {
        event.preventDefault();

        const enteredPlayerName = playerName;
        const enteredDOB = playerDOB;
        const enteredDescription = playerDescription;


        const playerData = {
            fullName: enteredPlayerName,
            dateOfBirth: enteredDOB,
            description: enteredDescription,
            image: image
        };

        props.onPlayerFormComplete(playerData);
    }

    return (
        <div>
            <form className={NewPlayer.form} onSubmit={submitHandler}>
                <div className={NewPlayer.control}>
                    <label htmlFor='playerName'>New Player's Name</label>
                    <input type='text' required id='playerName' value={playerName} onChange={onSetPlayerNameHandler} />
                </div>
                <div className={NewPlayer.control}>
                    <label htmlFor='DOB'>Date of Birth</label>
                    <input type='date' required id='DOB' value={playerDOB} onChange={onSetPlayerDOBHandler} />
                </div>
                <div className={NewPlayer.control}>
                    <label htmlFor='description'>Player's Description</label>
                    <input type='text' required id='description' value={playerDescription} onChange={onSetPlayerDescriptionHandler} />
                </div>
                <div className={NewPlayer.control}>
                    {image ? (
                        <img src={image} />
                    ) : (
                        <div>
                            <label htmlFor='image'>Upload Player's Image</label>
                            <input id='image' type='file' required onChange={e => convert2base64(e)} />
                        </div>
                    )}
                </div>
                <div className={NewPlayer.actions}>

                    <button>{props.playerToUpdate ? `Update ${props.playerToUpdate.fullName}` : 'Add New Player'}</button>
                </div>
            </form>
        </div>
    );
}

export default PlayerForm;

//NOTES ARE MADE FOR THE FLOW OF THE CODE//

//The useRef Hook allows you to persist values between renders.
//It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.

//useref takes all the current value of the element
// on sumbit of the form call sumbithandler function, which takes all the 
//Current values of each element and sends it to new-player.js page through
//Through props onAddplayer
