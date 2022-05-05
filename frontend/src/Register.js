import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {request, path} from './index';

export const Register = (props) => {
    // UI mode: initial, register, info
    const [ui, setUi] = React.useState('initial');
    const divRef = React.createRef();

    // Make comp title into a link to comp view
    let title = <Link to={path.comp + props.comp.id}>{props.comp.name}</Link>;
    let division = '';
    if (props.user.sex === 'male') division = 'MPO';
    else if (props.user.sex === 'female') division = 'FPO';

    // Handle ui mode change
    const focus = (ev, ui) => {
        // Remove .sel from previous focus and add it to clicked one
        ev.target.parentNode.querySelector('.sel')?.classList.remove('sel');
        ev.target.classList.add('sel');
        setUi(ui);
    };

    // Add user to registration list
    const addReg = async (ev) => {
        props.setErr(null);
        let data = {
            user_id: props.user.id,
            competition_id: props.comp.id,
            division: divRef.current.value,
        };
        // POST data to backend
        let resp = await request(path.user + 'register/' + props.comp.id, 'POST', data);

        // Show err if POST failed
        resp ? focus(ev, 'initial') : props.setErr('Failed to register');
    }

    return (
        <li className={props.comp.phase}>
            {props.user.name === 'admin' &&
                <Link to={'/admin/' + props.comp.id}>
                    <button>&#9881; Admin</button>
                </Link>}
            {props.user.name !== '' &&
                <button onClick={(ev) => focus(ev, 'register')}>&#119558; Register</button>}
            <button onClick={(ev) => focus(ev, 'info')}>&#8505; Info</button>
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
            {ui === 'info' && <>
                <p>Venue: {props.comp.venue}</p>
                <p>Info: {props.comp.info}</p>
            </>}
        </li>
    );
};
