import React from 'react';
import ReactDOM from 'react-dom';
import {CreateComp} from './CreateComp';
import {CreateRound} from './CreateRound';
import {useParams} from 'react-router-dom';
import {request, path} from './util';

// Creating competitions is limited to admin
export const Admin = (props) => {
    // UI mode: create, edit, delete
    const [ui, setUi] = React.useState('create');
    const [competition, setCompetition] = React.useState({});
    const params = useParams();

    const dateRef = React.createRef();
    const enddateRef = React.createRef();
    const nameRef = React.createRef();
    const infoRef = React.createRef();

    const getComp = async () => {
        props.setErr(null);
        if (params.compId == undefined) return false;
        let resp = await request(path.comp + params.compId);

        // Format start_date for default form value
        resp.start_date = resp.start_date.split('T')[0];
        resp ? setCompetition(resp) : props.setErr('Loading competition failed');
        setUi('edit');
    }

    // GET competition with compId at component mount
    React.useEffect(() => { getComp() }, []);

    // PATCH competition with edited data
    const editComp = async () => {
        let data = {
            start_date: dateRef.current.value,
            name: nameRef.current.value,
            info: infoRef.current.value,
            phase_id: 1,
        };

        await request(path.admin + params.compId, 'PATCH', data);
    }

    // DELETE competition
    const delComp = async () => {
        props.setErr(null);
        if (params.compId == undefined) return false;
        let resp = await request(path.admin + params.compId, 'DELETE');

        resp ? setUi('create') : props.setErr('Deletion failed');
    }

    // TODO show save success/fail in ui (spinner/ checkmark in button)
    return (
        <>
            {ui === 'create' &&
                <CreateComp setCompetition={setCompetition} setUi={setUi} setErr={props.setErr} />}
            {ui === 'edit' && <>
                <h1>Edit competition: {competition.name}</h1>
                <button onClick={() => setUi('round')}>&#10023; Create rounds</button>
                <button className='right' onClick={() => setUi('delete')}>&#10005; Delete competition</button>
                <form onSubmit={e => e.preventDefault()}>
                    <label>Name:</label>
                    <input ref={nameRef} type='text' defaultValue={competition.name} />
                    <label>Start date:</label>
                    <input ref={dateRef} type='date' defaultValue={competition.start_date} />
                    <label>End date:</label>
                    <input ref={enddateRef} type='date' />
                    <label>Info:</label>
                    <textarea ref={infoRef} defaultValue={competition.info} />
                    <button onClick={() => editComp()}>&#10003; Save changes</button>
                </form>
            </>}
            {ui === 'round' &&
                <CreateRound competition={competition} setUi={setUi} setErr={props.setErr} />}
            {ui === 'delete' && <>
                <h1>Delete competition: {competition.name}</h1>
                <button onClick={() => delComp()}>&#10005; Confirm deletion</button>
                <button className='right' onClick={() => setUi('edit')}>&#171; Cancel</button>
            </>}
        </>

    );
};
