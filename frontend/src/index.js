import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {Admin} from './Admin';
import {CompList} from './CompList';
import {Login} from './Login';
import {Competition} from './Competition';
import {request, str, path} from './util';
import './index.css';

// Main component: routing, nav, error msgs
const App = () => {
    // Active user account
    const [user, setUser] = React.useState({name: '', role: ''});
    // Competition id's where user is registered
    const [regs, setRegs] = React.useState([]);
    // Current comp and hole of active score input, stored here for persistence
    const [competition, setCompetition] = React.useState({});
    const [hole, setHole] = React.useState({});
    // App-wide error message
    const [err, setErr] = React.useState(null);

    // Load regs when user changes
    React.useEffect(() => {
        (async () => {
            setErr(null);
            if (user.name !== '') {
                let resp = await request(path.user + user.id);
                resp ? setRegs(resp) : setErr('Loading registrations failed');
            }
        })();
    }, [user]);

    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Competitions</NavLink>
                {hole.name && <NavLink to={'/competition/' + competition.id}>
                    {competition.name}
                </NavLink>}
                {user.role === 'admin' && <NavLink to='/admin'>Administration</NavLink>}
                <NavLink to='/login'>{user.name ? 'User: ' + user.name : 'Login'}</NavLink>
            </nav>
            <main>
                {err && <p className='error'>&#9888; {err}</p>}
                <Routes>
                    <Route path='/' element={
                        <CompList user={user} regs={regs} setRegs={setRegs} setErr={setErr} />} />
                    {user.role === 'admin' && <Route path='admin/'>
                        <Route index element={
                            <Admin setErr={setErr} />} />
                        <Route path=':compId' element={
                            <Admin setErr={setErr} />} />
                    </Route>}
                    <Route path='login/*' element={
                        <Login user={user} setUser={setUser} setErr={setErr} />} />
                    <Route path='competition/'>
                        <Route path=':compId' element={
                            <Competition user={user}
                                competition={competition} setCompetition={setCompetition}
                                hole={hole} setHole={setHole} setErr={setErr} />} />
                    </Route>
                    <Route path='*' element={<h1>Invalid url</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
