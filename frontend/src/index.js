import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {Admin} from './Admin';
import {CompList} from './CompList';
import {Login} from './Login';
import {Competition} from './Competition';
import './index.css';

const uri = 'http://localhost:8080';
const compPath = uri+'/competition/';
const adminPath = uri+'/admin/';
export const request = async (resource, data, method = 'POST') => {
    try {
        let resp = await fetch(resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        let json = await resp.json();
        return json;
    } catch(e) {
        console.log('DB update failed.');
    }
}

const App = () => {
    // Active user account
    const [user, setUser] = React.useState('');

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
                <Routes>
                    <Route path='/' element={
                        <CompList path={compPath} user={user} />} />
                    <Route path='admin/'>
                        <Route index element={
                            <Admin path={adminPath} getPath={compPath} />} />
                        <Route path=':compId' element={
                            <Admin path={adminPath} getPath={compPath} />} />
                    </Route>
                    <Route path='login/*' element={
                        <Login user={user} setUser={setUser} />} />
                    <Route path='competition/'>
                        <Route path=':compId' element={
                            <Competition path={compPath} user={user} />} />
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
