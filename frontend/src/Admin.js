import React from 'react';
import ReactDOM from 'react-dom';
import {CreateComp} from './CreateComp';
import {CreateRound} from './CreateRound';
import {useParams} from 'react-router-dom';
import {request, path, check} from './util';

// Creating competitions is limited to admin
export const Admin = (props) => {
    // UI mode: create, edit, delete
    const [ui, setUi] = React.useState('create');
    const [competition, setCompetition] = React.useState({});
    const [rounds, setRounds] = React.useState([]);
    const params = useParams();

    const dateRef = React.createRef();
    const nameRef = React.createRef();
    const venueRef = React.createRef();
    const infoRef = React.createRef();
    const phaseRef = React.createRef();

    // GET competition with compId at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            if (params.compId == undefined) return false;
            let resp = await request(path.comp + params.compId);

            // Format start_date for default form value
            resp.start_date = resp.start_date.split('T')[0];
            resp ? setCompetition(resp) : props.setErr('Loading competition failed');
            setUi('edit');
        })();
    }, []);

    // GET rounds belonging to the comp
    React.useEffect(() => {
        competition.id && (async () => {
            props.setErr(null);
            let resp = await request(path.comp + 'rounds/' + competition.id);
            resp ? setRounds(resp) : props.setErr('Loading rounds failed');
        })();
    }, [competition, ui]);

    // PATCH competition with edited data
    const editComp = async (ev) => {
        props.setErr(null);
        ev.target.classList.remove('ok');
        if (!check(nameRef)) return false;
        let data = {
            start_date: dateRef.current.value,
            name: nameRef.current.value,
            venue: venueRef.current.value,
            info: infoRef.current.value,
            phase_id: phaseRef.current.value,
        };

        let resp = await request(path.admin + params.compId, 'PATCH', data);
        if (resp) {
            ev.target.classList.add('ok');
            ev.target.innerHTML = '&#10003; Saved';
            setCompetition(state => {return {...state, ...data}});
        } else props.setErr('Saving failed');
    }

    // DELETE competition
    const delComp = async () => {
        props.setErr(null);
        if (params.compId == undefined) return false;
        let resp = await request(path.admin + params.compId, 'DELETE');
        resp ? setUi('create') : props.setErr('Deletion failed');
    }

    // DELETE round
    const delRound = async (ev) => {
        props.setErr(null);
        ev.target.classList.remove('ok');
        if (ev.target.id == undefined) return false;
        let resp = await request(path.admin + 'round/' + ev.target.id, 'DELETE');
        if (resp) {
            ev.target.classList.add('ok');
            ev.target.innerHTML = '&#10003; Deleted';
        } else props.setErr('Deletion failed');
    }

    return (
        <>
            {ui === 'create' &&
                <CreateComp setCompetition={setCompetition} setUi={setUi} setErr={props.setErr} />}
            {ui === 'edit' && <>
                <h1>Edit competition: {competition.name}</h1>
                <button onClick={() => setUi('create')}>&#171; Administration</button>
                <button className='right' onClick={() => setUi('delete')}>&#10005; Delete competition</button>
                <form onSubmit={e => e.preventDefault()}>
                    <label>Name:</label>
                    <input ref={nameRef} type='text' defaultValue={competition.name} />
                    <label>Start date:</label>
                    <input ref={dateRef} type='date' defaultValue={competition.start_date} />
                    <label>Venue:</label>
                    <input ref={venueRef} type='text' defaultValue={competition.venue} />
                    <label>Info:</label>
                    <textarea ref={infoRef} defaultValue={competition.info} />
                    <select ref={phaseRef} defaultValue={competition.phase_id}>
                        <option value='2'>Registration phase</option>
                        <option value='4'>Active phase</option>
                    </select>
                    <button onClick={(ev) => editComp(ev)}>Save changes</button>
                </form>
                <h2>Rounds</h2>
                <ul>
                {rounds.length === 0
                    ? <li>No rounds created</li>
                    : rounds.map((round, idx) =>
                        <li key={idx}>
                            <button id={round.id} onClick={(ev) => delRound(ev)}>
                                &#10005; Delete round
                            </button>
                            <p>Round id: {round.id}</p>
                            <p>Course: {round.course}</p>
                        </li>
                    )
                }
                </ul>
                <button onClick={() => setUi('round')}>&#10023; Create round</button>
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
