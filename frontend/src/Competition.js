import React from 'react';
import ReactDOM from 'react-dom';
import {Link, useParams} from 'react-router-dom';
import {ScoreTable} from './ScoreTable';
import {ScoreInput} from './ScoreInput';
import {Groups} from './Groups';
import {RegList} from './RegList';
import {request, path} from './index';

export const Competition = (props) => {
    // UI mode: results, info, registrations, groups, input
    const [ui, setUi] = React.useState('results');
    const [competition, setCompetition] = React.useState({});
    const params = useParams();

    // GET competition with compId from backend at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + params.compId);
            resp ?  setCompetition(resp) : props.setErr('Loading competition failed');
        })();
    }, []);

    // Handle ui mode change
    const focus = (ev, ui) => {
        // Remove .sel from previous focus and add it to clicked one
        document.querySelector('.sel').classList.remove('sel');
        ev.target.classList.add('sel');
        setUi(ui);
    };

    return (
        <>
            <h1>{competition.name}</h1>
            <button className='sel' onClick={(ev) => focus(ev, 'results')}>
                &#9733; Results
            </button>
            <button onClick={(ev) => focus(ev, 'info')}>&#8505; Info</button>
            <button onClick={(ev) => focus(ev, 'registrations')}>
                &#119558; Registrations
            </button>
            <button onClick={(ev) => focus(ev, 'groups')}>&#9776; Groups</button>
            {props.user.name !== '' &&
                <button className='right' onClick={(ev) => focus(ev, 'input')}>
                    &#9998; Input scores
                </button>
            }
            {ui === 'results' && <>
                <ScoreTable id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'info' && <>
                <p>{competition.info}</p>
            </>}
            {ui === 'registrations' && <>
                <RegList id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'groups' && <>
                <Groups id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'input' && <>
                <ScoreInput id={params.compId} setErr={props.setErr} />
            </>}
        </>
    );
};
