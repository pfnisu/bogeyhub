import React from 'react';
import ReactDOM from 'react-dom';
import {Link, useParams} from 'react-router-dom';
import {ScoreTable} from './ScoreTable';
import {ScoreInput} from './ScoreInput';
import {Groups} from './Groups';
import {request} from './index';

export const Competition = (props) => {
    // UI mode: results, info, input, groups
    const [ui, setUi] = React.useState('results');
    const [competition, setCompetition] = React.useState({});
    const params = useParams();

    // GET competition with compId from backend at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(props.path + params.compId);
            resp ?  setCompetition(resp) : props.setErr('Loading competition failed');
        })();
    }, []);
    return (
        <>
            <h1>{competition.name}</h1>
            {ui === 'results' && <>
                <button className='sel' onClick={() => setUi('results')}>
                    &#9733; Results
                </button>
                <button onClick={() => setUi('info')}>&#8505; View info</button>
                <button onClick={() => setUi('groups')}>&#119558; View groups</button>
                {props.user !== '' &&
                    <button className='right' onClick={() => setUi('input')}>
                        &#9998; Input scores
                    </button>
                }
                <ScoreTable path={props.path} id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'info' && <>
                <button onClick={() => setUi('results')}>&#9733; Results</button>
                <button className='sel' onClick={() => setUi('info')}>
                    &#8505; View info
                </button>
                <button onClick={() => setUi('groups')}>&#119558; View groups</button>
                {props.user !== '' &&
                    <button className='right' onClick={() => setUi('input')}>
                        &#9998; Input scores
                    </button>
                }
                <p>{competition.info}</p>
            </>}
            {ui === 'input' && <>
                <button onClick={() => setUi('results')}>&#9733; Results</button>
                <button onClick={() => setUi('info')}>&#8505; View info</button>
                <button onClick={() => setUi('groups')}>&#119558; View groups</button>
                {props.user !== '' &&
                    <button className='sel right' onClick={() => setUi('input')}>
                        &#9998; Input scores
                    </button>
                }
                <ScoreInput path={props.path} id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'groups' && <>
                <button onClick={() => setUi('results')}>&#9733; Results</button>
                <button onClick={() => setUi('info')}>&#8505; View info</button>
                <button className='sel' onClick={() => setUi('groups')}>
                    &#119558; View groups
                </button>
                {props.user !== '' &&
                    <button className='right' onClick={() => setUi('input')}>
                        &#9998; Input scores
                    </button>
                }
                <Groups path={props.path} id={params.compId} setErr={props.setErr} />
            </>}
        </>
    );
};
