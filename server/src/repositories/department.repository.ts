import prisma from "../config/database";
import type { Prisma, Department } from "@prisma/client";

export class DepartmentRepository {
  private model = prisma.department;

  async findById(id: string): Promise<Department | null> {
    return this.model.findUnique({ where: { department_id: id } });
  }

  async findByName(name: string): Promise<Department | null> {
    return this.model.findUnique({
      where: { department_name: name },
    });
  }

  async findAll(): Promise<Department[]> {
    return this.model.findMany({ orderBy: { department_name: "asc" } });
  }

  async count(): Promise<number> {
    return this.model.count();
  }

  async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
    return this.model.create({ data });
  }
}

export const departmentRepository = new DepartmentRepository();
