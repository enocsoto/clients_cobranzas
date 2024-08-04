import { Client } from "../entities/client";
import { Like } from "typeorm";
// import { Payment } from "../entities/payment";
// import { LoanStatus } from "../entities/loanStatus";

export const getClients = async (): Promise<Client[]> => {
  try {
    const clients = await Client.find();
    if (!clients)
      throw new Error(`Clients not found`);
    return clients;

  } catch (error) {
    if (error instanceof Error)
      console.error(error.message);
    throw new Error(`Client ${error}`);
  }
}

export const getClientByTerm = async (term: string): Promise<string | Client> => {
  try {

    if (!isNaN(Number(term))) {
      const client = await Client.findOne({
        where: { document: Number(term) }
      });
      if (client) return client
    }

    const client = await Client.findOne({
      where: {
        name: Like(`%${term}%`),
        lastName: Like(`%${term}%`)
      }
    });
    if (client) return client

    return ` No client found for term ${term}`;

  } catch (error) {
    if (error instanceof Error)
      console.error(error.message);
    throw new Error(`Client not Found ${error}`);
  }

}

export const createClient = async (clientData: Client): Promise<Client> => {
  //loans = prestamo
  const { name, lastName, email, document } = clientData;

  const client = Client.create({
    name, lastName, email, document
  });

  try {
    await client.save();
    return client;
  } catch (error) {
    if (error instanceof Error)
      console.error(error.message);
    throw new Error(`Error creating client ${error}`);
  }
}

export const deleteOneClient = async (document: number): Promise<string> => {
  try {
    await Client.update(+document, { deletedAt: new Date() })
    return `Client with Document ${document} deleted`;
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error deleting client`);
    throw new Error(`Error deleting client ${error}`);
  }
}

export const updateOneClient = async (document: number, clientData: Partial<Client>): Promise<string> => {
  const { name, lastName } = clientData
  const updatedClient = { document: document, name: name && name.toString(), lastName: lastName && lastName.toString() };
  try {
    await Client.update(document, updatedClient);
    return 'Client updated';
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error creating Client`);
    throw new Error(`Error updating Client ${error}`);
  }
}
