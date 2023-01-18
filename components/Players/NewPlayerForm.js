//For pages/new-player.js


import { useRef } from 'react';
import NewPlayer from './NewPlayerForm.module.css';

function NewPlayerForm(props) {
    const playerNameRef = useRef();
    const DOBRef = useRef();
    const descriptionRef = useRef();


    function submitHandler(event) {
        event.preventDefault();

        const enteredPlayerName = playerNameRef.current.value;
        const enteredDOB = DOBRef.current.value;
        const enteredDescription = descriptionRef.current.value;


        const playerData = {
            fullName: enteredPlayerName,
            dateOfBirth: enteredDOB,
            description: enteredDescription,
        };

        props.onAddPlayer(playerData);
    }

    return (
        <div>
            <form className={NewPlayer.form} onSubmit={submitHandler}>
                <div className={NewPlayer.control}>
                    <label htmlFor='playerName'>New Player's Name</label>
                    <input type='text' required id='playerName' ref={playerNameRef} />
                </div>
                <div className={NewPlayer.control}>
                    <label htmlFor='DOB'>Date of Birth</label>
                    <input type='date' required id='DOB' ref={DOBRef} />
                </div>
                <div className={NewPlayer.control}>
                    <label htmlFor='description'>Player's Description</label>
                    <input type='text' required id='description' ref={descriptionRef} />
                </div>
                <div className={NewPlayer.actions}>
                    <button>Add New Player</button>
                </div>
            </form>
        </div>
    );
}

export default NewPlayerForm