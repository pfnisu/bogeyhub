import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {request, path, focus} from './util';

export const Register = (props) => {
    // UI mode: initial, register, unregister, info
    const [ui, setUi] = React.useState('initial');
    const divRef = React.createRef();
    const regRef = React.createRef();

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

        // Add id to regs, or show err
        if (resp) {
            setUi('initial');
            regRef.current.innerHTML = '&#10003; Registered';
            props.setRegs(state => [...state, {id: props.comp.id}]);
        } else props.setErr('Failed to register');
    }

    // Remove registration for current user
    const removeReg = async (ev) => {
        props.setErr(null);
        let data = {
            user_id: props.user.id,
        };
        // POST data to backend
        let resp = await request(path.user + 'unregister/' + props.comp.id, 'DELETE', data);

        // Filter id from regs, or show err
        if (resp) {
            setUi('initial');
            regRef.current.innerHTML = '&#10003; Unregistered';
            props.setRegs(state => state.filter(comp => comp.id !== props.comp.id));
        } else props.setErr('Failed to unregister');
    }

    return (
        <li className={props.comp.phase}>
            {props.user.role === 'admin' &&
                <Link to={'/admin/' + props.comp.id}>
                    <button>&#9881; Edit</button>
                </Link>}
            {props.user.name !== '' && !props.reg &&
                <button ref={regRef} onClick={(ev) => focus(ev, setUi('register'))}>
                    &#119558; Register
                </button>}
            {props.user.name !== '' && props.reg &&
                <button ref={regRef} onClick={(ev) => focus(ev, setUi('unregister'))}>
                    &#10005; Unregister
                </button>}
            <button onClick={(ev) => focus(ev, setUi('info'))}>&#8505; Info</button>
            <h2>{title}</h2>
            <span>{props.comp.start_date.split('T')[0]}</span>
            {ui === 'register' && <>
                <p>Register to division:</p>
                <select ref={divRef} defaultValue={props.user.sex}>
                    <option value='' disabled hidden>Division</option>
                    <option value='MPO'>MPO</option>
                    <option value='FPO'>FPO</option>
                </select>
                <button onClick={(ev) => addReg(ev)}>Add registration</button>
            </>}
            {ui === 'unregister' && <>
                <p>Remove registration:</p>
                <button onClick={(ev) => removeReg(ev)}>&#10005; Confirm removal</button>
                <p>Are you sure?</p>
            </>}
            {ui === 'info' && <>
                <p>Venue: {props.comp.venue}</p>
                <p>Info: {props.comp.info}</p>
            </>}
        </li>
    );
};
