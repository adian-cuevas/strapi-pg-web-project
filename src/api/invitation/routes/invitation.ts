/**
 * invitation router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::invitation.invitation',{
    config:{
        find:{

            policies:["global::isAuthenticated"],

            middlewares:["api::invitation.is-invitation-guest"]
        },
        findOne: {

            policies:["global::isAuthenticated"],

            middlewares:["api::invitation.is-invitation-guest"]
        },
        update: {
            policies:["global::isAuthenticated"],

            middlewares:["api::invitation.is-invitation-guest"]
        },
        delete: {
            policies:["global::isAuthenticated"],
            
            middlewares:["api::invitation.is-invitation-guest"]
        },
        create: {
            policies:["global::isAuthenticated"],
        }
    }
});
