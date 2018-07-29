import React, { Component } from 'react';
import logo from '../../logo.svg';
import './header.css';

const Header = () => (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">NYC Bike Sharing Dashboard</h1>
    </header>
);


export default Header;