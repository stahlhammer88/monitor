const os = require('os');

function performanceData () {
    return new Promise (async (res, rej) => {
        const osType = os.type() === 'Darwin' ? 'Mac' : os.type();
        const upTime = os.uptime();
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
        const usedMemory = totalMemory - freeMemory;
        const memUsage = Math.floor(usedMemory/totalMemory*100)/100;
        const cpus = os.cpus();
        const cpuModel = cpus[0].model;
        const cpuSpeed = cpus[0].speed;
        const numCores = cpus.length;
        const cpuLoad = await getCpuLoad();

        res({freeMemory,totalMemory,usedMemory,memUsage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad});
    })    
}

function cpuAverage() {
    const cpus = os.cpus(); 
    let idleMs = 0;
    let totalMs = 0;
    cpus.forEach(core => {
        for (type in core.times) {
            totalMs += core.times[type];
        }
        idleMs += core.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length,
    }
}

function getCpuLoad() {
    return new Promise ((res, rej) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start .total;
            const percentageCpu = 100 - Math.floor(100* idleDifference / totalDifference);            
            res(percentageCpu);
        }, 100)
    })    
}

performanceData().then(res => console.log(res));