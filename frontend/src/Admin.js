import React from 'react';
import ReactDOM from 'react-dom';
import {CreateComp} from './CreateComp';
import {useParams} from 'react-router-dom';
import {request, path} from './index';

// Creating competitions is limited to admin
export const Admin = (props) => {
    // UI mode: create, edit
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
        resp ? setCompetition(resp) : setErr('Loading competition failed');
        setUi('edit');
    }

    // GET competition with compId at component mount and when ui mode changes
    React.useEffect(() => getComp(), []);
    React.useEffect(() => getComp(), [ui]);

    // PATCH competition with edited data
    const editComp = async () => {
        let data = {
            start_date: dateRef.current.value,
            name: nameRef.current.value,
            info: infoRef.current.value,
            phase_id: 1,
        };
        // PATCH data to backend
        await request(path.comp + params.compId, 'PATCH', data);
    }

    // TODO show save success/fail in ui (spinner/ checkmark in button)
    return (
        <>
            {ui === 'create' &&
                <CreateComp path={props.path} setUi={setUi} setErr={props.setErr} />}
            {ui === 'edit' && <>
                <h1>Edit competition: {competition.name}</h1>
                <form onSubmit={e => e.preventDefault()}>
                    <label>Name:</label>
                    <input ref={nameRef} type='text' defaultValue={competition.name} />
                    <label>Start date:</label>
                    <input ref={dateRef} type='date' defaultValue={competition.start_date} />
                    <label>End date:</label>
                    <input ref={enddateRef} type='date' />
                    <label>Info:</label>
                    <textarea ref={infoRef} defaultValue={competition.info} />
                    <button onClick={() => editComp()}>Save changes</button>
                </form>
            </>}
        </>

    );
};
