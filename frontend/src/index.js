import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {Admin} from './Admin';
import {CompList} from './CompList';
import {Login} from './Login';
import {Competition} from './Competition';
import './index.css';

const uri = 'http://localhost:8080/';
export const request = async (resource, data, method = 'POST') => {
    try {
        let resp = await fetch(uri + resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        return resp;
    } catch(e) {
        console.log('DB update failed.');
    }
}

const App = () => {
    // Active user account
    const [user, setUser] = React.useState('');

    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Disc golf scoring</NavLink>
                {user === 'admin' ? <NavLink to='/admin'>Admin</NavLink> : ''}
                <NavLink to='/login'>{user ? 'Logged in as ' + user : 'Login'}</NavLink>
            </nav>
            <main>
                <Routes>
                    <Route path='/' element={
                        <CompList path={uri + 'competition/'} user={user} />} />
                    <Route path='admin/'>
                        <Route index element={
                            <Admin path={uri + 'admin/'} getPath={uri + 'competition/'} />} />
                        <Route path=':compId' element={
                            <Admin path={uri + 'admin/'} getPath={uri + 'competition/'} />} />
                    </Route>
                    <Route path='login/*' element={
                        <Login user={user} setUser={setUser} />} />
                    <Route path='competition/'>
                        <Route path=':compId' element={
                            <Competition path={uri + 'competition/'} user={user} />} />
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
