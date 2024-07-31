import { Request, Response } from "express";
import { User } from "../entities/user";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async getAllUsers(_req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    return res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { term } = req.params;
    if (!term) res.status(404).json({ error: "term is required" });

    const user = await this.userService.getUserByTerm(term);
    return res.status(200).json({ user });
  }
  async createUser(req: Request, res: Response) {
    const userData: User = req.body;
    const user = await this.userService.createUser(userData);
    return res.status(201).json({ user });
  }
  async updateUser(req: Request, res: Response) {

    const { document } = req.params;

    if (!document) return res.status(404).json({ error: "document is required" });

    const userData: Partial<User> = req.body;
    try {

      const user = await this.userService.updateUser(Number(document), userData);
      return res.status(200).json({ user });
    } catch (error) {
      console.error(`Error updating user`);
      return res.status(404).json({ message: 'User not found' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await this.userService.deleteUser(Number(id));
    return res.status(204).json(`Successfully deleted`);
  }
}