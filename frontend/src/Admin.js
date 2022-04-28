import React from 'react';
import ReactDOM from 'react-dom';
import {CreateComp} from './CreateComp';
import {useParams} from 'react-router-dom';
import {request} from './index';

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

    // GET competition with compId from backend at component mount
    React.useEffect(() => {
        (async () => {
            if (params.compId == undefined) return false;
            let resp = await fetch(props.getPath + params.compId);
            let json = await resp.json();
            setCompetition(json);
            setUi('edit');
        })();
    }, []);

    // PATCH competition with edited data
    const editComp = async () => {
        let comp = {
            start_date: dateRef.current.value,
            name: nameRef.current.value,
            info: infoRef.current.value,
            phase_id: 1,
        };
        // PATCH data to backend
        await request(props.path, comp, 'PATCH');
    }

    return (
        <>
            {ui === 'create' && <CreateComp />}
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
                    <textarea ref={infoRef} />
                    <button onClick={() => addComp()}>Save changes</button>
                </form>
            </>}
        </>

    );
};
