const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
    macAddress: String,
    cpuLoad: Number,
    freeMemory: Number,
    totalMemory: Number,
    usedMemory: Number,
    memUsage: Number,
    osType: String,
    upTime: Number,
    cpuModel: String,
    upTime: Number,
    numCores: Number,
    cpuSpeed: Number,    
});

module.exports = mongoose.model('Machine', Machine);