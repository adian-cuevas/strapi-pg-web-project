/**
 * tarea router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tarea.tarea',{
    config: {
        find: {
            middlewares: ["api::tarea.is-task-owner"]
        },
        findOne: {
            middlewares: ["api::tarea.is-task-owner"]
        },
        update: {
            middlewares: ["api::tarea.is-task-owner"]
        },
        delete: {
            middlewares: ["api::tarea.is-task-owner"]
        }
    }
});
