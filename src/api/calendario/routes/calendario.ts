/**
 * calendario router
 */

import { factories } from '@strapi/strapi';


export default factories.createCoreRouter('api::calendario.calendario',{
    config: {
        find:{

            policies:["global::isAuthenticated"],

            middlewares: ['api::calendario.is-calendar-owner']
        },
        findOne:{

            policies:["global::isAuthenticated"],

            middlewares: ['api::calendario.is-calendar-owner']
        },
        update:{

            policies:["global::isAuthenticated"],

            middlewares: ['api::calendario.is-calendar-owner']
        },
        delete:{

            policies:["global::isAuthenticated"],

            middlewares: ['api::calendario.is-calendar-owner']
        },
    },
});
