"use strict";

/**
 * `isCalendarOwner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
      /** 
     * Gets all information about a given entry,
     * populating every relations to ensure 
     * the response includes author-related information
     */

    let entry = entryId ?
      await strapi.entityService.findOne(
      "api::calendario.calendario",
      entryId,
      { populate: "*" }
      ):
      {};

  
    /**
     * Compares user id and entry author id
     * to decide whether the request can be fulfilled
     * by going forward in the Strapi backend server
     */
    try{
      if (user.id !== entry.author.id) {
        return ctx.unauthorized("This action is unauthorized.");
      } else {
        return next();
      }
    }
    catch(error){
      console.error(error);
      ctx.badRequest("Something went wrong");
    }
    
  };
};