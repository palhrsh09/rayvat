module.exports = {
  Admin: {
    routes: [
      { path: '/v1/events', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
      { path: '/v1/users', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
      { path: '/v1/roles', methods: ['GET', 'POST', 'PUT', 'DELETE'] }
    ]
  },
  User: {
    routes: [
      { path: '/v1/events', methods: ['GET'] }
    ]
  }
};
