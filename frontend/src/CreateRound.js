import React from 'react';
import ReactDOM from 'react-dom';
import {useNavigate} from 'react-router-dom';
import {request, path} from './util';

export const CreateRound = (props) => {
    const nav = useNavigate();
    const dateRef = React.createRef();
    const nameRef = React.createRef();

    // Format current date for default form value
    let currDate = new Date().toJSON().split('T')[0];

    // Add new competition with only mandatory data
    const addRound = async () => {
        let data = {
            start_date: dateRef.current.value,
            name: nameRef.current.value,
            phase_id: 1,
        };
        // POST data to backend
        let resp = await request(path.admin + 'round/' + props.competition.id, 'POST', data);

        // If POST succeeded, navigate to new compId and show edit view
        if (resp) {
            nav(path.admin + resp.id);
            props.setCompetition(data);
            props.setUi('edit');
        } else props.setErr('Failed to create competition');
    }

    const groups = async () => {
    }

    return (
        <>
            <h1>Create round and groups: {props.competition.name}</h1>
            <button onClick={() => props.setUi('edit')}>&#171; Cancel</button>
            <form onSubmit={e => e.preventDefault()}>
                <label>Course:</label>
                <input ref={nameRef} type='text' autoFocus />
                <label>Start time:</label>
                <input ref={dateRef} type='time' defaultValue={currDate} />
                <button onClick={() => groups()}>&#9776; Generate groups</button>
                <button onClick={() => addRound()}>&#10023; Create</button>
            </form>
        </>

    );
};
