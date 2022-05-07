import React from 'react';
import ReactDOM from 'react-dom';
import {useNavigate} from 'react-router-dom';
import {request, path, check} from './util';

export const CreateComp = (props) => {
    const nav = useNavigate();
    const dateRef = React.createRef();
    const nameRef = React.createRef();

    // Format current date for default form value
    let currDate = new Date().toJSON().split('T')[0];

    // Add new competition with only mandatory data
    const addComp = async () => {
        if (!check(nameRef)) return false;
        let data = {
            start_date: dateRef.current.value,
            name: nameRef.current.value,
            phase_id: 1,
        };
        // POST data to backend
        let resp = await request(path.admin, 'POST', data);

        // If POST succeeded, navigate to new compId and show edit view
        if (resp) {
            nav(path.admin + resp.id);
            props.setCompetition(data);
            props.setUi('edit');
        } else props.setErr('Failed to create competition');
    }

    return (
        <>
            <h1>Create a competition</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input ref={nameRef} type='text' placeholder='Competition name' autoFocus />
                <input ref={dateRef} type='date' defaultValue={currDate} />
                <button onClick={() => addComp()}>&#10023; Create</button>
            </form>
        </>

    );
};
