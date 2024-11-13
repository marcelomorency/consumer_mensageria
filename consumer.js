const dotenv = require("dotenv").config();

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
