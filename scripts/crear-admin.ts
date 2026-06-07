/**
 * Script para crear el primer usuario administrador.
 * Uso: npx ts-node scripts/crear-admin.ts
 * O: npx tsx scripts/crear-admin.ts
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  const email = process.argv[2] || "admin@riveraescoto.com";
  const password = process.argv[3] || "Admin1234!";
  const nombre = process.argv[4] || "Administrador";

  const hashedPassword = await bcrypt.hash(password, 10);

  const usuario = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashedPassword, nombre },
    create: { email, password: hashedPassword, nombre },
  });

  console.log(`✓ Usuario admin creado: ${usuario.email}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
