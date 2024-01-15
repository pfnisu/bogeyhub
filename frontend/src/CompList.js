import React from 'react';
import ReactDOM from 'react-dom';
import {Register} from './Register';
import {request, str, path, focus} from './util';

// List competitions, split to categories depending on current user
export const CompList = (props) => {
    // UI mode: open, history, my
    const [ui, setUi] = React.useState('open');
    const [competitions, setCompetitions] = React.useState([]);
    const [myComps, setMyComps] = React.useState([]);
    const [openComps, setOpenComps] = React.useState([]);

    const myRef = React.createRef();

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp);
            resp ? setCompetitions([...resp]) : props.setErr('Loading competitions failed');
        })();
        // Focus my comps if user has comps
        (async () => {
            props.regs.length && focus({target: myRef.current}, setUi('my'));
        })();
    }, []);

    // Separate comps where active user is registered
    React.useEffect(() => {
        document.title = str.site;
        (async () => {
            props.setErr(null);
            if (props.user.name !== '') {
                let my = [];
                let open = [];
                competitions.forEach((comp) => {
                    props.regs.find((el) => el.id === comp.id)
                        ? my.push(comp)
                        : open.push(comp);
                });
                setMyComps([...my]);
                setOpenComps([...open]);
            } else setOpenComps(competitions);
        })();
    }, [competitions, ui]);

    return (
        <>
            <h1>Competitions</h1>
            <button className='sel' onClick={(ev) => focus(ev, setUi('open'))}>
                &#119558; Current
            </button>
            <button onClick={(ev) => focus(ev, setUi('history'))}>&#10226; History</button>
            {props.user.name !== '' &&
                <button ref={myRef} className='right' onClick={(ev) => focus(ev, setUi('my'))}>
                    &#9829; My competitions
                </button>}
            {ui === 'open' && <>
                <ul>
                    {openComps.length === 0
                        ? <li>No available competitions</li>
                        : openComps.map(c =>
                            <Register user={props.user} setRegs={props.setRegs}
                                comp={c} key={c.id} setErr={props.setErr} />)}
                </ul>
            </>}
            {ui === 'history' && <>
            </>}
            {ui === 'my' && <>
                <ul>
                    {myComps.length === 0
                        ? <li>No competitions</li>
                        : myComps.map(c =>
                            <Register reg={true} user={props.user} setRegs={props.setRegs}
                                comp={c} key={c.id} setErr={props.setErr} />)}
                </ul>
            </>}
        </>
    );
};
