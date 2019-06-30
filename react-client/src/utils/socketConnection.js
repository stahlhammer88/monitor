import io from 'socket.io-client';
let socket = io.connect('http://localhost:8181');
socket.emit('clientAuth', 'f92380df23j0');

export default socket;