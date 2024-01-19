// Definición de la interfaz Invitation que describe la estructura de los datos de una invitación
import { factories } from '@strapi/strapi';
import axios from 'axios';
import evento from '../../evento/controllers/evento';
// import { Context } from 'koa';
interface Invitation {
  title: string;
  message: string;
  event: number;
  guests: number[];
  status: string
}
interface Data {
  invitationId: number;
  state: string;
  eventID: number;
}


// Importación del módulo factories de Strapi para crear un controlador central




// Exportación de un controlador de creación de invitaciones
export default factories.createCoreController('api::invitation.invitation',
  ({ strapi }) => ({
    // Función asíncrona para manejar la creación de invitaciones
    async create(ctx) {
      const user = ctx.state.user; // Obtención del usuario desde el contexto

      try {
        // Desestructuración de los campos title, message, event, y guests del cuerpo de la solicitud
        const { title, message, event, guests } = ctx.request.body as Invitation;
        // console.log(guests); // Posible uso para depuración

        // Iteración sobre los invitados para crear invitaciones individuales
        guests.forEach(guest => {
          try {
            // Creación de una nueva invitación usando el servicio de entidad de Strapi
            const invitation = strapi.entityService.create("api::invitation.invitation", {
              data: {
                title: title,
                message: message,
                event: event,
                guest_user: guest,

              }
            });

            console.log(invitation); // Registro de la invitación creada en la consola
          } catch (error) {
            console.error('Error creating invitation for guest:', error);
            // Manejo de errores específicos al crear invitaciones para cada invitado
          }
        });

        ctx.send("Successfully sent"); // Envia una respuesta al cliente indicando éxito
      } catch (error) {
        console.error('Error processing invitation creation:', error);
        ctx.badRequest("Something went wrong"); // Envía un mensaje de error genérico al cliente
      }
    },

    async state(ctx) {
      // Imprime un mensaje de registro en la consola para indicar la ejecución de la función
      console.log("invitation.state");

      // Extrae los datos relevantes del cuerpo de la solicitud
      const { invitationId, state, eventID } = ctx.request.body as Data;

      // Imprime en la consola los datos extraídos para propósitos de depuración
      console.log(invitationId, state, eventID);

      // Inicializa la variable result como nula
      let result = null;

      try {
        // Busca una invitación existente por su ID
        const existingInvitation = await strapi.entityService.findOne("api::invitation.invitation", invitationId);

        // Verifica si la invitación no existe y retorna un error 404 si es el caso
        if (!existingInvitation) {
          return ctx.notFound('Invitation not found');
        }

        // Obtiene información detallada de la invitación y del evento asociado
        const invitation = await strapi.entityService.findOne("api::invitation.invitation", invitationId, {
          populate: ['guest_user'],
        });
        const event = await strapi.entityService.findOne("api::evento.evento", invitationId, {
          populate: ['guests'],
        });

        // Verifica si el estado es "accepted"
        if (state === "accepted") {
          // Actualiza el estado de la invitación a "accepted"
          result = await strapi.entityService.update("api::invitation.invitation", invitationId, {
            data: {
              status: "accepted"
            }
          });

          

          // Combina la lista de invitados del evento con el nuevo invitado aceptado
          const guests_updated = event.guests.concat(invitation.guest_user);

          // Obtiene los IDs de los invitados actualizados
          const guests_id = guests_updated.map(guest => guest.id)
          console.log(guests_id);

          // Actualiza la lista de invitados del evento con los IDs actualizados
          strapi.entityService.update("api::evento.evento", eventID, {
            data: {
              guests: guests_id
            }
          })

        
        }
      } catch (error) {
        // Maneja errores relacionados con la actualización del estado de la invitación
        console.error('Error updating invitation status:', error);
        ctx.badRequest("Something went wrong");
      }

      // Retorna el resultado de la operación de actualización (puede ser nulo si no se cumple la condición "accepted")
      return result;
    }

  })
  );
