/**
 * invitacion router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::invitacion.invitacion',{
    config: {
        find: {
            policies:["global::isAuthenticated"],
        },
        findOne: {
            policies:["global::isAuthenticated"],
        },
        update: {
            policies:["global::isAuthenticated"],
        },
        delete: {
            policies:["global::isAuthenticated"],
        },
        create: {
            policies:["global::isAuthenticated"],
        }
    }
});
