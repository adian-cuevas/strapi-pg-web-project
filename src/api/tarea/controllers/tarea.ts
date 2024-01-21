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
      console.log(calendarID)
      // Actualizar el calendario con el nuevo evento
      const calendar = await strapi.entityService.findOne("api::calendario.calendario", calendarID, {
        populate: ["tasks"],
      });
      console.log("llegue aqui 1")

      const tasks_updated = calendar.tasks.concat(result);
      const tasks_ids = tasks_updated.map(task => task.id);
      console.log("llegue aqui 2")

      await strapi.entityService.update("api::calendario.calendario", calendarID, {
        data: {
          tasks: tasks_ids,
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
