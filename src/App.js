import React, { Fragment } from 'react';
import Navbar from './component/layout/Navbar';
import './App.css';

const App = () => {
    return (
        <Fragment>
            <Navbar />
            <i className="far fa-address-book"></i>
            <h1>Hello world</h1>
        </Fragment>
    );
};

export default App;
