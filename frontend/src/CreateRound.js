import React from 'react';
import ReactDOM from 'react-dom';
import {request, path, check} from './util';

export const CreateRound = (props) => {
    const [courses, setCourses] = React.useState([]);
    const [course, setCourse] = React.useState({});
    const [round, setRound] = React.useState({});
    const [holes, setHoles] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [idGroups, setIdGroups] = React.useState([]);
    const timeRef = React.createRef();
    const courseRef = React.createRef();

    // Add new competition with only mandatory data
    const addRound = async (ev) => {
        props.setErr(null);
        if (!check(timeRef)) return false;
        if (!check(courseRef)) return false;
        let data = {
            start_time: timeRef.current.value + ':00',
            course_id: course.id,
        };

        // POST round data first to get round_id
        let resp = await request(path.admin + 'round/' + props.competition.id, 'POST', data);
        if (resp) {
            ev.target.classList.add('ok');
            ev.target.innerHTML = '&#10003; Created';
            ev.target.disabled = true;
            setRound(resp);
        } else props.setErr('Round creation failed');
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
            for (let i = 0; i < ids.length; i += 4) {
                idgrps.push(ids.slice(i, i + 4));
                namegrps.push(names.slice(i, i + 4));
            }
            setGroups(namegrps);
            setIdGroups(idgrps);

            console.log(idgrps);
        } else props.setErr('Failed to create groups');
    }

    // POST group data separately to allow editing
    const addGroups = async (ev) => {
        props.setErr(null);
        if (!round.id) {
            props.setErr('Round id not found. Create round first');
            return false;
        }
        let resp = await request(path.admin + 'group/' + round.id, 'POST', idGroups);
        if (resp) {
            ev.target.classList.add('ok');
            ev.target.innerHTML = '&#10003; Saved';
        } else props.setErr('Group creation failed');
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
            <button onClick={() => props.setUi('edit')}>&#171; Back</button>
            <form onSubmit={e => e.preventDefault()}>
                <label>Start time:</label>
                <input ref={timeRef} type='time' autoFocus />
                <label>Course:</label>
                <input ref={courseRef} type='text' list='courses' onChange={(ev) =>
                    setCourse(state => courses.find((c) => c.name === ev.target.value) || state)} />
                <datalist id='courses'>
                    {courses.map((c, idx) => <option value={c.name}>{c.name}</option>)}
                </datalist>
                {course.id && <p>&#9873; {course.name}, par {holes.map((h) => h.par).reduce((sum, p) => sum += p, 0)}</p>}
                <button onClick={(ev) => addRound(ev)}>&#10023; Create round</button>
            </form>
            <h2>Round id: {round.id || 'not created'}</h2>
            <form onSubmit={e => e.preventDefault()}>
                <label>
                    <input type="checkbox" defaultChecked={false} onChange={(ev) => setGolfStart(ev.target.value)} />
                    Golf start (leave unchecked for shotgun start)
                </label>
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
                <button onClick={(ev) => addGroups(ev)}>Save groups</button>
            </form>
        </>
    );
};
