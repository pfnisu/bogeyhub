import React from 'react';
import ReactDOM from 'react-dom';
import {Register} from './Register';
import {request, path} from './index';

export const CompList = (props) => {
    const [competitions, setCompetitions] = React.useState([]);
    const [myComps, setMyComps] = React.useState([]);

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp);
            resp ? setCompetitions([...resp]) : props.setErr('Loading competitions failed');

            // GET comps where active user is registered
            if (props.user.name !== '') {
                let resp = await request(path.user + props.user.id);
                if (resp) {
                    setMyComps([...resp]);

                    // Filter out competitions where user is registered
                    setCompetitions(competitions.filter((el) =>
                        myComps.findIndex((my) => my.id === el.id) === -1
                    ));
                } else props.setErr('Loading my competitions failed');
            }
        })();
    }, []);

    return (
        <>
            <h1>Competitions</h1>
            {props.user.name !== '' && <>
                <h2>My registrations</h2>
                <ul>
                    {myComps.length === 0
                        ? <li>No registrations</li>
                        : myComps.map(c =>
                            <Register user={{name:'',id:null}} comp={c} key={c.id} setErr={props.setErr} />)}
                </ul>
            </>}
            <h2>Open registrations</h2>
            <ul>
                {competitions.length === 0
                    ? <li>No available competitions</li>
                    : competitions.map(c =>
                        <Register user={props.user} comp={c} key={c.id} setErr={props.setErr} />)}
            </ul>
        </>
    );
};
