import { Request, Response } from "express";
import { Client } from "../entities/client";
import { createClient, deleteOneClient, getClients, getClientByTerm, updateOneClient } from "../services/clientService";

export const getAllClients = async (_req: Request, res: Response) => {
  const clients = await getClients();
  return res.status(200).json(clients);
}

export const getClientById = async (req: Request, res: Response) => {
  const { term } = req.params;
  if (!term) res.status(404).json({ error: "term is required" });

  const client = await getClientByTerm(term);
  return res.status(200).json({ client });
}
export const createNewClient = async (req: Request, res: Response) => {
  const userData: Client = req.body;
  const client = await createClient(userData);
  return res.status(201).json({ client });
}
export const updateClient = async (req: Request, res: Response) => {

  const { document } = req.params;

  if (!document) return res.status(404).json({ error: "document is required" });

  const userData: Partial<Client> = req.body;
  try {

    const user = await updateOneClient(Number(document), userData);
    return res.status(200).json({ user });
  } catch (error) {
    console.error(`Error updating user`);
    return res.status(404).json({ message: 'User not found' });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteOneClient(Number(id));
  return res.status(204).json(`Successfully deleted`);
}
