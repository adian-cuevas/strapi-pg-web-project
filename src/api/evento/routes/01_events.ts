
export default {
    routes: [
      {
        method: 'POST',
        path: '/eventos/create/:calendarID',
        handler: 'evento.create',
        config: {
        //   policies: [ ]
        },
      },
    ],
  };