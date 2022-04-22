import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import './index.css';

const App = () => {

    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Disc golf scoring</NavLink>
                <NavLink to='/admin'>Admin</NavLink>
            </nav>
            <main>
                <Routes>
                    <Route path='/' element={<CompList/>} />
                    <Route path='admin/*' element={<CreateComp/>} />
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
