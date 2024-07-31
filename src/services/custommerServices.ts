import { Request, Response } from "express";
// import { User } from "../entities/user";

export const createClient = (_req: Request, res: Response) => {
  // const { name, lastName, document, payments } = req.body;
  // Save client to database
  // const user = new User();


  res.status(201).json({ message: "Client created successfully" });
}