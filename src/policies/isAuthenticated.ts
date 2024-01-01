/**
 * isAuthenticated policy
 */

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In isAuthenticated policy.');

    if (policyContext.state.user) {
      return true;
    }

    return false;
};
