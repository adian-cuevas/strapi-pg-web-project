
export default {
    routes: [
      {
        method: 'POST',
        path: '/tareas/create/:calendarID',
        handler: 'tarea.create',
        config: {
        //   policies: [ ]
        },
      },
    ],
  };