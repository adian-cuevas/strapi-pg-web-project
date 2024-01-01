
export default (policyContext, config, { strapi }) => {
  strapi.log.info('In isAuthenticated policy.');
  if (policyContext.state.user) { // if a session is open
    // go to next policy or reach the controller's action
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};