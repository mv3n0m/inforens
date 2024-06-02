import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'Inforens API',
    version: '1.0.0',
    description: 'APIs for Inforens app',
  },
  servers: [
    {
      url: '/api/v0',
      description: 'APIs for Inforens app',
    },
  ],
  tags: [
    {
      name: 'Accounts',
      description: 'Operations related to account management',
    },
    {
      name: 'Common',
      description: 'Common operations available for all',
    },
    {
      name: 'Users',
      description:
        'Operations related to user profile - (requires user authentication with jwt)',
    },
    {
      name: 'Services',
      description: 'Operations related to services',
    },
    {
      name: 'Admin',
      description:
        'Operations to be executed by admins/staffs - (Currently open to all, but will require authorization in future)',
    },
  ],
  components: {
    responses: {
      SuccessResponse: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                count: {
                  type: 'integer',
                  description: 'Number of items',
                },
                rows: {
                  type: 'array',
                  description: 'List of items',
                  items: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      JWTAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT token for authentication.',
      },
    },
  },
}

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.?s', 'src/routes/**/*.?s', 'src/app.?s'],
}

const swaggerSpec = swaggerJSDoc(options)
export { swaggerSpec }
