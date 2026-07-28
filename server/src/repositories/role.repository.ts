import prisma from "../config/database";
import type { Prisma, Role } from "@prisma/client";

export class RoleRepository {
  private model = prisma.role;

  async findById(id: string): Promise<Role | null> {
    return this.model.findUnique({ where: { role_id: id } });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.model.findUnique({
      where: { role_name: name as any },
    });
  }

  async findAll(): Promise<Role[]> {
    return this.model.findMany({ orderBy: { role_name: "asc" } });
  }

  async count(): Promise<number> {
    return this.model.count();
  }

  async create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.model.create({ data });
  }
}

export const roleRepository = new RoleRepository();
