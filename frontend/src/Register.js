import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {request, path, focus} from './util';

export const Register = (props) => {
    // UI mode: initial, register, unregister, info
    const [ui, setUi] = React.useState('initial');
    const divRef = React.createRef();

    // Make comp title into a link to comp view
    let title = <Link to={path.comp + props.comp.id}>{props.comp.name}</Link>;
    let division = '';
    if (props.user.sex === 'male') division = 'MPO';
    else if (props.user.sex === 'female') division = 'FPO';

    // Add user to registration list
    const addReg = async (ev) => {
        props.setErr(null);
        let data = {
            user_id: props.user.id,
            division: divRef.current.value,
        };
        // POST data to backend
        let resp = await request(path.user + 'register/' + props.comp.id, 'POST', data);

        // Show err if POST failed
        resp ? focus(ev, setUi('initial')) : props.setErr('Failed to register');
    }

    // Remove registration for current user
    const removeReg = async (ev) => {
        props.setErr(null);
        let data = {
            user_id: props.user.id,
        };
        // POST data to backend
        let resp = await request(path.user + 'unregister/' + props.comp.id, 'DELETE', data);

        // Show err if POST failed
        resp ? focus(ev, setUi('initial')) : props.setErr('Failed to unregister');
    }

    return (
        <li className={props.comp.phase}>
            {props.user.name === 'admin' &&
                <Link to={'/admin/' + props.comp.id}>
                    <button>&#9881; Admin</button>
                </Link>}
            {props.user.name !== '' && !props.reg &&
                <button onClick={(ev) => focus(ev, setUi('register'))}>&#119558; Register</button>}
            {props.user.name !== '' && props.reg &&
                <button onClick={(ev) => focus(ev, setUi('unregister'))}>&#10005; Unregister</button>}
            <button onClick={(ev) => focus(ev, setUi('info'))}>&#8505; Info</button>
            <h2>{title}</h2>
            <span>
                {new Date(props.comp.start_date).toJSON().split('T')[0]}
                {props.comp.end_date
                    ?  ' - ' + new Date(props.comp.end_date).toJSON().split('T')[0]
                    : ''}
            </span>
            {ui === 'register' && <>
                <p>Register to division:</p>
                <form onSubmit={e => e.preventDefault()}>
                    <select ref={divRef} defaultValue={props.user.sex}>
                        <option value='' disabled hidden>Division</option>
                        <option value='MPO'>MPO</option>
                        <option value='FPO'>FPO</option>
                    </select>
                    <button onClick={(ev) => addReg(ev)}>&#10003; OK</button>
                </form>
            </>}
            {ui === 'unregister' && <>
                <p>Remove registration:</p>
                <form onSubmit={e => e.preventDefault()}>
                <button onClick={(ev) => removeReg(ev)}>&#10005; Confirm removal</button>
                </form>
            </>}
            {ui === 'info' && <>
                <p>Venue: {props.comp.venue}</p>
                <p>Info: {props.comp.info}</p>
            </>}
        </li>
    );
};
