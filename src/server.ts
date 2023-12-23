import app from "./app";
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} environment with port : ${PORT}`
  );
});

export default server;
