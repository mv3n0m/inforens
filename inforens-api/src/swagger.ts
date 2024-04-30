import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
      title: 'Inforens API',
      version: '1.0.0',
      description: 'APIs for Inforens app',
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "APIs for Inforens app",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts', './routes/**/*.ts', './app.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export {swaggerSpec};
