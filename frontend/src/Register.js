import React from 'react';
import ReactDOM from 'react-dom';

export const Register = (props) => {
    const [ui, setUi] = React.useState('initial');

    return (
        <li className={props.comp.phase}>
            {ui === 'initial' && <>
                <button onClick={() => setUi('register')}>Register</button>
                <button onClick={() => setUi('info')}>View info</button>
                <h2>{props.comp.name}</h2>
            </>}
            {ui === 'register' && <>
                <button onClick={() => setUi('initial')}>Cancel</button>
                <button onClick={() => setUi('info')}>View info</button>
                <h2>{props.comp.name}</h2>
            </>}
            {ui === 'info' && <>
                <button onClick={() => setUi('register')}>Register</button>
                <button onClick={() => setUi('initial')}>Hide info</button>
                <h2>{props.comp.name}</h2>
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
