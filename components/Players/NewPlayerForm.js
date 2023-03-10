//For pages/new-player.js


import { useRef, useState } from 'react';
import NewPlayer from './NewPlayerForm.module.css';

function NewPlayerForm(props) {

    const [image, setImageOne] = useState('');

    const convert2base64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageOne(reader.result.toString());
        };
        reader.readAsDataURL(file)
    };


    const playerNameRef = useRef();
    const DOBRef = useRef();
    const descriptionRef = useRef();
    // const imageRef = useRef();


    function submitHandler(event) {
        event.preventDefault();

        const enteredPlayerName = playerNameRef.current.value;
        const enteredDOB = DOBRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        // const enteredImage = imageRef.current.value;


        const playerData = {
            fullName: enteredPlayerName,
            dateOfBirth: enteredDOB,
            description: enteredDescription,
            image: image
        };

        props.onAddPlayer(playerData);
    }

    return (
        <div>
            <form className={NewPlayer.form} onSubmit={submitHandler}>
                <div className={NewPlayer.control}>
                    <label htmlFor='playerName'>New Player's Name</label>
                    <input type='text' required id='playerName' value={'John Doe'} ref={playerNameRef} />
                </div>
                <div className={NewPlayer.control}>
                    <label htmlFor='DOB'>Date of Birth</label>
                    <input type='date' required id='DOB' ref={DOBRef} />
                </div>
                <div className={NewPlayer.control}>
                    <label htmlFor='description'>Player's Description</label>
                    <input type='text' required id='description' ref={descriptionRef} />
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
                    <button>Add New Player</button>
                </div>
            </form>
        </div>
    );
}

export default NewPlayerForm

//NOTES ARE MADE FOR THE FLOW OF THE CODE//

//The??useRef??Hook allows you to persist values between renders.
//It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.

//useref takes all the current value of the element
// on sumbit of the form call sumbithandler function, which takes all the 
//Current values of each element and sends it to new-player.js page through
//Through props onAddplayer
