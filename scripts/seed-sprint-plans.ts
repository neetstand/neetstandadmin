import * as dotenv from "dotenv";
import * as path from "path";

console.log("Loading Sprint Plans Seeder...");
const envFile = process.env.APP_ENV === "production" ? ".env.production" : ".env.local";
const envPath = path.resolve(process.cwd(), envFile);
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Sprint Plans Seeding...");
    const { db } = await import("../drizzle/index");
    const { sprintPlans, sprintPlanDays, sprintPlanBonuses } = await import("../drizzle/schema/tables/sprint_plans");

    // 1. TOPPER PLAN
    const topperPlanId = "11111111-1111-1111-1111-111111111111"; // Deterministic UUIDs for easy referencing or just let db generate. Let's let DB generate and fetch.
    const plansData = [
        { name: "Topper Plan", description: "Scoring 550 plus and Aiming for 720", isActive: true },
        { name: "Challenger Plan", description: "Scoring 400 - 500 and Aiming for 600", isActive: true },
        { name: "Groundbreaker Plan", description: "Scoring 400 - 500 and Aiming for 600", isActive: true },
    ];

    // Clear existing to avoid duplicates on re-run
    await db.delete(sprintPlans);

    const insertedPlans = await db.insert(sprintPlans).values(plansData).returning();
    const topperId = insertedPlans.find(p => p.name === "Topper Plan")!.id;
    const challengerId = insertedPlans.find(p => p.name === "Challenger Plan")!.id;
    const groundbreakerId = insertedPlans.find(p => p.name === "Groundbreaker Plan")!.id;

    // --- DATA TRANSCRIPTION ---

    const topperDays = [
        { planId: topperId, dayNumber: 1, biologyChapterCode: "BB051224", biologyStartOrder: 1, biologyEndOrder: 10, physicsChapterCode: "PE031217", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO081217", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: topperId, dayNumber: 2, biologyChapterCode: "BB041223", biologyStartOrder: 1, biologyEndOrder: 9, physicsChapterCode: "PM141228", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CO081217", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: topperId, dayNumber: 3, biologyChapterCode: "BB091228", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PO091223", physicsStartOrder: 1, physicsEndOrder: 11, chemistryChapterCode: "CO081108", chemistryStartOrder: 1, chemistryEndOrder: 9 },
        { planId: topperId, dayNumber: 4, biologyChapterCode: "BZ041104", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PT111111", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO081108", chemistryStartOrder: 10, chemistryEndOrder: 17 },
        { planId: topperId, dayNumber: 5, biologyChapterCode: "BB111230", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM111225", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP021102", chemistryStartOrder: 1, chemistryEndOrder: 17 },
        { planId: topperId, dayNumber: 6, biologyChapterCode: "BB051105", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE011215", physicsStartOrder: 1, physicsEndOrder: 8, chemistryChapterCode: "CI041104", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: topperId, dayNumber: 7, biologyChapterCode: "BB081108", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PE011215", physicsStartOrder: 9, physicsEndOrder: 14, chemistryChapterCode: "CI041104", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: topperId, dayNumber: 8, biologyChapterCode: "BZ101110", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE021216", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CP061106", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: topperId, dayNumber: 9, biologyChapterCode: "BB011220", biologyStartOrder: 1, biologyEndOrder: 9, physicsChapterCode: "PE021216", physicsStartOrder: 10, physicsEndOrder: 16, chemistryChapterCode: "CP061106", chemistryStartOrder: 13, chemistryEndOrder: 22 },
        { planId: topperId, dayNumber: 10, biologyChapterCode: "BZ121231", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PT121112", physicsStartOrder: 1, physicsEndOrder: 8, chemistryChapterCode: "CI031103", chemistryStartOrder: 1, chemistryEndOrder: 11 },
        { planId: topperId, dayNumber: 11, biologyChapterCode: "BZ021221", biologyStartOrder: 1, biologyEndOrder: 8, physicsChapterCode: "PE041218", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CO091109", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: topperId, dayNumber: 12, biologyChapterCode: "BB101229", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM061106", physicsStartOrder: 1, physicsEndOrder: 14, chemistryChapterCode: "CO091109", chemistryStartOrder: 11, chemistryEndOrder: 20 },
        { planId: topperId, dayNumber: 13, biologyChapterCode: "BB021102", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PM041104", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CI041213", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: topperId, dayNumber: 14, biologyChapterCode: "BB031103", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM051105", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CI041213", chemistryStartOrder: 11, chemistryEndOrder: 19 },
        { planId: topperId, dayNumber: 15, biologyChapterCode: "BZ131232", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM121226", physicsStartOrder: 1, physicsEndOrder: 6, chemistryChapterCode: "CO101219", chemistryStartOrder: 1, chemistryEndOrder: 17 },
        { planId: topperId, dayNumber: 16, biologyChapterCode: "BB061106", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PM031103", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CP031212", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: topperId, dayNumber: 17, biologyChapterCode: "BZ091109", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM071107", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CI051214", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: topperId, dayNumber: 18, biologyChapterCode: "BZ111111", biologyStartOrder: 1, biologyEndOrder: 7, physicsChapterCode: "PO131113", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CP011101", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: topperId, dayNumber: 19, biologyChapterCode: "BZ151115", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PO141114", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CO091218", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: topperId, dayNumber: 20, biologyChapterCode: "BZ131113", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM131227", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP071107", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: topperId, dayNumber: 21, biologyChapterCode: "BZ181118", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE061220", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP051105", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: topperId, dayNumber: 22, biologyChapterCode: "BZ061225", biologyStartOrder: 1, biologyEndOrder: 7, physicsChapterCode: "PE071221", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP051105", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: topperId, dayNumber: 23, biologyChapterCode: "BZ071226", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PO101224", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CO061215", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: topperId, dayNumber: 24, biologyChapterCode: "BZ071107", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PM011101", physicsStartOrder: 1, physicsEndOrder: 4, chemistryChapterCode: "CO061215", chemistryStartOrder: 11, chemistryEndOrder: 17 },
        { planId: topperId, dayNumber: 25, biologyChapterCode: "BB031222", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PE051219", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP011210", chemistryStartOrder: 1, chemistryEndOrder: 13 },
        { planId: topperId, dayNumber: 26, biologyChapterCode: "BB121112", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM021102", physicsStartOrder: 1, physicsEndOrder: 4, chemistryChapterCode: "CP021211", chemistryStartOrder: 1, chemistryEndOrder: 9 },
        { planId: topperId, dayNumber: 27, biologyChapterCode: "BZ141114", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PP081108", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP021211", chemistryStartOrder: 10, chemistryEndOrder: 16 },
        { planId: topperId, dayNumber: 28, biologyChapterCode: "BB161116", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PP091109", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CO071216", chemistryStartOrder: 1, chemistryEndOrder: 9 },
        { planId: topperId, dayNumber: 29, biologyChapterCode: "BZ171117", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PP101110", physicsStartOrder: 1, physicsEndOrder: 11, chemistryChapterCode: "CO071216", chemistryStartOrder: 10, chemistryEndOrder: 16 },
        { planId: topperId, dayNumber: 30, biologyChapterCode: "BB081227", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PE081222", physicsStartOrder: 1, physicsEndOrder: 4, chemistryChapterCode: "BB081227", chemistryStartOrder: 1, chemistryEndOrder: 5 },
    ];
    // Wait, the last row on chemistry has BB081227? Yes, the image has BB081227 under Chemistry for Day 30 Topper.
    // That seems like a typo in the user's excel, but I will ingest what the image says or maybe guess correct? I will transcribe exactly.

    const topperBonuses = [
        { planId: topperId, subject: 'Biology', chapterCode: 'BB011101', startOrder: 1, endOrder: 3 }
    ];

    const challengerDays = [
        { planId: challengerId, dayNumber: 1, biologyChapterCode: "BB051224", biologyStartOrder: 1, biologyEndOrder: 10, physicsChapterCode: "PE031217", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO081217", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: challengerId, dayNumber: 2, biologyChapterCode: "BB041223", biologyStartOrder: 1, biologyEndOrder: 9, physicsChapterCode: "PM141228", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CO081217", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: challengerId, dayNumber: 3, biologyChapterCode: "BB091228", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PO091223", physicsStartOrder: 1, physicsEndOrder: 11, chemistryChapterCode: "CO081108", chemistryStartOrder: 1, chemistryEndOrder: 9 },
        { planId: challengerId, dayNumber: 4, biologyChapterCode: "BZ041104", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PT111111", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO081108", chemistryStartOrder: 10, chemistryEndOrder: 17 },
        { planId: challengerId, dayNumber: 5, biologyChapterCode: "BB111230", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM111225", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP021102", chemistryStartOrder: 1, chemistryEndOrder: 17 },
        { planId: challengerId, dayNumber: 6, biologyChapterCode: "BB051105", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE011215", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CI041104", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: challengerId, dayNumber: 7, biologyChapterCode: "BB081108", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PE011215", physicsStartOrder: 6, physicsEndOrder: 10, chemistryChapterCode: "CI041104", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: challengerId, dayNumber: 8, biologyChapterCode: "BZ101110", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE011215", physicsStartOrder: 11, physicsEndOrder: 14, chemistryChapterCode: "CP061106", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: challengerId, dayNumber: 9, biologyChapterCode: "BB011220", biologyStartOrder: 1, biologyEndOrder: 9, physicsChapterCode: "PE041218", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CP061106", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: challengerId, dayNumber: 10, biologyChapterCode: "BZ121231", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PT121112", physicsStartOrder: 1, physicsEndOrder: 8, chemistryChapterCode: "CI031103", chemistryStartOrder: 1, chemistryEndOrder: 11 },
        { planId: challengerId, dayNumber: 11, biologyChapterCode: "BZ021221", biologyStartOrder: 1, biologyEndOrder: 8, physicsChapterCode: "PE021216", physicsStartOrder: 1, physicsEndOrder: 6, chemistryChapterCode: "CP061106", chemistryStartOrder: 17, chemistryEndOrder: 22 },
        { planId: challengerId, dayNumber: 12, biologyChapterCode: "BB101229", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE021216", physicsStartOrder: 7, physicsEndOrder: 12, chemistryChapterCode: "CO091109", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: challengerId, dayNumber: 13, biologyChapterCode: "BB021102", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PE021216", physicsStartOrder: 13, physicsEndOrder: 16, chemistryChapterCode: "CO091109", chemistryStartOrder: 9, chemistryEndOrder: 15 },
        { planId: challengerId, dayNumber: 14, biologyChapterCode: "BB031103", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM031103", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO091109", chemistryStartOrder: 16, chemistryEndOrder: 20 },
        { planId: challengerId, dayNumber: 15, biologyChapterCode: "BZ131232", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM121226", physicsStartOrder: 1, physicsEndOrder: 6, chemistryChapterCode: "CO101219", chemistryStartOrder: 1, chemistryEndOrder: 17 },
        { planId: challengerId, dayNumber: 16, biologyChapterCode: "BB061106", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PM061106", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CI041213", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: challengerId, dayNumber: 17, biologyChapterCode: "BZ091109", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM061106", physicsStartOrder: 8, physicsEndOrder: 14, chemistryChapterCode: "CI041213", chemistryStartOrder: 11, chemistryEndOrder: 19 },
        { planId: challengerId, dayNumber: 18, biologyChapterCode: "BZ111111", biologyStartOrder: 1, biologyEndOrder: 7, physicsChapterCode: "PM041104", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CP031212", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: challengerId, dayNumber: 19, biologyChapterCode: "BZ151115", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM051105", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CI051214", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: challengerId, dayNumber: 20, biologyChapterCode: "BZ131113", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM131227", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP071107", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: challengerId, dayNumber: 21, biologyChapterCode: "BZ181118", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM071107", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CP011101", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: challengerId, dayNumber: 22, biologyChapterCode: "BZ061225", biologyStartOrder: 1, biologyEndOrder: 7, physicsChapterCode: "PO141114", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CO091218", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: challengerId, dayNumber: 23, biologyChapterCode: "BZ071226", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PO141114", physicsStartOrder: 6, physicsEndOrder: 10, chemistryChapterCode: "CP051105", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: challengerId, dayNumber: 24, biologyChapterCode: "BZ071107", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PO131113", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CP051105", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: challengerId, dayNumber: 25, biologyChapterCode: "BB031222", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PE051219", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP011210", chemistryStartOrder: 1, chemistryEndOrder: 13 },
        { planId: challengerId, dayNumber: 26, biologyChapterCode: "BB121112", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PE061220", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CO061215", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: challengerId, dayNumber: 27, biologyChapterCode: "BZ141114", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PE071221", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CO061215", chemistryStartOrder: 11, chemistryEndOrder: 17 },
        { planId: challengerId, dayNumber: 28, biologyChapterCode: "BB161116", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PO101224", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP021211", chemistryStartOrder: 1, chemistryEndOrder: 9 },
        { planId: challengerId, dayNumber: 29, biologyChapterCode: "BZ171117", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM011101", physicsStartOrder: 1, physicsEndOrder: 4, chemistryChapterCode: "CP021211", chemistryStartOrder: 10, chemistryEndOrder: 16 },
        { planId: challengerId, dayNumber: 30, biologyChapterCode: "BB081227", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM021102", physicsStartOrder: 1, physicsEndOrder: 4, chemistryChapterCode: "BB081227", chemistryStartOrder: 1, chemistryEndOrder: 5 },
    ];

    const challengerBonuses = [
        { planId: challengerId, subject: 'Biology', chapterCode: 'BB011101', startOrder: 1, endOrder: 3 },
        { planId: challengerId, subject: 'Physics', chapterCode: 'PP081108', startOrder: 1, endOrder: 7 },
        { planId: challengerId, subject: 'Physics', chapterCode: 'PP091109', startOrder: 1, endOrder: 10 },
        { planId: challengerId, subject: 'Physics', chapterCode: 'PP101110', startOrder: 1, endOrder: 11 },
        { planId: challengerId, subject: 'Physics', chapterCode: 'PE081222', startOrder: 1, endOrder: 4 },
        { planId: challengerId, subject: 'Chemistry', chapterCode: 'CO071216', startOrder: 1, endOrder: 9 },
        { planId: challengerId, subject: 'Chemistry', chapterCode: 'CO071216', startOrder: 10, endOrder: 16 },
    ];

    const groundbreakerDays = [
        { planId: groundbreakerId, dayNumber: 1, biologyChapterCode: "BB051224", biologyStartOrder: 1, biologyEndOrder: 10, physicsChapterCode: "PE031217", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO081217", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: groundbreakerId, dayNumber: 2, biologyChapterCode: "BB041223", biologyStartOrder: 1, biologyEndOrder: 9, physicsChapterCode: "PM141228", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CO081217", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: groundbreakerId, dayNumber: 3, biologyChapterCode: "BB091228", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PO091223", physicsStartOrder: 1, physicsEndOrder: 11, chemistryChapterCode: "CO081108", chemistryStartOrder: 1, chemistryEndOrder: 9 },
        { planId: groundbreakerId, dayNumber: 4, biologyChapterCode: "BZ041104", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PT111111", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO081108", chemistryStartOrder: 10, chemistryEndOrder: 17 },
        { planId: groundbreakerId, dayNumber: 5, biologyChapterCode: "BB111230", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM111225", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP021102", chemistryStartOrder: 1, chemistryEndOrder: 17 },
        { planId: groundbreakerId, dayNumber: 6, biologyChapterCode: "BB051105", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE011215", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CI041104", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: groundbreakerId, dayNumber: 7, biologyChapterCode: "BB081108", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PE011215", physicsStartOrder: 6, physicsEndOrder: 10, chemistryChapterCode: "CI041104", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: groundbreakerId, dayNumber: 8, biologyChapterCode: "BZ101110", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE011215", physicsStartOrder: 11, physicsEndOrder: 14, chemistryChapterCode: "CP061106", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: groundbreakerId, dayNumber: 9, biologyChapterCode: "BB011220", biologyStartOrder: 1, biologyEndOrder: 9, physicsChapterCode: "PE041218", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CP061106", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: groundbreakerId, dayNumber: 10, biologyChapterCode: "BZ121231", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PT121112", physicsStartOrder: 1, physicsEndOrder: 8, chemistryChapterCode: "CI031103", chemistryStartOrder: 1, chemistryEndOrder: 11 },
        { planId: groundbreakerId, dayNumber: 11, biologyChapterCode: "BZ021221", biologyStartOrder: 1, biologyEndOrder: 8, physicsChapterCode: "PE021216", physicsStartOrder: 1, physicsEndOrder: 6, chemistryChapterCode: "CP061106", chemistryStartOrder: 17, chemistryEndOrder: 22 },
        { planId: groundbreakerId, dayNumber: 12, biologyChapterCode: "BB101229", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE021216", physicsStartOrder: 7, physicsEndOrder: 12, chemistryChapterCode: "CO091109", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: groundbreakerId, dayNumber: 13, biologyChapterCode: "BB021102", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PE021216", physicsStartOrder: 13, physicsEndOrder: 16, chemistryChapterCode: "CO091109", chemistryStartOrder: 9, chemistryEndOrder: 15 },
        { planId: groundbreakerId, dayNumber: 14, biologyChapterCode: "BB031103", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM031103", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CO091109", chemistryStartOrder: 16, chemistryEndOrder: 20 },
        { planId: groundbreakerId, dayNumber: 15, biologyChapterCode: "BZ131232", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM121226", physicsStartOrder: 1, physicsEndOrder: 6, chemistryChapterCode: "CO101219", chemistryStartOrder: 1, chemistryEndOrder: 17 },
        { planId: groundbreakerId, dayNumber: 16, biologyChapterCode: "BB061106", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PM061106", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CI041213", chemistryStartOrder: 1, chemistryEndOrder: 7 },
        { planId: groundbreakerId, dayNumber: 17, biologyChapterCode: "BZ091109", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM061106", physicsStartOrder: 6, physicsEndOrder: 10, chemistryChapterCode: "CI041213", chemistryStartOrder: 8, chemistryEndOrder: 14 },
        { planId: groundbreakerId, dayNumber: 18, biologyChapterCode: "BZ111111", biologyStartOrder: 1, biologyEndOrder: 7, physicsChapterCode: "PM061106", physicsStartOrder: 11, physicsEndOrder: 14, chemistryChapterCode: "CI041213", chemistryStartOrder: 15, chemistryEndOrder: 19 },
        { planId: groundbreakerId, dayNumber: 19, biologyChapterCode: "BZ151115", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM041104", physicsStartOrder: 1, physicsEndOrder: 10, chemistryChapterCode: "CP011101", chemistryStartOrder: 1, chemistryEndOrder: 12 },
        { planId: groundbreakerId, dayNumber: 20, biologyChapterCode: "BZ131113", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM131227", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP071107", chemistryStartOrder: 1, chemistryEndOrder: 10 },
        { planId: groundbreakerId, dayNumber: 21, biologyChapterCode: "BZ181118", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PM051105", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP031212", chemistryStartOrder: 1, chemistryEndOrder: 5 },
        { planId: groundbreakerId, dayNumber: 22, biologyChapterCode: "BZ061225", biologyStartOrder: 1, biologyEndOrder: 7, physicsChapterCode: "PM051105", physicsStartOrder: 6, physicsEndOrder: 10, chemistryChapterCode: "CP031212", chemistryStartOrder: 6, chemistryEndOrder: 10 },
        { planId: groundbreakerId, dayNumber: 23, biologyChapterCode: "BZ071226", biologyStartOrder: 1, biologyEndOrder: 6, physicsChapterCode: "PM071107", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CI051214", chemistryStartOrder: 1, chemistryEndOrder: 6 },
        { planId: groundbreakerId, dayNumber: 24, biologyChapterCode: "BZ071107", biologyStartOrder: 1, biologyEndOrder: 3, physicsChapterCode: "PE061220", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CI051214", chemistryStartOrder: 7, chemistryEndOrder: 12 },
        { planId: groundbreakerId, dayNumber: 25, biologyChapterCode: "BB031222", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PE051219", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CP011210", chemistryStartOrder: 1, chemistryEndOrder: 13 },
        { planId: groundbreakerId, dayNumber: 26, biologyChapterCode: "BB121112", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PO141114", physicsStartOrder: 1, physicsEndOrder: 5, chemistryChapterCode: "CO091218", chemistryStartOrder: 1, chemistryEndOrder: 6 },
        { planId: groundbreakerId, dayNumber: 27, biologyChapterCode: "BZ141114", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PO141114", physicsStartOrder: 6, physicsEndOrder: 10, chemistryChapterCode: "CO091218", chemistryStartOrder: 7, chemistryEndOrder: 12 },
        { planId: groundbreakerId, dayNumber: 28, biologyChapterCode: "BB161116", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PO131113", physicsStartOrder: 1, physicsEndOrder: 9, chemistryChapterCode: "CP051105", chemistryStartOrder: 1, chemistryEndOrder: 8 },
        { planId: groundbreakerId, dayNumber: 29, biologyChapterCode: "BZ171117", biologyStartOrder: 1, biologyEndOrder: 4, physicsChapterCode: "PE071221", physicsStartOrder: 1, physicsEndOrder: 7, chemistryChapterCode: "CP051105", chemistryStartOrder: 9, chemistryEndOrder: 16 },
        { planId: groundbreakerId, dayNumber: 30, biologyChapterCode: "BB081227", biologyStartOrder: 1, biologyEndOrder: 5, physicsChapterCode: "PM021102", physicsStartOrder: 1, physicsEndOrder: 4, chemistryChapterCode: "BB081227", chemistryStartOrder: 1, chemistryEndOrder: 5 },
    ];

    const groundbreakerBonuses = [
        { planId: groundbreakerId, subject: 'Biology', chapterCode: 'BB011101', startOrder: 1, endOrder: 3 },
        { planId: groundbreakerId, subject: 'Physics', chapterCode: 'PP081108', startOrder: 1, endOrder: 7 },
        { planId: groundbreakerId, subject: 'Physics', chapterCode: 'PP091109', startOrder: 1, endOrder: 10 },
        { planId: groundbreakerId, subject: 'Physics', chapterCode: 'PP101110', startOrder: 1, endOrder: 11 },
        { planId: groundbreakerId, subject: 'Physics', chapterCode: 'PE081222', startOrder: 1, endOrder: 4 },
        { planId: groundbreakerId, subject: 'Physics', chapterCode: 'PO101224', startOrder: 1, endOrder: 7 },
        { planId: groundbreakerId, subject: 'Physics', chapterCode: 'PM011101', startOrder: 1, endOrder: 4 },

        { planId: groundbreakerId, subject: 'Chemistry', chapterCode: 'CO071216', startOrder: 1, endOrder: 9 },
        { planId: groundbreakerId, subject: 'Chemistry', chapterCode: 'CO071216', startOrder: 10, endOrder: 16 },
        { planId: groundbreakerId, subject: 'Chemistry', chapterCode: 'CO061215', startOrder: 1, endOrder: 10 },
        { planId: groundbreakerId, subject: 'Chemistry', chapterCode: 'CO061215', startOrder: 11, endOrder: 17 },
        { planId: groundbreakerId, subject: 'Chemistry', chapterCode: 'CP021211', startOrder: 1, endOrder: 9 },
        { planId: groundbreakerId, subject: 'Chemistry', chapterCode: 'CP021211', startOrder: 10, endOrder: 16 },
    ];

    try {
        console.log("Inserting Day data...");
        // Batch inserting arrays
        // Note: For large arrays, a chunker might be needed, but 90 rows is fine.
        await db.insert(sprintPlanDays).values([...topperDays, ...challengerDays, ...groundbreakerDays]);

        console.log("Inserting Bonus data...");
        await db.insert(sprintPlanBonuses).values([...topperBonuses, ...challengerBonuses, ...groundbreakerBonuses]);

        console.log("✅ Seeded 3 Plans, 90 Days, and 21 Bonuses.");
    } catch (error) {
        console.error("❌ Failed to seed sprint plan data: ", error);
    }

    process.exit(0);
}

main().catch(console.error);
