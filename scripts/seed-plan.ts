import * as dotenv from "dotenv";
import * as path from "path";
import { eq } from "drizzle-orm";

console.log("Loading Plans Seeder...");
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Product Plans & Pricing Seeding...");
    
    // Dynamic import to ensure env is loaded before client initialization
    const { db } = await import("../drizzle/index");
    const { plans } = await import("../drizzle/schema/tables/plans");
    const { planPricing } = await import("../drizzle/schema/tables/plan_pricing");

    const fullPlanData = [
        {
            planName: "30 Day Sprint Plan",
            description: "Complete Bundle",
            durationDays: 45,
            isActive: true,
            mrpPrice: 1999,
            offerPrice: 999
        },
        {
            planName: "30 Day Physics",
            description: "Physics Module",
            durationDays: 45,
            isActive: true,
            mrpPrice: 999,
            offerPrice: 499
        },
        {
            planName: "30 Day Chemistry",
            description: "Chemistry Module",
            durationDays: 45,
            isActive: true,
            mrpPrice: 999,
            offerPrice: 499
        },
        {
            planName: "30 Day Biology",
            description: "Biology Module",
            durationDays: 45,
            isActive: true,
            mrpPrice: 999,
            offerPrice: 499
        }
    ];

    try {
        console.log("Processing Plans...");
        for (const item of fullPlanData) {
            // Find existing plan by name
            const existingPlans = await db.select().from(plans).where(eq(plans.planName, item.planName));
            let planId: string;

            if (existingPlans.length > 0) {
                planId = existingPlans[0].id;
                console.log(`Updating existing plan: ${item.planName}`);
                await db.update(plans).set({
                    description: item.description,
                    durationDays: item.durationDays,
                    isActive: item.isActive,
                    updatedAt: new Date()
                }).where(eq(plans.id, planId));
            } else {
                console.log(`Inserting new plan: ${item.planName}`);
                const inserted = await db.insert(plans).values({
                    planName: item.planName,
                    description: item.description,
                    durationDays: item.durationDays,
                    isActive: item.isActive
                }).returning({ id: plans.id });
                planId = inserted[0].id;
            }

            // Process Pricing for this plan
            const existingPricing = await db.select().from(planPricing).where(eq(planPricing.planId, planId));
            
            if (existingPricing.length > 0) {
                console.log(`Updating pricing for: ${item.planName}`);
                await db.update(planPricing).set({
                    mrpPrice: item.mrpPrice,
                    offerPrice: item.offerPrice,
                    isActive: item.isActive
                }).where(eq(planPricing.planId, planId));
            } else {
                console.log(`Inserting pricing for: ${item.planName}`);
                await db.insert(planPricing).values({
                    planId: planId,
                    mrpPrice: item.mrpPrice,
                    offerPrice: item.offerPrice,
                    currency: "INR",
                    isActive: item.isActive
                });
            }
        }

        console.log("✅ Seeded/Updated 4 Product Plans and their Pricing.");
    } catch (error) {
        console.error("❌ Failed to seed Plans data: ", error);
        process.exit(1);
    }

    process.exit(0);
}

main().catch(console.error);
