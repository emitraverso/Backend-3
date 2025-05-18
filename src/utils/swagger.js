import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto de Adopciones API',
      version: '1.0.0',
      description: 'documentacion API de backend III',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/docs/**/*.yaml'], 
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
