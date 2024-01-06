import { Server } from "socket.io";

export default {
  register({ strapi }) {},

  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("message", async (message) => {
        console.log(message);

        io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);

        const entry = await strapi.db
          .query("api::notification.notification")
          .create({
            data: {
              message: message,
              user: socket.id.substr(0, 2),
            },
          })
          .catch((e) => {
            console.log("error", e);
          });
      });
    });
  },
};