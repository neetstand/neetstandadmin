import * as dotenv from 'dotenv';
import * as path from 'path';
import { eq, and } from 'drizzle-orm';

console.log('Loading Sprint Plans Seeder...');
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
    console.log('Starting Sprint Plans Seeding...');
    
    const { db } = await import('../drizzle/index');
    const { sprintPlans, sprintPlanDays, sprintPlanBonuses } = await import('../drizzle/schema/tables/sprint_plans');

    const fullPlansData = [
  {
    "name": "Topper Plan",
    "description": "Scoring 550 plus and Aiming for 720",
    "isActive": true,
    "days": [
      {
        "dayNumber": 1,
        "physicsChapterCode": "PE031217",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO081217",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB051224",
        "biologyStartOrder": 1,
        "biologyEndOrder": 10
      },
      {
        "dayNumber": 2,
        "physicsChapterCode": "PM141228",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CO081217",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB041223",
        "biologyStartOrder": 1,
        "biologyEndOrder": 9
      },
      {
        "dayNumber": 3,
        "physicsChapterCode": "PO091223",
        "physicsStartOrder": 1,
        "physicsEndOrder": 11,
        "chemistryChapterCode": "CO081108",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 9,
        "biologyChapterCode": "BB091228",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 4,
        "physicsChapterCode": "PT111111",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO081108",
        "chemistryStartOrder": 10,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ041104",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 5,
        "physicsChapterCode": "PM111225",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP021102",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BB111230",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 6,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 1,
        "physicsEndOrder": 8,
        "chemistryChapterCode": "CI041104",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB051105",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 7,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 9,
        "physicsEndOrder": 14,
        "chemistryChapterCode": "CI041104",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB081108",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 8,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ101110",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 9,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 10,
        "physicsEndOrder": 16,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 13,
        "chemistryEndOrder": 22,
        "biologyChapterCode": "BB011220",
        "biologyStartOrder": 1,
        "biologyEndOrder": 9
      },
      {
        "dayNumber": 10,
        "physicsChapterCode": "PT121112",
        "physicsStartOrder": 1,
        "physicsEndOrder": 8,
        "chemistryChapterCode": "CI031103",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 11,
        "biologyChapterCode": "BZ121231",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 11,
        "physicsChapterCode": "PE041218",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ021221",
        "biologyStartOrder": 1,
        "biologyEndOrder": 8
      },
      {
        "dayNumber": 12,
        "physicsChapterCode": "PM061106",
        "physicsStartOrder": 1,
        "physicsEndOrder": 14,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 11,
        "chemistryEndOrder": 20,
        "biologyChapterCode": "BB101229",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 13,
        "physicsChapterCode": "PM041104",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BB021102",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 14,
        "physicsChapterCode": "PM051105",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 11,
        "chemistryEndOrder": 19,
        "biologyChapterCode": "BB031103",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 15,
        "physicsChapterCode": "PM121226",
        "physicsStartOrder": 1,
        "physicsEndOrder": 6,
        "chemistryChapterCode": "CO101219",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ131232",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 16,
        "physicsChapterCode": "PM031103",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CP031212",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BB061106",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 17,
        "physicsChapterCode": "PM071107",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CI051214",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ091109",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 18,
        "physicsChapterCode": "PO131113",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CP011101",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ111111",
        "biologyStartOrder": 1,
        "biologyEndOrder": 7
      },
      {
        "dayNumber": 19,
        "physicsChapterCode": "PO141114",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CO091218",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ151115",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 20,
        "physicsChapterCode": "PM131227",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP071107",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ131113",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 21,
        "physicsChapterCode": "PE061220",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP051105",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BZ181118",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 22,
        "physicsChapterCode": "PE071221",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP051105",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BZ061225",
        "biologyStartOrder": 1,
        "biologyEndOrder": 7
      },
      {
        "dayNumber": 23,
        "physicsChapterCode": "PO101224",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CO061215",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ071226",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 24,
        "physicsChapterCode": "PM011101",
        "physicsStartOrder": 1,
        "physicsEndOrder": 4,
        "chemistryChapterCode": "CO061215",
        "chemistryStartOrder": 11,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ071107",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 25,
        "physicsChapterCode": "PE051219",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP011210",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 13,
        "biologyChapterCode": "BB031222",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 26,
        "physicsChapterCode": "PM021102",
        "physicsStartOrder": 1,
        "physicsEndOrder": 4,
        "chemistryChapterCode": "CP021211",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 9,
        "biologyChapterCode": "BB121112",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 27,
        "physicsChapterCode": "PP081108",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP021211",
        "chemistryStartOrder": 10,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BZ141114",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 28,
        "physicsChapterCode": "PP091109",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CO071216",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 9,
        "biologyChapterCode": "BB161116",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 29,
        "physicsChapterCode": "PP101110",
        "physicsStartOrder": 1,
        "physicsEndOrder": 11,
        "chemistryChapterCode": "CO071216",
        "chemistryStartOrder": 10,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BZ171117",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 30,
        "physicsChapterCode": "PE081222",
        "physicsStartOrder": 1,
        "physicsEndOrder": 4,
        "chemistryChapterCode": "BB081227",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 5,
        "biologyChapterCode": "BB081227",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      }
    ],
    "bonuses": [
      {
        "subject": "Biology",
        "chapterCode": "BB011101",
        "startOrder": 1,
        "endOrder": 3
      }
    ]
  },
  {
    "name": "Challenger Plan",
    "description": "Scoring 400 - 500 and Aiming for 600",
    "isActive": true,
    "days": [
      {
        "dayNumber": 1,
        "physicsChapterCode": "PE031217",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO081217",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB051224",
        "biologyStartOrder": 1,
        "biologyEndOrder": 10
      },
      {
        "dayNumber": 2,
        "physicsChapterCode": "PM141228",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CO081217",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB041223",
        "biologyStartOrder": 1,
        "biologyEndOrder": 9
      },
      {
        "dayNumber": 3,
        "physicsChapterCode": "PO091223",
        "physicsStartOrder": 1,
        "physicsEndOrder": 11,
        "chemistryChapterCode": "CO081108",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 9,
        "biologyChapterCode": "BB091228",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 4,
        "physicsChapterCode": "PT111111",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO081108",
        "chemistryStartOrder": 10,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ041104",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 5,
        "physicsChapterCode": "PM111225",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP021102",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BB111230",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 6,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CI041104",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB051105",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 7,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 6,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CI041104",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB081108",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 8,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 11,
        "physicsEndOrder": 14,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BZ101110",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 9,
        "physicsChapterCode": "PE041218",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB011220",
        "biologyStartOrder": 1,
        "biologyEndOrder": 9
      },
      {
        "dayNumber": 10,
        "physicsChapterCode": "PT121112",
        "physicsStartOrder": 1,
        "physicsEndOrder": 8,
        "chemistryChapterCode": "CI031103",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 11,
        "biologyChapterCode": "BZ121231",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 11,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 1,
        "physicsEndOrder": 6,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 17,
        "chemistryEndOrder": 22,
        "biologyChapterCode": "BZ021221",
        "biologyStartOrder": 1,
        "biologyEndOrder": 8
      },
      {
        "dayNumber": 12,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 7,
        "physicsEndOrder": 12,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB101229",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 13,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 13,
        "physicsEndOrder": 16,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 15,
        "biologyChapterCode": "BB021102",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 14,
        "physicsChapterCode": "PM031103",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 16,
        "chemistryEndOrder": 20,
        "biologyChapterCode": "BB031103",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 15,
        "physicsChapterCode": "PM121226",
        "physicsStartOrder": 1,
        "physicsEndOrder": 6,
        "chemistryChapterCode": "CO101219",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ131232",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 16,
        "physicsChapterCode": "PM061106",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BB061106",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 17,
        "physicsChapterCode": "PM061106",
        "physicsStartOrder": 8,
        "physicsEndOrder": 14,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 11,
        "chemistryEndOrder": 19,
        "biologyChapterCode": "BZ091109",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 18,
        "physicsChapterCode": "PM041104",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CP031212",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ111111",
        "biologyStartOrder": 1,
        "biologyEndOrder": 7
      },
      {
        "dayNumber": 19,
        "physicsChapterCode": "PM051105",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CI051214",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ151115",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 20,
        "physicsChapterCode": "PM131227",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP071107",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ131113",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 21,
        "physicsChapterCode": "PM071107",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CP011101",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ181118",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 22,
        "physicsChapterCode": "PO141114",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CO091218",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ061225",
        "biologyStartOrder": 1,
        "biologyEndOrder": 7
      },
      {
        "dayNumber": 23,
        "physicsChapterCode": "PO141114",
        "physicsStartOrder": 6,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CP051105",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BZ071226",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 24,
        "physicsChapterCode": "PO131113",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CP051105",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BZ071107",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 25,
        "physicsChapterCode": "PE051219",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP011210",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 13,
        "biologyChapterCode": "BB031222",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 26,
        "physicsChapterCode": "PE061220",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CO061215",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BB121112",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 27,
        "physicsChapterCode": "PE071221",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CO061215",
        "chemistryStartOrder": 11,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ141114",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 28,
        "physicsChapterCode": "PO101224",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP021211",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 9,
        "biologyChapterCode": "BB161116",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 29,
        "physicsChapterCode": "PM011101",
        "physicsStartOrder": 1,
        "physicsEndOrder": 4,
        "chemistryChapterCode": "CP021211",
        "chemistryStartOrder": 10,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BZ171117",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 30,
        "physicsChapterCode": "PM021102",
        "physicsStartOrder": 1,
        "physicsEndOrder": 4,
        "chemistryChapterCode": "BB081227",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 5,
        "biologyChapterCode": "BB081227",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      }
    ],
    "bonuses": [
      {
        "subject": "Biology",
        "chapterCode": "BB011101",
        "startOrder": 1,
        "endOrder": 3
      },
      {
        "subject": "Physics",
        "chapterCode": "PP081108",
        "startOrder": 1,
        "endOrder": 7
      },
      {
        "subject": "Physics",
        "chapterCode": "PP091109",
        "startOrder": 1,
        "endOrder": 10
      },
      {
        "subject": "Physics",
        "chapterCode": "PP101110",
        "startOrder": 1,
        "endOrder": 11
      },
      {
        "subject": "Physics",
        "chapterCode": "PE081222",
        "startOrder": 1,
        "endOrder": 4
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CO071216",
        "startOrder": 1,
        "endOrder": 9
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CO071216",
        "startOrder": 10,
        "endOrder": 16
      }
    ]
  },
  {
    "name": "Groundbreaker Plan",
    "description": "Scoring 400 - 500 and Aiming for 600",
    "isActive": true,
    "days": [
      {
        "dayNumber": 1,
        "physicsChapterCode": "PE031217",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO081217",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB051224",
        "biologyStartOrder": 1,
        "biologyEndOrder": 10
      },
      {
        "dayNumber": 2,
        "physicsChapterCode": "PM141228",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CO081217",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB041223",
        "biologyStartOrder": 1,
        "biologyEndOrder": 9
      },
      {
        "dayNumber": 3,
        "physicsChapterCode": "PO091223",
        "physicsStartOrder": 1,
        "physicsEndOrder": 11,
        "chemistryChapterCode": "CO081108",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 9,
        "biologyChapterCode": "BB091228",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 4,
        "physicsChapterCode": "PT111111",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO081108",
        "chemistryStartOrder": 10,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ041104",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 5,
        "physicsChapterCode": "PM111225",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP021102",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BB111230",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 6,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CI041104",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB051105",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 7,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 6,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CI041104",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB081108",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 8,
        "physicsChapterCode": "PE011215",
        "physicsStartOrder": 11,
        "physicsEndOrder": 14,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BZ101110",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 9,
        "physicsChapterCode": "PE041218",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BB011220",
        "biologyStartOrder": 1,
        "biologyEndOrder": 9
      },
      {
        "dayNumber": 10,
        "physicsChapterCode": "PT121112",
        "physicsStartOrder": 1,
        "physicsEndOrder": 8,
        "chemistryChapterCode": "CI031103",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 11,
        "biologyChapterCode": "BZ121231",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 11,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 1,
        "physicsEndOrder": 6,
        "chemistryChapterCode": "CP061106",
        "chemistryStartOrder": 17,
        "chemistryEndOrder": 22,
        "biologyChapterCode": "BZ021221",
        "biologyStartOrder": 1,
        "biologyEndOrder": 8
      },
      {
        "dayNumber": 12,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 7,
        "physicsEndOrder": 12,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB101229",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 13,
        "physicsChapterCode": "PE021216",
        "physicsStartOrder": 13,
        "physicsEndOrder": 16,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 15,
        "biologyChapterCode": "BB021102",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 14,
        "physicsChapterCode": "PM031103",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CO091109",
        "chemistryStartOrder": 16,
        "chemistryEndOrder": 20,
        "biologyChapterCode": "BB031103",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 15,
        "physicsChapterCode": "PM121226",
        "physicsStartOrder": 1,
        "physicsEndOrder": 6,
        "chemistryChapterCode": "CO101219",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 17,
        "biologyChapterCode": "BZ131232",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 16,
        "physicsChapterCode": "PM061106",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 7,
        "biologyChapterCode": "BB061106",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 17,
        "physicsChapterCode": "PM061106",
        "physicsStartOrder": 6,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 8,
        "chemistryEndOrder": 14,
        "biologyChapterCode": "BZ091109",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 18,
        "physicsChapterCode": "PM061106",
        "physicsStartOrder": 11,
        "physicsEndOrder": 14,
        "chemistryChapterCode": "CI041213",
        "chemistryStartOrder": 15,
        "chemistryEndOrder": 19,
        "biologyChapterCode": "BZ111111",
        "biologyStartOrder": 1,
        "biologyEndOrder": 7
      },
      {
        "dayNumber": 19,
        "physicsChapterCode": "PM041104",
        "physicsStartOrder": 1,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CP011101",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ151115",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 20,
        "physicsChapterCode": "PM131227",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP071107",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ131113",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 21,
        "physicsChapterCode": "PM051105",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP031212",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 5,
        "biologyChapterCode": "BZ181118",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 22,
        "physicsChapterCode": "PM051105",
        "physicsStartOrder": 6,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CP031212",
        "chemistryStartOrder": 6,
        "chemistryEndOrder": 10,
        "biologyChapterCode": "BZ061225",
        "biologyStartOrder": 1,
        "biologyEndOrder": 7
      },
      {
        "dayNumber": 23,
        "physicsChapterCode": "PM071107",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CI051214",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 6,
        "biologyChapterCode": "BZ071226",
        "biologyStartOrder": 1,
        "biologyEndOrder": 6
      },
      {
        "dayNumber": 24,
        "physicsChapterCode": "PE061220",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CI051214",
        "chemistryStartOrder": 7,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ071107",
        "biologyStartOrder": 1,
        "biologyEndOrder": 3
      },
      {
        "dayNumber": 25,
        "physicsChapterCode": "PE051219",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CP011210",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 13,
        "biologyChapterCode": "BB031222",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 26,
        "physicsChapterCode": "PO141114",
        "physicsStartOrder": 1,
        "physicsEndOrder": 5,
        "chemistryChapterCode": "CO091218",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 6,
        "biologyChapterCode": "BB121112",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 27,
        "physicsChapterCode": "PO141114",
        "physicsStartOrder": 6,
        "physicsEndOrder": 10,
        "chemistryChapterCode": "CO091218",
        "chemistryStartOrder": 7,
        "chemistryEndOrder": 12,
        "biologyChapterCode": "BZ141114",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      },
      {
        "dayNumber": 28,
        "physicsChapterCode": "PO131113",
        "physicsStartOrder": 1,
        "physicsEndOrder": 9,
        "chemistryChapterCode": "CP051105",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 8,
        "biologyChapterCode": "BB161116",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 29,
        "physicsChapterCode": "PE071221",
        "physicsStartOrder": 1,
        "physicsEndOrder": 7,
        "chemistryChapterCode": "CP051105",
        "chemistryStartOrder": 9,
        "chemistryEndOrder": 16,
        "biologyChapterCode": "BZ171117",
        "biologyStartOrder": 1,
        "biologyEndOrder": 4
      },
      {
        "dayNumber": 30,
        "physicsChapterCode": "PM021102",
        "physicsStartOrder": 1,
        "physicsEndOrder": 4,
        "chemistryChapterCode": "BB081227",
        "chemistryStartOrder": 1,
        "chemistryEndOrder": 5,
        "biologyChapterCode": "BB081227",
        "biologyStartOrder": 1,
        "biologyEndOrder": 5
      }
    ],
    "bonuses": [
      {
        "subject": "Biology",
        "chapterCode": "BB011101",
        "startOrder": 1,
        "endOrder": 3
      },
      {
        "subject": "Physics",
        "chapterCode": "PP081108",
        "startOrder": 1,
        "endOrder": 7
      },
      {
        "subject": "Physics",
        "chapterCode": "PP091109",
        "startOrder": 1,
        "endOrder": 10
      },
      {
        "subject": "Physics",
        "chapterCode": "PP101110",
        "startOrder": 1,
        "endOrder": 11
      },
      {
        "subject": "Physics",
        "chapterCode": "PE081222",
        "startOrder": 1,
        "endOrder": 4
      },
      {
        "subject": "Physics",
        "chapterCode": "PO101224",
        "startOrder": 1,
        "endOrder": 7
      },
      {
        "subject": "Physics",
        "chapterCode": "PM011101",
        "startOrder": 1,
        "endOrder": 4
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CO071216",
        "startOrder": 1,
        "endOrder": 9
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CO071216",
        "startOrder": 10,
        "endOrder": 16
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CO061215",
        "startOrder": 1,
        "endOrder": 10
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CO061215",
        "startOrder": 11,
        "endOrder": 17
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CP021211",
        "startOrder": 1,
        "endOrder": 9
      },
      {
        "subject": "Chemistry",
        "chapterCode": "CP021211",
        "startOrder": 10,
        "endOrder": 16
      }
    ]
  }
];

    try {
        console.log('Processing Plans...');
        for (const planData of fullPlansData) {
            const existingPlans = await db.select().from(sprintPlans).where(eq(sprintPlans.name, planData.name));
            let planId: string;

            if (existingPlans.length > 0) {
                planId = existingPlans[0].id;
                console.log(`Updating existing plan: ${planData.name}`);
                await db.update(sprintPlans).set({
                    description: planData.description,
                    isActive: true,
                    updatedAt: new Date()
                }).where(eq(sprintPlans.id, planId));
            } else {
                console.log(`Inserting new plan: ${planData.name}`);
                const inserted = await db.insert(sprintPlans).values({
                    name: planData.name,
                    description: planData.description,
                    isActive: true
                }).returning({ id: sprintPlans.id });
                planId = inserted[0].id;
            }

            console.log(`Syncing Days for: ${planData.name}`);
            for (const day of planData.days) {
                const existingDay = await db.select().from(sprintPlanDays).where(
                    and(
                        eq(sprintPlanDays.planId, planId),
                        eq(sprintPlanDays.dayNumber, day.dayNumber)
                    )
                );

                if (existingDay.length > 0) {
                    await db.update(sprintPlanDays).set({
                        physicsChapterCode: day.physicsChapterCode,
                        physicsStartOrder: day.physicsStartOrder,
                        physicsEndOrder: day.physicsEndOrder,
                        chemistryChapterCode: day.chemistryChapterCode,
                        chemistryStartOrder: day.chemistryStartOrder,
                        chemistryEndOrder: day.chemistryEndOrder,
                        biologyChapterCode: day.biologyChapterCode,
                        biologyStartOrder: day.biologyStartOrder,
                        biologyEndOrder: day.biologyEndOrder,
                        updatedAt: new Date()
                    }).where(eq(sprintPlanDays.id, existingDay[0].id));
                } else {
                    await db.insert(sprintPlanDays).values({
                        planId: planId,
                        ...day
                    });
                }
            }

            console.log(`Syncing Bonuses for: ${planData.name}`);
            for (const bonus of planData.bonuses) {
                const existingBonus = await db.select().from(sprintPlanBonuses).where(
                    and(
                        eq(sprintPlanBonuses.planId, planId),
                        eq(sprintPlanBonuses.subject, bonus.subject),
                        eq(sprintPlanBonuses.chapterCode, bonus.chapterCode)
                    )
                );

                if (existingBonus.length > 0) {
                    await db.update(sprintPlanBonuses).set({
                        startOrder: bonus.startOrder,
                        endOrder: bonus.endOrder,
                        updatedAt: new Date()
                    }).where(eq(sprintPlanBonuses.id, existingBonus[0].id));
                } else {
                    await db.insert(sprintPlanBonuses).values({
                        planId: planId,
                        ...bonus
                    });
                }
            }
        }
        console.log(`✅ Seeded ${fullPlansData.length} Sprint Plans.`);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
    process.exit(0);
}

main().catch(console.error);
