
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

// Determine the correct working directory for apps/admin
// If we are in root, it's apps/admin. If we are in apps/admin, it's ./
const projectRoot = process.cwd();
const adminDir = path.join(projectRoot, "apps", "admin");
const targetCwd = fs.existsSync(adminDir) ? adminDir : projectRoot;

console.log(`🚀 Starting Fresh DB Setup from ${targetCwd}...`);

try {
    console.log("\n🗑️  Resetting Database...");
    execSync("npx tsx scripts/reset-db.ts", { stdio: "inherit", cwd: targetCwd });

    console.log("\n📜 Deploying SQL Functions, Triggers & Policies...");
    execSync("npx tsx scripts/deploy-sql.ts", { stdio: "inherit", cwd: targetCwd });

    console.log("\n🌱 Seeding Roles...");
    execSync("npx tsx scripts/seed-roles.ts", { stdio: "inherit", cwd: targetCwd });

    console.log("\n⚙️ Seeding Default Settings...");
    execSync("npx tsx scripts/seed-settings.ts", { stdio: "inherit", cwd: targetCwd });

    console.log("\n📚 Seeding Curriculum Data...");
    execSync("npx tsx scripts/seed-curriculum.ts", { stdio: "inherit", cwd: targetCwd });

    console.log("\n✨ Fresh Start Complete! Database is clean and seeded.");
} catch (error) {
    console.error("\n❌ Error during fresh start:", error);
    process.exit(1);
}
