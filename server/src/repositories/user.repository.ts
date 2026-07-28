import prisma from "../config/database";
import type { Prisma, User } from "@prisma/client";

export class UserRepository {
  private model = prisma.user;

  async findById(id: string, includeRelations = false): Promise<User | null> {
    return this.model.findUnique({
      where: { user_id: id },
      include: includeRelations
        ? { role: true, department: true }
        : undefined,
    });
  }

  async findByEmail(
    email: string,
    includePassword = false
  ): Promise<User | null> {
    return this.model.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        role: true,
        department: true,
        ...(includePassword ? {} : {}),
      },
    });
  }

  async findAll(options: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    includeRelations?: boolean;
  }): Promise<User[]> {
    return this.model.findMany({
      skip: options.skip || 0,
      take: options.take || 20,
      where: options.where,
      orderBy: options.orderBy || { created_at: "desc" },
      include: options.includeRelations
        ? { role: true, department: true }
        : undefined,
    });
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.model.count({ where });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.model.create({
      data,
      include: { role: true, department: true },
    });
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    return this.model.update({
      where: { user_id: id },
      data,
      include: { role: true, department: true },
    });
  }

  async delete(id: string): Promise<User> {
    return this.model.delete({ where: { user_id: id } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.model.findUnique({
      where: { email: email.toLowerCase() },
      select: { user_id: true },
    });
    return !!user;
  }
}

export const userRepository = new UserRepository();
