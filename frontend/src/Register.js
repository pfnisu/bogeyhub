import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

export const Register = (props) => {
    // UI mode: initial, register or info
    const [ui, setUi] = React.useState('initial');

    // Make comp title into a link to comp view
    let title = <Link to={'/competition/' + props.comp.id}>{props.comp.name}</Link>;
    return (
        <li className={props.comp.phase}>
            {ui === 'initial' && <>
                <button onClick={() => setUi('register')}>Register</button>
                <button onClick={() => setUi('info')}>View info</button>
                <h2>{title}</h2>
            </>}
            {ui === 'register' && <>
                <button onClick={() => setUi('initial')}>Cancel</button>
                <button onClick={() => setUi('info')}>View info</button>
                <h2>{title}</h2>
            </>}
            {ui === 'info' && <>
                <button onClick={() => setUi('register')}>Register</button>
                <button onClick={() => setUi('initial')}>Hide info</button>
                <h2>{title}</h2>
                <span>{props.comp.info}</span>
            </>}
            <span>
                {new Date(props.comp.start_date).toJSON().split('T')[0]}
                {props.comp.end_date
                    ?  ' - ' + new Date(props.comp.end_date).toJSON().split('T')[0]
                    : ''}
                , {props.comp.venue}
                , {props.comp.phase}
            </span>
        </li>
    );
};
