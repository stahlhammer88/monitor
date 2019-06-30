const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/perfData', {useNewUrlParser: true});
const Machine = require('./models/Machine');

function socketMain(io, socket) {
    let macAddress;
    socket.on('clientAuth', key => {
        if (key === 'jf92348fjvr89jv') {
            socket.join('clients');
        }
        else if (key === 'f92380df23j0') {
            socket.join('ui');
        }else {
            socket.disconnect(true);
        }
    })

    socket.on('initPerfData', async (data) => {
        macAddress = data.macAddress;
        const mongoRes = await checkAndAdd(data);
        console.log(mongoRes);
    })

    socket.on('perfData', data => {
        io.to('ui').emit('data', data);
    })
}

function checkAndAdd(data) {
    return new Promise((res, rej) => {
        Machine.findOne({
            macAddress: data.macAddress
        }, (err, doc) => {
            if (err) rej(err);
            else if (doc === null) {
                let machine = new Machine(data);
                machine.save();
                res('added');
            }
            else {
                res('found');
            }
        })
    });
}

module.exports = socketMain;