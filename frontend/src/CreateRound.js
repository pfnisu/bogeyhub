import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const CreateRound = (props) => {
    const [courses, setCourses] = React.useState([]);
    const [course, setCourse] = React.useState({});
    const [holes, setHoles] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [idGroups, setIdGroups] = React.useState([]);
    const timeRef = React.createRef();

    // Add new competition with only mandatory data
    const addRound = async (ev) => {
        props.setErr(null);
        let data = {
            start_time: timeRef.current.value + ':00',
            course_id: course.id,
        };

        // POST round data first to get round_id
        let round = await request(path.admin + 'round/' + props.competition.id, 'POST', data);
        if (!round) {
            props.setErr('Round creation failed');
            return false;
        }
        // POST group data
        console.log(groups);
        let resp = await request(path.admin + 'group/' + round.id, 'POST', idGroups);
        if (resp) {
            ev.target.classList.add('ok');
            ev.target.innerHTML = '&#10003; Created';
        } else props.setErr('Group creation failed');
    }

    // Generate groups for the round
    const createGroups = async () => {
        props.setErr(null);
        // GET registrations for compId
        let resp = await request(path.comp + 'registrations/' + props.competition.id);

        if (resp) {
            // Slice players into groups of 4
            // TODO shuffle
            let ids = resp.map((reg) => reg.id);
            let names = resp.map((reg) => reg.user);
            let idgrps = [];
            let namegrps = [];
            console.log(names);
            for (let i = 0; i < ids.length; i += 4) {
                idgrps.push(ids.slice(i, i + 4));
                namegrps.push(names.slice(i, i + 4));
            }
            setGroups(namegrps);
            setIdGroups(idgrps);
        } else props.setErr('Failed to create groups');
    }

    // Get list of courses
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.admin + 'course/');
            resp ? setCourses(resp) : props.setErr('Loading courses failed');
        })();
    }, []);

    // Get holes when course is changed
    React.useEffect(() => {
        (async () => {
            if (!course.id) return false;
            props.setErr(null);
            let resp = await request(path.admin + 'hole/' + course.id);
            resp ? setHoles(resp) : props.setErr('Loading holes failed');
        })();
    }, [course]);

    return (
        <>
            <h1>Create round and groups: {props.competition.name}</h1>
            <button onClick={() => props.setUi('edit')}>&#171; Cancel</button>
            <form onSubmit={e => e.preventDefault()}>
                <label>
                    <input type="checkbox" defaultChecked={false} onChange={(ev) => setGolfStart(ev.target.value)} />
                    Golf start (leave unchecked for shotgun start)
                    &nbsp;Start time:
                </label>
                <input ref={timeRef} type='time' autoFocus />
                <label>Course:</label>
                <input type='text' list='courses' onChange={(ev) =>
                    setCourse(state => courses.find((c) => c.name === ev.target.value) || state)} />
                <datalist id='courses'>
                    {courses.map((c, idx) => <option value={c.name}>{c.name}</option>)}
                </datalist>
                {course.id && <p>&#9873; {course.name}, par {holes.map((h) => h.par).reduce((p, sum) => sum += p, 0)}</p>}
                <table>
                    <tbody>
                        <tr className='score'>
                            <td>Group #</td>
                            <td>Player 1</td><td>Player 2</td><td>Player 3</td><td>Player 4</td><td>Player 5</td>
                        </tr>
                        {groups.map((g, idx) =>
                            <tr className='score' key={idx}>
                                <td>{idx + 1}</td>
                                {g.map((user, idx) => <td key={idx}>{user}</td>)}
                            </tr>)}
                    </tbody>
                </table>
                <button onClick={() => createGroups()}>&#9776; Generate groups</button>
                <button onClick={(ev) => addRound(ev)}>&#10023; Create</button>
            </form>
        </>
    );
};
