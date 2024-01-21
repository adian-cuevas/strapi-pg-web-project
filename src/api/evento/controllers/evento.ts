import { factories } from '@strapi/strapi';

/**
 * Controlador de Eventos
 * Este controlador se encarga de crear un nuevo evento.
 */


export default factories.createCoreController('api::evento.evento', ({ strapi }) => ({
 
  /**
   * Función para crear un evento nuevo.
   * Extrae la información del contexto de la solicitud y crea un nuevo evento.
   */
  async create(ctx) {
    const result = await super.create(ctx);
    const user = ctx.state.user; // Usuario actual
    try {
      
      const {calendarID} = ctx.params;

      // Crear un nuevo evento utilizando el servicio de entidades de Strapi
      const result = await super.create(ctx);

      // Actualizar el calendario con el nuevo evento
      const calendar = await strapi.entityService.findOne("api::calendario.calendario", calendarID, {
        populate: ["events"],
      });
      const events_updated = calendar.events.concat(result);
      const events_ids = events_updated.map(event => event.id);
      await strapi.entityService.update("api::calendario.calendario", calendarID, {
        data: {
          events: events_ids,
        }
      });

      // Sanitizar la salida del nuevo evento
      const sanitizedEvent = await this.sanitizeOutput(result, ctx);

      // Asignar el evento sanitizado como cuerpo de la respuesta
      ctx.body = sanitizedEvent;

    } catch (error) {
      console.error('Error creating event:', error);
      ctx.badRequest("Error creating event");
    }
    return result;
  },
 
}));
