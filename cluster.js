//cluster.js file to run node in load balancing mode

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i<cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Server ${worker.id} crashed... ` +
                  'Starting a new server...');
      cluster.fork();
    }
  });
} else {
  require('./server');
}

