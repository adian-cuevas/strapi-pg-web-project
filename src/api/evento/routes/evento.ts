/**
 * evento router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::evento.evento',{
    config:{
        find:{

            policies:["global::isAuthenticated"],

            middlewares:["api::evento.is-event-owner"]
        },
        findOne: {

            policies:["global::isAuthenticated"],

            middlewares:["api::evento.is-event-owner"]
        },
        update: {
            policies:["global::isAuthenticated"],

            middlewares:["api::evento.is-event-owner"]
        },
        delete: {
            policies:["global::isAuthenticated"],
            
            middlewares:["api::evento.is-event-owner"]
        },
        create: {
            policies:["global::isAuthenticated"],
        }
    }
});
