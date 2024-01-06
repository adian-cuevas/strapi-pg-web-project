/**
 * recordatorio router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::recordatorio.recordatorio',{
    config:{
        find:{
            policies:["global::isAuthenticated"],

            middlewares:["api::recordatorio.is-reminder-owner"]
        },
        findOne:{
            policies:["global::isAuthenticated"],

            middlewares:["api::recordatorio.is-reminder-owner"]
        },
        update:{
            policies:["global::isAuthenticated"],

            middlewares:["api::recordatorio.is-reminder-owner"]
        },
        delete:{
            policies:["global::isAuthenticated"],
            
            middlewares:["api::recordatorio.is-reminder-owner"]
        },
    }
});
