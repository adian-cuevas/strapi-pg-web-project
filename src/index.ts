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

      socket.on("notificaction", async (notification) => {
        console.log(notification.message,notification.title);

        io.emit("notification", notification );

        const entry = await strapi.db
          .query("api::notification.notification")
          .create({
            data: {
              title:notification.title,
              message: notification.message,
              guests: notification.guests,
            },
          })
          .catch((e) => {
            console.log("error", e);
          });
      });
    });
  },
};