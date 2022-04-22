import React from 'react';
import ReactDOM from 'react-dom';
import {request} from './index';

const path = 'competition';

export const CreateComp = () => {
    const dateRef = React.createRef();
    const nameRef = React.createRef();

    // Format current date for default form value
    let currDate = new Date().toJSON().split('T')[0];

    // Add new competition with only mandatory data
    const addComp = async () => {
        let newcomp = {
            date: dateRef.current.value,
            name: nameRef.current.value,
            phase_id: 1,
        };
        // POST data to backend
        await request(path, newcomp);
        dateRef.current.value = currDate;
        nameRef.current.value = "";
    }

    return (
        <>
            <h1>Create a competition</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input ref={nameRef} type="text" placeholder="Competition name" />
                <input ref={dateRef} type="date" defaultValue={currDate} />
                <button onClick={() => addComp()}>Create</button>
            </form>
        </>

    );
};
