import { factories } from '@strapi/strapi';

/**
 * Controlador de Eventos
 * Este controlador se encarga de crear un nuevo evento.
 */
interface Event {
  name: string; // Nombre del evento
  description: string; // Descripción del evento
  start: Date; // Fecha de inicio del evento
  end: Date; // Fecha de finalización del evento
  date: Date; // Fecha del evento
  guests: number[]; // Lista de IDs de invitados (números)
}
interface Data{
  eventID : number;
  guestId:number;
}

export default factories.createCoreController('api::evento.evento', ({ strapi }) => ({
 
  /**
   * Función para crear un evento nuevo.
   * Extrae la información del contexto de la solicitud y crea un nuevo evento.
   */
  async create(ctx) {
    
    const user = ctx.state.user; // Usuario actual
    const { name, description, start, end, date, guests } = ctx.request.body as Event; // Extraer datos del cuerpo de la solicitud
    console.log(name)
    // Crear un nuevo evento utilizando el servicio de entidades de Strapi
    const newEvent = await strapi.entityService.create('api::evento.evento', {
      data: {
        name: name, // Asignar el nombre del evento
        description: description, // Asignar la descripción del evento
        start_time: start, // Asignar la fecha de inicio del evento
        end_time: end, // Asignar la fecha de finalización del evento
        date: date, // Asignar la fecha del evento
        guests: guests // Asignar la lista de IDs de invitados al evento
      },
    });

    // Sanitizar la salida del nuevo evento
    const sanitizedEvent = await this.sanitizeOutput(newEvent, ctx);

    // Asignar el evento sanitizado como cuerpo de la respuesta
    ctx.body = sanitizedEvent;
  },
 
}));
