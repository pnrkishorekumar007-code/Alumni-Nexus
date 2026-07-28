import prisma from "../config/database";
import type { Prisma, RefreshToken } from "@prisma/client";

export class RefreshTokenRepository {
  private model = prisma.refreshToken;

  async create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    return this.model.create({ data });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.model.findUnique({ where: { token } });
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    return this.model.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });
  }

  async deleteByToken(token: string): Promise<RefreshToken> {
    return this.model.delete({ where: { token } });
  }

  async deleteByUserId(userId: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { user_id: userId },
    });
    return result.count;
  }

  async deleteExpired(): Promise<number> {
    const result = await this.model.deleteMany({
      where: {
        expires_at: { lt: new Date() },
      },
    });
    return result.count;
  }

  async deleteAllForUserExcept(
    userId: string,
    excludeToken: string
  ): Promise<number> {
    const result = await this.model.deleteMany({
      where: {
        user_id: userId,
        token: { not: excludeToken },
      },
    });
    return result.count;
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
