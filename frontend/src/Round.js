import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {request, path, focus} from './util';

// Round info box
export const Round = (props) => {
    // UI mode: initial, delete
    const [ui, setUi] = React.useState('initial');
    const delRef = React.createRef();

    // DELETE round
    const delRound = async () => {
        props.setErr(null);
        let resp = await request(path.admin + 'round/' + props.round.id, 'DELETE');
        if (resp) {
            setUi('initial');
            delRef.current.innerHTML = '&#10003; Deleted';
        } else props.setErr('Failed to delete round');
    }

    return (
        <li key={props.round.id}>
            <button ref={delRef} onClick={(ev) => focus(ev, setUi('delete'))}>
                &#10005; Delete round
            </button>
            <h2>
                <Link to={path.admin + 'round/' + props.round.id}>
                    {props.round.round} (id: {props.round.id})
                </Link>
            </h2>
            <span>{props.round.start_time}</span>
            {ui === 'initial' && <>
                <p>
                    &#9873; {props.round.course},
                    par {props.round.holes.reduce((sum, h) => sum += h.par, 0)}
                </p>
            </>}
            {ui === 'delete' && <>
                <p>Delete round:</p>
                <span className='tag'>Are you sure?</span>
                <button onClick={() => delRound()}>&#10005; Confirm deletion</button>
            </>}
        </li>
    );
};
