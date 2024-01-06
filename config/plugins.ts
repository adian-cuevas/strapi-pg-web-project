module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 465),
        secure: true,
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: "support@empresa.com",
        defaultReplyTo: "adiancuevasmartinez@gmail.com",
      },
    },
  },
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the article content type
      contentTypes: ["api::notification.notification"],
    },
  },
});
