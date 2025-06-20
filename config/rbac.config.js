module.exports = {
  Admin: {
    routes: [
      { path: '/v1/events', methods: ['GET', 'POST'] },
      { path: '/v1/events/:id', methods: ['GET', 'PUT', 'DELETE'] },
      { path: '/v1/users', methods: ['GET', 'POST'] },
      { path: '/v1/users/:id', methods: ['GET',  'PUT', 'DELETE'] },
      { path: '/v1/roles', methods: ['GET', 'POST'] },
      { path: '/v1/roles/:id', methods: ['GET', 'PUT', 'DELETE'] }
    ]
  },
  User: {
    routes: [
      { path: '/v1/events', methods: ['GET'] }
    ]
  }
};
