

export default (policyContext, config, { strapi }) => {
  strapi.log.info('In isAdmin policy.');
  return policyContext.state.user.role.name === 'Admin'
};
