import { User } from "../entities/user";
import { Like } from "typeorm";

export class UserService {

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.find();
      if (!users)
        throw new Error(`Users not found`);
      return users;

    } catch (error) {
      if (error instanceof Error)
        console.error(error.message);
      throw new Error(`User ${error}`);
    }
  }
  async getUserByTerm(term: string): Promise<string | User> {
    try {

      if (!isNaN(Number(term))) {
        const user = await User.findOne({
          where: { document: Number(term) }
        });
        if (user) return user
      }

      const user = await User.findOne({
        where: {
          name: Like(`%${term}%`),
          lastName: Like(`%${term}%`)
        }
      });
      if (user) return user

      return ` No user found for term ${term}`;

    } catch (error) {
      if (error instanceof Error)
        console.error(error.message);
      throw new Error(`User not Found ${error}`);
    }

  }

  async createUser(userData: User): Promise<User> {

    const { name, lastName, document, payments } = userData;

    const user = User.create({
      name, lastName, document, payments
    });
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof Error)
        console.error(error.message);
      throw new Error(`Error creating user ${error}`);
    }
  }

  async deleteUser(document: number): Promise<string> {
    try {
      await User.update(+document, { deletedAt: new Date() })
      return `User with Document ${document} deleted`;
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error creating user`);
      throw new Error(`Error deleting user ${error}`);
    }
  }

  async updateUser(document: number, userData: Partial<User>): Promise<string> {
    const { name, lastName } = userData
    const updatedUser = { document: document, name: name && name.toString(), lastName: lastName && lastName.toString() };
    try {
      await User.update(document, updatedUser);
      return 'User updated';
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error creating user`);
      throw new Error(`Error updating user ${error}`);
    }
  }

}
