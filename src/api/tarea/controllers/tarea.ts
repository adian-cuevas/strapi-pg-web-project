import { factories } from '@strapi/strapi';

/**
 * Controlador de Eventos
 * Este controlador se encarga de crear un nuevo evento.
 */


export default factories.createCoreController('api::tarea.tarea', ({ strapi }) => ({
 
  /**
   * Función para crear un evento nuevo.
   * Extrae la información del contexto de la solicitud y crea un nuevo evento.
   */
  async create(ctx) {
    const result = await super.create(ctx);
    const user = ctx.state.user; // Usuario actual
    try {
      
      const {calendarID} = ctx.params;
      console.log(ctx.params)

      // Crear un nuevo evento utilizando el servicio de entidades de Strapi
      const result = await super.create(ctx);
      //puercada necesaria porque si no no pincha
      console.log(result)
      const {data}=result;
      console.log(data);
      const {id}=data;
      console.log(id)

      // Actualizar el calendario con el nuevo evento
      const calendar = await strapi.entityService.findOne("api::calendario.calendario", calendarID, {
        populate: ["tasks"],
      });
      console.log(calendar)
      const tasks_ids = calendar.tasks.map(task => task.id);

      const tasks_updated = tasks_ids.concat(id);
      console.log("tasks updated")

      console.log(tasks_updated)

      console.log(tasks_ids)

      await strapi.entityService.update("api::calendario.calendario", calendarID, {
        data: {
          tasks: tasks_updated,
        }
      });
      console.log("llegue aqui 3")

      // Sanitizar la salida del nuevo evento
      const sanitizedTask = await this.sanitizeOutput(result, ctx);
      console.log("llegue aqui 4")


      // Asignar el evento sanitizado como cuerpo de la respuesta
      ctx.body = sanitizedTask;

    } catch (error) {
      console.error('Error creating task:', error);
      ctx.badRequest("Error creating task");
    }
    return result;
  },
 
}));
