import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("test1234", 10);

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: passwordHash,
      name: "Admin User",
      provider: "CREDENTIALS",
      role: "ADMIN",
    },
  });

  console.log("✅ Test user created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
