const winston = require('winston');
const winstonGelf = require('winston-gelf');
const process = require('process');

// TODO: Usar dotenv
const HOST = 'localhost';
const PORT = 22201;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winstonGelf({
      // You will find all gelfPro options here: https://www.npmjs.com/package/gelf-pro
      gelfPro: {
        fields: {
          env: process.env.NODE_ENV || 'development'
        },
        adapterName: 'udp',
        adapterOptions: {
          host: HOST, // Replace per your Graylog domain
          port: PORT
        }
      }
    })
  ]
});

// Ejemplo de un mensaje tipo INFO
logger.info('This is AN INFO message with some data', {message_id: 1234, detail: 'Hello world!'});
