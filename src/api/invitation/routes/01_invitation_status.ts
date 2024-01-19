
export default  {
    routes: [
      {
        method: 'PUT',
        path: '/invitations/state',
        handler: 'invitation.state',
        config: {
          policies:["global::isAuthenticated"],
          middlewares:["api::invitation.is-invitation-guest"]
          
        },
      },
    ],
  };