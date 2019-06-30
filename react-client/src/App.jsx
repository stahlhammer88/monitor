import React, { Component } from 'react';
import socket from './utils/socketConnection';

class App extends Component {
    state = {
        performanceData: {}
    }

    componentDidMount() {
        socket.on('data', data => {
            console.log(data);
        })
    }    

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default App;