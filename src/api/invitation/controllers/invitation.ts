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
      console.log("hola estoy aqui");
      const { invitationId, state, eventID } = ctx.request.body as Data;

      console.log(invitationId, state, eventID);
      let result = null;
      try {
        // Buscar la invitación por su ID
        const existingInvitation = await strapi.entityService.findOne("api::invitation.invitation", invitationId);

        // Verificar si la invitación existe antes de intentar actualizar
        if (!existingInvitation) {
          return ctx.notFound('Invitation not found');
        }



        const invitation = await strapi.entityService.findOne("api::invitation.invitation", invitationId, {
          populate: ['guest_user'],
        });
        const event = await strapi.entityService.findOne("api::evento.evento", invitationId, {
          populate: ['guests'],
        });

        if (state === "accepted") {
          result = await strapi.entityService.update("api::invitation.invitation", invitationId, {
            data: {
              status: "accepted"
            }
          });
          console.log(event.guests);
          console.log(invitation.guest_user);

          const guests_updated = event.guests.concat(invitation.guest_user);
          const guests_id = guests_updated.map(guest => guest.id)
          console.log(guests_id);

          strapi.entityService.update("api::evento.evento", eventID, {
            data: {
              guests: guests_id

            }
          })


          console.log(guests_id);

          // await axios.put(`http://127.0.0.1:1337/api/eventos/${eventID}`, {
          //   guests: {
          //     connect: [invitation.guest_user]
          //   }
          // });
        }
      } catch (error) {
        console.error('Error updating invitation status:', error);
        ctx.badRequest("Something went wrong");
      }
      return result;

    }

  })
);
