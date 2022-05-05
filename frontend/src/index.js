import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {Admin} from './Admin';
import {CompList} from './CompList';
import {Login} from './Login';
import {Competition} from './Competition';
import './index.css';

export const path = {
    admin:'/admin/',
    comp:'/competition/',
    reg:'/register/',
    user:'/user/',
};
export const request = async (resource, method = 'GET', data = null) => {
    try {
        let resp = await fetch('/backend' + resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: data && JSON.stringify(data)
        });
        // Parse as json if expected, else return bool
        if (resp.ok && resp.status != 204 &&
            (method === 'GET' || method === 'POST')) return await resp.json();
        return resp.ok;
    } catch(e) {
        console.log(method + ' request failed');
    }
};

const App = () => {
    // Active user account
    const [user, setUser] = React.useState({name: '', id: null});
    // App-wide error message
    const [err, setErr] = React.useState(null);

    // Set title
    React.useEffect(() => { document.title = 'Disc golf scoring' }, []);

    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Disc golf scoring</NavLink>
                {user.name === 'admin' && <NavLink to='/admin'>Admin</NavLink>}
                <NavLink to='/login'>{user.name ? 'User: ' + user.name : 'Login'}</NavLink>
            </nav>
            <main>
                {err && <p className='error'>{err}</p>}
                <Routes>
                    <Route path='/' element={
                        <CompList user={user} setErr={setErr} />} />
                    <Route path='admin/'>
                        <Route index element={
                            <Admin setErr={setErr} />} />
                        <Route path=':compId' element={
                            <Admin setErr={setErr} />} />
                    </Route>
                    <Route path='login/*' element={
                        <Login user={user} setUser={setUser} setErr={setErr} />} />
                    <Route path='competition/'>
                        <Route path=':compId' element={
                            <Competition user={user} setErr={setErr} />} />
                    </Route>
                    <Route path='*' element={<h1>Invalid url</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
