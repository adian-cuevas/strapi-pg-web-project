/**
 * evento router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::evento.evento',{
    config:{
        find:{
            middlewares:["api::evento.is-event-owner"]
        },
        findOne: {
            middlewares:["api::evento.is-event-owner"]
        },
        update: {
            middlewares:["api::evento.is-event-owner"]
        },
        delete: {
            middlewares:["api::evento.is-event-owner"]
        }
    }
});
