/**
 * recordatorio router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::recordatorio.recordatorio',{
    config:{
        find:{
            middlewares:["api::recordatorio.is-reminder-owner"]
        },
        findOne:{
            middlewares:["api::recordatorio.is-reminder-owner"]
        },
        update:{
            middlewares:["api::recordatorio.is-reminder-owner"]
        },
        delete:{
            middlewares:["api::recordatorio.is-reminder-owner"]
        },
    }
});
