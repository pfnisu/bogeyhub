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
            let resp = await fetch(props.path + params.compId);
            let json = await resp.json();
            setCompetition(json);
        })();
    }, []);
    return (
        <>
            <h1>{competition.name}</h1>
            {ui === 'results' && <>
                <button className='sel' onClick={() => setUi('results')}>Results</button>
                <button onClick={() => setUi('info')}>View info</button>
                <button onClick={() => setUi('groups')}>View groups</button>
                {props.user !== '' &&
                    <button className='right' onClick={() => setUi('input')}>
                        Input scores
                    </button>
                }
                <ScoreTable path={props.path} id={params.compId} />
            </>}
            {ui === 'info' && <>
                <button onClick={() => setUi('results')}>Results</button>
                <button className='sel' onClick={() => setUi('info')}>View info</button>
                <button onClick={() => setUi('groups')}>View groups</button>
                {props.user !== '' &&
                    <button className='right' onClick={() => setUi('input')}>
                        Input scores
                    </button>
                }
                <p>{competition.info}</p>
            </>}
            {ui === 'input' && <>
                <button onClick={() => setUi('results')}>Results</button>
                <button onClick={() => setUi('info')}>View info</button>
                <button onClick={() => setUi('groups')}>View groups</button>
                {props.user !== '' &&
                    <button className='sel right' onClick={() => setUi('input')}>
                        Input scores
                    </button>
                }
                <ScoreInput path={props.path} id={params.compId} />
            </>}
            {ui === 'groups' && <>
                <button onClick={() => setUi('results')}>Results</button>
                <button onClick={() => setUi('info')}>View info</button>
                <button className='sel' onClick={() => setUi('groups')}>View groups</button>
                {props.user !== '' &&
                    <button className='right' onClick={() => setUi('input')}>
                        Input scores
                    </button>
                }
                <Groups path={props.path} id={params.compId} />
            </>}
        </>
    );
};
