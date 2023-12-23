// clusterSetup.ts
import cluster from "cluster";
import os from "os";
import app from "./app";

if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  // Start the server
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(
      `Server is running on ${process.env.NODE_ENV} environment with port: ${PORT}`
    );
  });

  console.log(`Worker ${process.pid} started`);
}
