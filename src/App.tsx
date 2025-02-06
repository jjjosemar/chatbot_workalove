import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatBot from "./components/ChatBot";

function App() {
    return (
        <div className={"App"}>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Olá! Este é o meu teste prático desenvolvido para avaliação.
                </p>
                <p>
                    Sinta-se à vontade para interagir com a aplicação!
                </p>
            </header>
            <br/>
            <ChatBot/>
        </div>
    );
}

export default App;
