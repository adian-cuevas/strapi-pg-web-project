/**
 * tarea router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tarea.tarea',{
    config: {
        find: {
            policies:["global::isAuthenticated"],

            middlewares: ["api::tarea.is-task-owner"]
        },
        findOne: {
            policies:["global::isAuthenticated"],

            middlewares: ["api::tarea.is-task-owner"]
        },
        update: {
            policies:["global::isAuthenticated"],

            middlewares: ["api::tarea.is-task-owner"]
        },
        delete: {
            policies:["global::isAuthenticated"],
            
            middlewares: ["api::tarea.is-task-owner"]
        },
        create: {
            policies:["global::isAuthenticated"],
        }
    }
});
