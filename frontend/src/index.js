import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {Admin} from './Admin';
import {CompList} from './CompList';
import {Login} from './Login';
import {Competition} from './Competition';
import './index.css';

const compPath = '/competition/';
const adminPath = '/admin/';
export const request = async (resource, method = 'GET', data = null) => {
    try {
        let resp = await fetch(resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: data && JSON.stringify(data)
        });
        if (resp.ok && method === 'GET' || method === 'POST') return await resp.json();
    } catch(e) {
        console.log(method + ' request failed');
    }
}

const App = () => {
    // Active user account
    const [user, setUser] = React.useState('');
    // App-wide error message
    const [err, setErr] = React.useState(null);

    // Set title
    React.useEffect(() => document.title = 'Disc golf scoring', []);

    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Disc golf scoring</NavLink>
                {user === 'admin' && <NavLink to='/admin'>Admin</NavLink>}
                <NavLink to='/login'>{user ? 'Logged in as ' + user : 'Login'}</NavLink>
            </nav>
            <main>
                {err && <p className='error'>{err}</p>}
                <Routes>
                    <Route path='/' element={
                        <CompList path={compPath} user={user} setErr={setErr} />} />
                    <Route path='admin/'>
                        <Route index element={
                            <Admin path={adminPath} getPath={compPath} setErr={setErr} />} />
                        <Route path=':compId' element={
                            <Admin path={adminPath} getPath={compPath} setErr={setErr} />} />
                    </Route>
                    <Route path='login/*' element={
                        <Login user={user} setUser={setUser} setErr={setErr} />} />
                    <Route path='competition/'>
                        <Route path=':compId' element={
                            <Competition path={compPath} user={user} setErr={setErr} />} />
                    </Route>
                    <Route path='*' element={<h1>Invalid url</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
