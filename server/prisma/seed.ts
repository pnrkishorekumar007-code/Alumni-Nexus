import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const roles: UserRole[] = [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.ALUMNI,
    UserRole.STUDENT,
    UserRole.FACULTY,
  ];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { role_name: roleName },
      update: {},
      create: { role_name: roleName },
    });
    console.log(`  Seeded role: ${roleName}`);
  }

  const departments = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Biotechnology",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Automobile Engineering",
  ];

  for (const deptName of departments) {
    await prisma.department.upsert({
      where: { department_name: deptName },
      update: {},
      create: { department_name: deptName },
    });
    console.log(`  Seeded department: ${deptName}`);
  }

  const superAdminRole = await prisma.role.findUnique({
    where: { role_name: UserRole.SUPER_ADMIN },
  });

  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  if (superAdminRole) {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@srmalumninexus.com" },
    });

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          name: "Super Admin",
          email: "admin@srmalumninexus.com",
          password: hashedPassword,
          role_id: superAdminRole.role_id,
          is_verified: true,
        },
      });
      console.log("  Seeded super admin user");
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
