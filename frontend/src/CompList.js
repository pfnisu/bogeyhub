import React from 'react';
import ReactDOM from 'react-dom';
import {Register} from './Register';
import {request, path} from './index';

export const CompList = (props) => {
    const [competitions, setCompetitions] = React.useState([]);
    const [myComps, setMyComps] = React.useState([]);
    const [allComps, setAllComps] = React.useState([]);

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp);
            resp ? setCompetitions([...resp]) : props.setErr('Loading competitions failed');
        })();
    }, []);

    // GET comp id's where active user is registered and split list
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            if (props.user.name !== '') {
                let resp = await request(path.user + props.user.id);
                if (resp) {
                    let my = [];
                    let all = [];
                    competitions.forEach((comp) => {
                        resp.find((el) => el.id === comp.id) ? my.push(comp) : all.push(comp);
                    });
                    setMyComps([...my]);
                    setAllComps([...all]);
                } else props.setErr('Loading my competitions failed');
            } else setAllComps(competitions);
        })();
    }, [competitions]);

    return (
        <>
            <h1>Competitions</h1>
            {props.user.name !== '' && <>
                <h2>My registrations</h2>
                <ul>
                    {myComps.length === 0
                        ? <li>No registrations</li>
                        : myComps.map(c =>
                            <Register reg={true} user={props.user} comp={c} key={c.id} setErr={props.setErr} />)}
                </ul>
            </>}
            <h2>Open registrations</h2>
            <ul>
                {allComps.length === 0
                    ? <li>No available competitions</li>
                    : allComps.map(c =>
                        <Register user={props.user} comp={c} key={c.id} setErr={props.setErr} />)}
            </ul>
        </>
    );
};
