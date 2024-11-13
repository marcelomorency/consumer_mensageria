/*const dotenv = require("dotenv").config();

const amqp = require("amqplib");

let api_key = process.env.AMQP;

async function receiveMessage() {
  let queue = "hello";

  try {
    const connection = await amqp.connect(api_key);

    const channel = connection.createChannel();

    (await channel).assertQueue(queue, { durable: false });

    console.log("Aguardando a fila: " + queue);

    (await channel).consume(
      queue,
      (msg) => {
        console.log("Mensagem recebida: " + msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
receiveMessage();
*/

const amqp = require("amqplib");
const dotenv = require("dotenv").config();

let api_key = process.env.AMQP;

async function receiveMessage() {
  let queue = "hello";

  try {
    const connection = await amqp.connect(api_key);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    console.log("Aguardando a fila: " + queue);

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          let receivedData = JSON.parse(msg.content.toString());
          let currentValue = receivedData.value;

          // Subtrai um valor do valor recebido
          let newValue = currentValue - 20.0;
          console.log(`Valor recebido: ${currentValue}`);
          console.log(`Valor recebido após subtração: ${newValue}`);
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(error);
  }
}

receiveMessage();
