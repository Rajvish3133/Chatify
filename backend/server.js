import { server } from "./socket/socket.js";


server.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});