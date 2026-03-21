import * as dotenv from "dotenv";
import * as path from "path";
import { and, eq } from "drizzle-orm";

console.log("Loading Diagnostic Statement Bank Seeder...");
const envFile = process.env.APP_ENV === "production" ? ".env.production" : ".env.local";
const envPath = path.resolve(process.cwd(), envFile);
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Diagnostic Statement Bank Seeding...");
    
    // Dynamic import to ensure env is loaded before client initialization
    const { db } = await import("../drizzle/index");
    const { diagnosticStatementBank } = await import("../drizzle/schema/tables/diagnostic_statement_bank");

    const fullData = [
  {
    "statement_text": "Sound waves are longitudinal waves.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Acceleration is rate of change of displacement.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Centripetal force acts away from centre.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Action and reaction forces are equal and opposite.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Heat flows from colder body to hotter body.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Gas molecules remain stationary.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 29 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Buoyant force equals weight of displaced fluid.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 16 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse cube law.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 30 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 4 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic theory explains macroscopic gas behaviour.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 26 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Weight equals mass multiplied by gravitational acceleration.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Strain has unit of newton. approximately 39 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic energy equals mv.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton. approximately 18 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Work and heat are modes of energy transfer.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 38 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 8 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 2 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Wave speed equals frequency multiplied by wavelength.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Amplitude is distance travelled in one second.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "Centripetal force acts away from centre. approximately 35 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "Physical quantities are expressed using numerical value and unit.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 20 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Centripetal force acts away from centre. approximately 10 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of length is metre.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 5 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 39 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 9 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force acts between any two masses.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 28 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 10 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 48 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 9 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Dimensional analysis helps check correctness of equations.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Work is product of force and displacement in direction of force.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Amplitude is distance travelled in one second. approximately 22 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 37 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton. approximately 26 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 40 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 23 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Work and heat are modes of energy transfer. approximately 31 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 10 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 14 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Projectile motion occurs under influence of gravity alone.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 48 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 8 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 43 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of velocity with time.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 19 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 29 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 47 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton. approximately 12 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 30 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 32 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic theory explains macroscopic gas behaviour. approximately 35 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 50 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Density equals volume divided by mass.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Displacement is a vector quantity.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 15 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Centripetal force acts away from centre. approximately 3 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "Moment of inertia depends on distribution of mass.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Young's modulus relates stress and strain in solids.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 35 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 22 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of length is metre. approximately 17 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 7 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 23 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 13 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 4 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Temperature measures degree of hotness of a body.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 13 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Gas pressure arises from collisions of molecules with walls.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 27 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 47 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 38 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Force equals mass multiplied by acceleration.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 15 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 35 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 16 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Density equals volume divided by mass. approximately 18 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Uniform motion occurs when velocity remains constant.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 13 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 47 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 19 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Specific heat capacity is heat required per unit mass per degree rise.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Amplitude is distance travelled in one second. approximately 23 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton. approximately 20 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Gas pressure arises from collisions of molecules with walls. approximately 33 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 27 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 18 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 43 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 21 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Elastic materials regain shape after removing force.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 45 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 22 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force multiplied by perpendicular distance.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 44 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 8 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 13 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration due to gravity near Earth is about 9.8 m/s².",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Strain has unit of newton. approximately 17 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration due to gravity near Earth is about 9.8 m/s². approximately 3 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 44 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse square law.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 46 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 11 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 44 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 2 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 4 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Amplitude is distance travelled in one second. approximately 49 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 2 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 20 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Density equals volume divided by mass. approximately 14 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 23 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Velocity in circular motion changes direction continuously.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Amplitude is distance travelled in one second. approximately 35 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of velocity with time. approximately 32 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Density equals volume divided by mass. approximately 44 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 48 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 7 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Strain is ratio of change in dimension to original dimension.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 25 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 26 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Density equals volume divided by mass. approximately 27 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 15 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 7 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Centripetal force acts away from centre. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 7 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Gas pressure arises from collisions of molecules with walls. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 18 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 26 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of velocity with time. approximately 35 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 32 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 37 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 33 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 6 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton. approximately 46 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Simple harmonic motion is periodic motion about equilibrium.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 36 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Centripetal force acts away from centre. approximately 26 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "Displacement is a vector quantity. approximately 41 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Energy can be destroyed in isolated system. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT111111",
    "concept": "Correct concept: Energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Density equals volume divided by mass. approximately 32 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Thermal expansion occurs when temperature increases.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Gas molecules remain stationary. approximately 17 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PT121112",
    "concept": "Correct concept: Gas molecules move randomly.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 40 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 17 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Sound waves are transverse waves. approximately 39 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO141114",
    "concept": "Correct concept: Sound waves in air are longitudinal.",
    "is_correct": false
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 49 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Density equals volume divided by mass. approximately 6 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct concept: Density equals mass divided by volume.",
    "is_correct": false
  },
  {
    "statement_text": "Velocity is rate of change of displacement with time.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Dimensional analysis helps check correctness of equations. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Kinetic energy equals mv. approximately 34 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM051105",
    "concept": "Correct concept: Kinetic energy equals ½mv².",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 41 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 24 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Physical quantities are expressed using numerical value and unit. approximately 29 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Centripetal force acts away from centre. approximately 6 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM031103",
    "concept": "Correct concept: Centripetal force acts toward centre.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 6 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Amplitude is distance travelled in one second. approximately 10 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "Density equals mass divided by volume.",
    "subject": "Physics",
    "topic_id": "PP091109",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 14 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "Strain has unit of newton. approximately 41 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct concept: Strain is dimensionless.",
    "is_correct": false
  },
  {
    "statement_text": "Gravitational force follows inverse cube law. approximately 26 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM071107",
    "concept": "Correct concept: It follows inverse square law.",
    "is_correct": false
  },
  {
    "statement_text": "Elastic materials regain shape after removing force. approximately 23 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP081108",
    "concept": "Correct statement consistent with NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Heat flows from colder body to hotter body. approximately 33 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PP101110",
    "concept": "Correct concept: Heat flows from higher temperature to lower temperature.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 45 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Torque equals force divided by distance. approximately 42 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM061106",
    "concept": "Correct concept: Torque equals force multiplied by perpendicular distance.",
    "is_correct": false
  },
  {
    "statement_text": "Acceleration is rate of change of displacement. approximately 40 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM021102",
    "concept": "Correct concept: Acceleration is rate of change of velocity.",
    "is_correct": false
  },
  {
    "statement_text": "The SI unit of mass is metre. approximately 6 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM011101",
    "concept": "Correct concept: The SI unit of mass is kilogram.",
    "is_correct": false
  },
  {
    "statement_text": "Amplitude is distance travelled in one second. approximately 38 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PO131113",
    "concept": "Correct concept: Amplitude is maximum displacement.",
    "is_correct": false
  },
  {
    "statement_text": "Momentum equals mass divided by velocity. approximately 37 times conceptually observed in physics contexts.",
    "subject": "Physics",
    "topic_id": "PM041104",
    "concept": "Correct concept: Momentum equals mass multiplied by velocity.",
    "is_correct": false
  },
  {
    "statement_text": "AC flows only one direction",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Correct concept: AC reverses direction periodically",
    "is_correct": false
  },
  {
    "statement_text": "p type semiconductor has electrons majority",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Correct concept: holes are majority carriers",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic force acts parallel to velocity",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Correct concept: magnetic force acts perpendicular",
    "is_correct": false
  },
  {
    "statement_text": "p type semiconductor has holes majority carriers",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electromagnetic waves require medium",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Correct concept: EM waves travel in vacuum",
    "is_correct": false
  },
  {
    "statement_text": "Interference occurs only with particles",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Correct concept: interference arises from waves",
    "is_correct": false
  },
  {
    "statement_text": "Electrons occupy discrete energy levels in Bohr model",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Total internal reflection occurs for all angles",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Correct concept: occurs only above critical angle",
    "is_correct": false
  },
  {
    "statement_text": "Parallel plate capacitor stores electric energy",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric field is scalar",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Correct concept: electric field is vector",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic dipole moment measures magnet strength",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "De Broglie proposed only particle nature",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Correct concept: he proposed wave nature of matter",
    "is_correct": false
  },
  {
    "statement_text": "Induced emf appears without flux change",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Correct concept: emf arises from changing magnetic flux",
    "is_correct": false
  },
  {
    "statement_text": "Lorentz force acts on moving charges in magnetic field",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Magnetic field lines never form loops",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Correct concept: field lines form closed loops",
    "is_correct": false
  },
  {
    "statement_text": "Capacitance equals potential divided by charge",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Correct concept: capacitance equals charge divided by potential",
    "is_correct": false
  },
  {
    "statement_text": "Convex lens forms real images",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Nucleus contains electrons",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Correct concept: nucleus contains protons and neutrons",
    "is_correct": false
  },
  {
    "statement_text": "Ohm law relates voltage and current",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electrons have any energy in Bohr model",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Correct concept: electrons occupy discrete energy levels",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic waves propagate in vacuum",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric potential equals work done per unit charge",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Current equals charge multiplied by time",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Correct concept: current equals charge divided by time",
    "is_correct": false
  },
  {
    "statement_text": "Total internal reflection occurs beyond critical angle",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Wave optics explains light as wave",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric power equals voltage times current",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Bohr model explains hydrogen atom spectrum",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Magnetic dipole has north and south poles",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Diffraction occurs when waves bend around obstacles",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Light is electromagnetic wave",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric current equals rate of flow of charge",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Resistance depends on material of conductor",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Nuclear fission releases energy",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "De Broglie proposed wave nature of matter",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electrons show wave behaviour",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Young double slit experiment shows interference",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Right hand rule gives direction of magnetic field",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "RMS value gives effective AC current",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Doping increases semiconductor conductivity",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Changing magnetic flux induces emf",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Mass defect relates to binding energy",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Snell law relates angles of refraction and incidence",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Current carrying wire produces magnetic field",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Capacitance equals charge divided by potential difference",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Induced current opposes cause producing it",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Magnetic field around wire forms circles",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Refraction occurs due to change in speed of light",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "AC generator produces alternating current",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Hydrogen atom spectrum has discrete lines",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Magnetic field lines form closed loops",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Alternating current reverses direction periodically",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Nucleus contains protons and neutrons",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Earth behaves like a giant magnet",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Dielectrics increase capacitance",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric field equals force per unit charge",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electromagnetic waves travel at speed of light",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Faraday law explains electromagnetic induction",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Inductor opposes change in current",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric field lines start on positive charges",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Interference occurs due to superposition of waves",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Radioactivity involves spontaneous decay",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Particle wavelength depends on momentum",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Photoelectric effect shows particle nature of light",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Coulomb law gives force between two charges",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Diodes allow current mainly in one direction",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Lenz law gives direction of induced current",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric charge is conserved in isolated systems",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Semiconductors conductivity lies between conductors and insulators",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric and magnetic fields oscillate perpendicular",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Correct NCERT concept",
    "is_correct": true
  },
  {
    "statement_text": "Electric charge stored on a copper wire is measured in joules.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Joule is the unit of energy, whereas electric charge is measured in coulombs.",
    "is_correct": false
  },
  {
    "statement_text": "Like electric charges on a charged sphere attract each other strongly.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "According to Coulomb’s law, like charges repel and unlike charges attract.",
    "is_correct": false
  },
  {
    "statement_text": "Electric field produced by an electron beam is a scalar quantity without direction.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Electric field is defined as force per unit charge and has both magnitude and direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric potential around a metal plate depends on direction of measurement.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Electric potential is a scalar quantity and does not depend on direction.",
    "is_correct": false
  },
  {
    "statement_text": "Capacitance of a capacitor depends mainly on the potential difference applied to it.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Capacitance depends on geometry of conductors and dielectric medium.",
    "is_correct": false
  },
  {
    "statement_text": "Electric current in a solenoid is produced by flow of protons through the conductor.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "In metallic conductors current is carried by free electrons.",
    "is_correct": false
  },
  {
    "statement_text": "Resistance of a current loop decreases when the length of the conductor increases.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Resistance is directly proportional to length of the conductor.",
    "is_correct": false
  },
  {
    "statement_text": "Ohm's law states that current through a radio antenna is inversely proportional to voltage.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Ohm’s law states that voltage is directly proportional to current for a conductor at constant temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic field lines produced by a prism can intersect each other.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Magnetic field lines never intersect because the field at a point has a unique direction.",
    "is_correct": false
  },
  {
    "statement_text": "Isolated magnetic monopoles exist naturally in magnets like a convex lens.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Magnetic poles always occur in pairs and isolated monopoles have not been observed.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic induction in a diffraction grating occurs even when magnetic flux remains constant.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Induced emf appears only when magnetic flux through a circuit changes.",
    "is_correct": false
  },
  {
    "statement_text": "Induced current in a photoelectric surface always supports the change in magnetic flux.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "According to Lenz’s law, induced current opposes the change in magnetic flux.",
    "is_correct": false
  },
  {
    "statement_text": "Alternating current in a hydrogen atom flows only in one direction.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Alternating current periodically reverses direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic waves produced by a radioactive nucleus require a material medium to travel.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Electromagnetic waves can propagate through vacuum.",
    "is_correct": false
  },
  {
    "statement_text": "Total internal reflection in a transistor circuit occurs when light travels from rarer to denser medium.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Total internal reflection occurs when light travels from denser to rarer medium beyond critical angle.",
    "is_correct": false
  },
  {
    "statement_text": "Convex lenses in an electromagnetic wave always form virtual images irrespective of object position.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Convex lenses form real images when object is placed beyond focal length.",
    "is_correct": false
  },
  {
    "statement_text": "Interference pattern produced by a galvanometer arises due to particle nature of light.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Interference is explained by the wave nature of light.",
    "is_correct": false
  },
  {
    "statement_text": "Photoelectric emission from a copper wire depends only on intensity of incident light.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Photoelectric emission requires light frequency greater than threshold frequency.",
    "is_correct": false
  },
  {
    "statement_text": "Electrons in the hydrogen atom of a charged sphere radiate energy while moving in stationary orbits.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "According to Bohr model electrons in stationary orbits do not radiate energy.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic nucleus in an electron beam contains electrons and neutrons.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Atomic nucleus contains protons and neutrons, while electrons exist outside the nucleus.",
    "is_correct": false
  },
  {
    "statement_text": "Radioactive decay rate of a metal plate depends strongly on temperature and pressure.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Radioactive decay is a nuclear process independent of physical conditions.",
    "is_correct": false
  },
  {
    "statement_text": "Half-life of radioactive material in a capacitor increases when more nuclei are present.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Half-life is constant for a given radioactive isotope.",
    "is_correct": false
  },
  {
    "statement_text": "Intrinsic semiconductors used in a solenoid behave exactly like good conductors.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Intrinsic semiconductors have limited charge carriers.",
    "is_correct": false
  },
  {
    "statement_text": "A diode in a current loop conducts electric current equally in both directions.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "A diode allows current mainly in forward bias direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric charge stored on a radio antenna is measured in joules.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Joule is the unit of energy, whereas electric charge is measured in coulombs.",
    "is_correct": false
  },
  {
    "statement_text": "Like electric charges on a prism attract each other strongly.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "According to Coulomb’s law, like charges repel and unlike charges attract.",
    "is_correct": false
  },
  {
    "statement_text": "Electric field produced by a convex lens is a scalar quantity without direction.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Electric field is defined as force per unit charge and has both magnitude and direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric potential around a diffraction grating depends on direction of measurement.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Electric potential is a scalar quantity and does not depend on direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric current in a hydrogen atom is produced by flow of protons through the conductor.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "In metallic conductors current is carried by free electrons.",
    "is_correct": false
  },
  {
    "statement_text": "Resistance of a radioactive nucleus decreases when the length of the conductor increases.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Resistance is directly proportional to length of the conductor.",
    "is_correct": false
  },
  {
    "statement_text": "Ohm's law states that current through a p–n junction diode is inversely proportional to voltage.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Ohm’s law states that voltage is directly proportional to current for a conductor at constant temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic field lines produced by a transistor circuit can intersect each other.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Magnetic field lines never intersect because the field at a point has a unique direction.",
    "is_correct": false
  },
  {
    "statement_text": "Isolated magnetic monopoles exist naturally in magnets like an electromagnetic wave.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Magnetic poles always occur in pairs and isolated monopoles have not been observed.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic induction in a galvanometer occurs even when magnetic flux remains constant.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Induced emf appears only when magnetic flux through a circuit changes.",
    "is_correct": false
  },
  {
    "statement_text": "Induced current in a copper wire always supports the change in magnetic flux.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "According to Lenz’s law, induced current opposes the change in magnetic flux.",
    "is_correct": false
  },
  {
    "statement_text": "Alternating current in a charged sphere flows only in one direction.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Alternating current periodically reverses direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic waves produced by an electron beam require a material medium to travel.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Electromagnetic waves can propagate through vacuum.",
    "is_correct": false
  },
  {
    "statement_text": "Mirrors used in a metal plate form images due to refraction of light.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Mirrors form images due to reflection of light.",
    "is_correct": false
  },
  {
    "statement_text": "Total internal reflection in a capacitor occurs when light travels from rarer to denser medium.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Total internal reflection occurs when light travels from denser to rarer medium beyond critical angle.",
    "is_correct": false
  },
  {
    "statement_text": "Convex lenses in a solenoid always form virtual images irrespective of object position.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Convex lenses form real images when object is placed beyond focal length.",
    "is_correct": false
  },
  {
    "statement_text": "Interference pattern produced by a current loop arises due to particle nature of light.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Interference is explained by the wave nature of light.",
    "is_correct": false
  },
  {
    "statement_text": "Photoelectric emission from a radio antenna depends only on intensity of incident light.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Photoelectric emission requires light frequency greater than threshold frequency.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic nucleus in a convex lens contains electrons and neutrons.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Atomic nucleus contains protons and neutrons, while electrons exist outside the nucleus.",
    "is_correct": false
  },
  {
    "statement_text": "Radioactive decay rate of a diffraction grating depends strongly on temperature and pressure.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Radioactive decay is a nuclear process independent of physical conditions.",
    "is_correct": false
  },
  {
    "statement_text": "Half-life of radioactive material in a photoelectric surface increases when more nuclei are present.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Half-life is constant for a given radioactive isotope.",
    "is_correct": false
  },
  {
    "statement_text": "Intrinsic semiconductors used in a hydrogen atom behave exactly like good conductors.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Intrinsic semiconductors have limited charge carriers.",
    "is_correct": false
  },
  {
    "statement_text": "A diode in a radioactive nucleus conducts electric current equally in both directions.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "A diode allows current mainly in forward bias direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric charge stored on a p–n junction diode is measured in joules.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Joule is the unit of energy, whereas electric charge is measured in coulombs.",
    "is_correct": false
  },
  {
    "statement_text": "Like electric charges on a transistor circuit attract each other strongly.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "According to Coulomb’s law, like charges repel and unlike charges attract.",
    "is_correct": false
  },
  {
    "statement_text": "Electric field produced by an electromagnetic wave is a scalar quantity without direction.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Electric field is defined as force per unit charge and has both magnitude and direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric potential around a galvanometer depends on direction of measurement.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Electric potential is a scalar quantity and does not depend on direction.",
    "is_correct": false
  },
  {
    "statement_text": "Capacitance of a copper wire depends mainly on the potential difference applied to it.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Capacitance depends on geometry of conductors and dielectric medium.",
    "is_correct": false
  },
  {
    "statement_text": "Electric current in a charged sphere is produced by flow of protons through the conductor.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "In metallic conductors current is carried by free electrons.",
    "is_correct": false
  },
  {
    "statement_text": "Resistance of an electron beam decreases when the length of the conductor increases.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Resistance is directly proportional to length of the conductor.",
    "is_correct": false
  },
  {
    "statement_text": "Ohm's law states that current through a metal plate is inversely proportional to voltage.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Ohm’s law states that voltage is directly proportional to current for a conductor at constant temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic field lines produced by a capacitor can intersect each other.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Magnetic field lines never intersect because the field at a point has a unique direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic induction in a current loop occurs even when magnetic flux remains constant.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Induced emf appears only when magnetic flux through a circuit changes.",
    "is_correct": false
  },
  {
    "statement_text": "Induced current in a radio antenna always supports the change in magnetic flux.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "According to Lenz’s law, induced current opposes the change in magnetic flux.",
    "is_correct": false
  },
  {
    "statement_text": "Alternating current in a prism flows only in one direction.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Alternating current periodically reverses direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic waves produced by a convex lens require a material medium to travel.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Electromagnetic waves can propagate through vacuum.",
    "is_correct": false
  },
  {
    "statement_text": "Mirrors used in a diffraction grating form images due to refraction of light.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Mirrors form images due to reflection of light.",
    "is_correct": false
  },
  {
    "statement_text": "Total internal reflection in a photoelectric surface occurs when light travels from rarer to denser medium.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Total internal reflection occurs when light travels from denser to rarer medium beyond critical angle.",
    "is_correct": false
  },
  {
    "statement_text": "Convex lenses in a hydrogen atom always form virtual images irrespective of object position.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Convex lenses form real images when object is placed beyond focal length.",
    "is_correct": false
  },
  {
    "statement_text": "Interference pattern produced by a radioactive nucleus arises due to particle nature of light.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Interference is explained by the wave nature of light.",
    "is_correct": false
  },
  {
    "statement_text": "Photoelectric emission from a p–n junction diode depends only on intensity of incident light.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Photoelectric emission requires light frequency greater than threshold frequency.",
    "is_correct": false
  },
  {
    "statement_text": "Electrons in the hydrogen atom of a transistor circuit radiate energy while moving in stationary orbits.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "According to Bohr model electrons in stationary orbits do not radiate energy.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic nucleus in an electromagnetic wave contains electrons and neutrons.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Atomic nucleus contains protons and neutrons, while electrons exist outside the nucleus.",
    "is_correct": false
  },
  {
    "statement_text": "Radioactive decay rate of a galvanometer depends strongly on temperature and pressure.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Radioactive decay is a nuclear process independent of physical conditions.",
    "is_correct": false
  },
  {
    "statement_text": "Half-life of radioactive material in a copper wire increases when more nuclei are present.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Half-life is constant for a given radioactive isotope.",
    "is_correct": false
  },
  {
    "statement_text": "Intrinsic semiconductors used in a charged sphere behave exactly like good conductors.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Intrinsic semiconductors have limited charge carriers.",
    "is_correct": false
  },
  {
    "statement_text": "Electric charge stored on a metal plate is measured in joules.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Joule is the unit of energy, whereas electric charge is measured in coulombs.",
    "is_correct": false
  },
  {
    "statement_text": "Like electric charges on a capacitor attract each other strongly.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "According to Coulomb’s law, like charges repel and unlike charges attract.",
    "is_correct": false
  },
  {
    "statement_text": "Electric field produced by a solenoid is a scalar quantity without direction.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Electric field is defined as force per unit charge and has both magnitude and direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric potential around a current loop depends on direction of measurement.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Electric potential is a scalar quantity and does not depend on direction.",
    "is_correct": false
  },
  {
    "statement_text": "Capacitance of a radio antenna depends mainly on the potential difference applied to it.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Capacitance depends on geometry of conductors and dielectric medium.",
    "is_correct": false
  },
  {
    "statement_text": "Electric current in a prism is produced by flow of protons through the conductor.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "In metallic conductors current is carried by free electrons.",
    "is_correct": false
  },
  {
    "statement_text": "Resistance of a convex lens decreases when the length of the conductor increases.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Resistance is directly proportional to length of the conductor.",
    "is_correct": false
  },
  {
    "statement_text": "Ohm's law states that current through a diffraction grating is inversely proportional to voltage.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Ohm’s law states that voltage is directly proportional to current for a conductor at constant temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic field lines produced by a photoelectric surface can intersect each other.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Magnetic field lines never intersect because the field at a point has a unique direction.",
    "is_correct": false
  },
  {
    "statement_text": "Isolated magnetic monopoles exist naturally in magnets like a hydrogen atom.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Magnetic poles always occur in pairs and isolated monopoles have not been observed.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic induction in a radioactive nucleus occurs even when magnetic flux remains constant.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Induced emf appears only when magnetic flux through a circuit changes.",
    "is_correct": false
  },
  {
    "statement_text": "Induced current in a p–n junction diode always supports the change in magnetic flux.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "According to Lenz’s law, induced current opposes the change in magnetic flux.",
    "is_correct": false
  },
  {
    "statement_text": "Alternating current in a transistor circuit flows only in one direction.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Alternating current periodically reverses direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic waves produced by an electromagnetic wave require a material medium to travel.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Electromagnetic waves can propagate through vacuum.",
    "is_correct": false
  },
  {
    "statement_text": "Total internal reflection in a copper wire occurs when light travels from rarer to denser medium.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Total internal reflection occurs when light travels from denser to rarer medium beyond critical angle.",
    "is_correct": false
  },
  {
    "statement_text": "Convex lenses in a charged sphere always form virtual images irrespective of object position.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Convex lenses form real images when object is placed beyond focal length.",
    "is_correct": false
  },
  {
    "statement_text": "Interference pattern produced by an electron beam arises due to particle nature of light.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Interference is explained by the wave nature of light.",
    "is_correct": false
  },
  {
    "statement_text": "Photoelectric emission from a metal plate depends only on intensity of incident light.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Photoelectric emission requires light frequency greater than threshold frequency.",
    "is_correct": false
  },
  {
    "statement_text": "Electrons in the hydrogen atom of a capacitor radiate energy while moving in stationary orbits.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "According to Bohr model electrons in stationary orbits do not radiate energy.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic nucleus in a solenoid contains electrons and neutrons.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Atomic nucleus contains protons and neutrons, while electrons exist outside the nucleus.",
    "is_correct": false
  },
  {
    "statement_text": "Radioactive decay rate of a current loop depends strongly on temperature and pressure.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "Radioactive decay is a nuclear process independent of physical conditions.",
    "is_correct": false
  },
  {
    "statement_text": "Half-life of radioactive material in a radio antenna increases when more nuclei are present.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Half-life is constant for a given radioactive isotope.",
    "is_correct": false
  },
  {
    "statement_text": "Intrinsic semiconductors used in a prism behave exactly like good conductors.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Intrinsic semiconductors have limited charge carriers.",
    "is_correct": false
  },
  {
    "statement_text": "A diode in a convex lens conducts electric current equally in both directions.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "A diode allows current mainly in forward bias direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric charge stored on a diffraction grating is measured in joules.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Joule is the unit of energy, whereas electric charge is measured in coulombs.",
    "is_correct": false
  },
  {
    "statement_text": "Like electric charges on a photoelectric surface attract each other strongly.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "According to Coulomb’s law, like charges repel and unlike charges attract.",
    "is_correct": false
  },
  {
    "statement_text": "Electric field produced by a hydrogen atom is a scalar quantity without direction.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Electric field is defined as force per unit charge and has both magnitude and direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric potential around a radioactive nucleus depends on direction of measurement.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Electric potential is a scalar quantity and does not depend on direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electric current in a transistor circuit is produced by flow of protons through the conductor.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "In metallic conductors current is carried by free electrons.",
    "is_correct": false
  },
  {
    "statement_text": "Resistance of an electromagnetic wave decreases when the length of the conductor increases.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Resistance is directly proportional to length of the conductor.",
    "is_correct": false
  },
  {
    "statement_text": "Ohm's law states that current through a galvanometer is inversely proportional to voltage.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Ohm’s law states that voltage is directly proportional to current for a conductor at constant temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Magnetic field lines produced by a copper wire can intersect each other.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Magnetic field lines never intersect because the field at a point has a unique direction.",
    "is_correct": false
  },
  {
    "statement_text": "Isolated magnetic monopoles exist naturally in magnets like a charged sphere.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "Magnetic poles always occur in pairs and isolated monopoles have not been observed.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic induction in an electron beam occurs even when magnetic flux remains constant.",
    "subject": "Physics",
    "topic_id": "PE061220",
    "concept": "Induced emf appears only when magnetic flux through a circuit changes.",
    "is_correct": false
  },
  {
    "statement_text": "Induced current in a metal plate always supports the change in magnetic flux.",
    "subject": "Physics",
    "topic_id": "PE071221",
    "concept": "According to Lenz’s law, induced current opposes the change in magnetic flux.",
    "is_correct": false
  },
  {
    "statement_text": "Alternating current in a capacitor flows only in one direction.",
    "subject": "Physics",
    "topic_id": "PE081222",
    "concept": "Alternating current periodically reverses direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electromagnetic waves produced by a solenoid require a material medium to travel.",
    "subject": "Physics",
    "topic_id": "PO091223",
    "concept": "Electromagnetic waves can propagate through vacuum.",
    "is_correct": false
  },
  {
    "statement_text": "Mirrors used in a current loop form images due to refraction of light.",
    "subject": "Physics",
    "topic_id": "PO101224",
    "concept": "Mirrors form images due to reflection of light.",
    "is_correct": false
  },
  {
    "statement_text": "Total internal reflection in a radio antenna occurs when light travels from rarer to denser medium.",
    "subject": "Physics",
    "topic_id": "PM111225",
    "concept": "Total internal reflection occurs when light travels from denser to rarer medium beyond critical angle.",
    "is_correct": false
  },
  {
    "statement_text": "Convex lenses in a prism always form virtual images irrespective of object position.",
    "subject": "Physics",
    "topic_id": "PM121226",
    "concept": "Convex lenses form real images when object is placed beyond focal length.",
    "is_correct": false
  },
  {
    "statement_text": "Interference pattern produced by a convex lens arises due to particle nature of light.",
    "subject": "Physics",
    "topic_id": "PM131227",
    "concept": "Interference is explained by the wave nature of light.",
    "is_correct": false
  },
  {
    "statement_text": "Photoelectric emission from a diffraction grating depends only on intensity of incident light.",
    "subject": "Physics",
    "topic_id": "PM141228",
    "concept": "Photoelectric emission requires light frequency greater than threshold frequency.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic nucleus in a hydrogen atom contains electrons and neutrons.",
    "subject": "Physics",
    "topic_id": "PE011215",
    "concept": "Atomic nucleus contains protons and neutrons, while electrons exist outside the nucleus.",
    "is_correct": false
  },
  {
    "statement_text": "Radioactive decay rate of a radioactive nucleus depends strongly on temperature and pressure.",
    "subject": "Physics",
    "topic_id": "PE021216",
    "concept": "Radioactive decay is a nuclear process independent of physical conditions.",
    "is_correct": false
  },
  {
    "statement_text": "Half-life of radioactive material in a p–n junction diode increases when more nuclei are present.",
    "subject": "Physics",
    "topic_id": "PE031217",
    "concept": "Half-life is constant for a given radioactive isotope.",
    "is_correct": false
  },
  {
    "statement_text": "Intrinsic semiconductors used in a transistor circuit behave exactly like good conductors.",
    "subject": "Physics",
    "topic_id": "PE041218",
    "concept": "Intrinsic semiconductors have limited charge carriers.",
    "is_correct": false
  },
  {
    "statement_text": "A diode in an electromagnetic wave conducts electric current equally in both directions.",
    "subject": "Physics",
    "topic_id": "PE051219",
    "concept": "A diode allows current mainly in forward bias direction.",
    "is_correct": false
  },
  {
    "statement_text": "Electronegativity of elements always increases when moving down a group in the periodic table.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Electronegativity generally decreases down a group because atomic size increases and nuclear attraction for bonding electrons decreases.",
    "is_correct": false
  },
  {
    "statement_text": "All alkali metals possess extremely high ionisation enthalpy similar to noble gases.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Alkali metals have very low ionisation enthalpy because they lose their outer electron easily.",
    "is_correct": false
  },
  {
    "statement_text": "Every element present in the p‑block of the periodic table is a metal.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "The p‑block contains metals, metalloids and non‑metals.",
    "is_correct": false
  },
  {
    "statement_text": "Electronegativity generally decreases down a group in the periodic table.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Electronegativity generally decreases down a group because atomic size increases and nuclear attraction for bonding electrons decreases.",
    "is_correct": true
  },
  {
    "statement_text": "Alkali metals have low ionisation enthalpy and readily lose one electron to form cations.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Alkali metals have very low ionisation enthalpy because they lose their outer electron easily.",
    "is_correct": true
  },
  {
    "statement_text": "Hydrogen exists as single atoms under normal conditions.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct concept: Hydrogen exists as diatomic molecules (H2).",
    "is_correct": false
  },
  {
    "statement_text": "Electronegativity generally increases across a period.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Classification of Elements & Periodicity'.",
    "is_correct": true
  },
  {
    "statement_text": "Alkali metals are non‑reactive.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct concept: Alkali metals are highly reactive elements.",
    "is_correct": false
  },
  {
    "statement_text": "Alkaline earth metals belong to group 2.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 's-Block Elements'.",
    "is_correct": true
  },
  {
    "statement_text": "Atomic radius generally decreases across a period.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Classification of Elements & Periodicity'.",
    "is_correct": true
  },
  {
    "statement_text": "Carbon is a group 14 element.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'p-Block Elements (Group 13 & 14)'.",
    "is_correct": true
  },
  {
    "statement_text": "Boron belongs to group 13.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'p-Block Elements (Group 13 & 14)'.",
    "is_correct": true
  },
  {
    "statement_text": "Hydrogen forms hydrides with many elements.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrogen'.",
    "is_correct": true
  },
  {
    "statement_text": "Elements in the same group have similar chemical properties.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Classification of Elements & Periodicity'.",
    "is_correct": true
  },
  {
    "statement_text": "Hydrogen is the most abundant element in the universe.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrogen'.",
    "is_correct": true
  },
  {
    "statement_text": "Aluminium commonly shows +3 oxidation state.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'p-Block Elements (Group 13 & 14)'.",
    "is_correct": true
  },
  {
    "statement_text": "Alkali metals belong to group 1 of the periodic table.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 's-Block Elements'.",
    "is_correct": true
  },
  {
    "statement_text": "Ionization energy generally increases across a period.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Classification of Elements & Periodicity'.",
    "is_correct": true
  },
  {
    "statement_text": "Every p‑block element including iodine behaves as a typical metal.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "p‑Block contains metals, metalloids and non‑metals.",
    "is_correct": false
  },
  {
    "statement_text": "Every p‑block element including sulfur behaves as a typical metal.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "p‑Block contains metals, metalloids and non‑metals.",
    "is_correct": false
  },
  {
    "statement_text": "Every p‑block element including magnesium behaves as a typical metal.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "p‑Block contains metals, metalloids and non‑metals.",
    "is_correct": false
  },
  {
    "statement_text": "p‑Block elements show wide variation including metals, metalloids and non‑metals.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "p‑Block contains metals, metalloids and non‑metals.",
    "is_correct": true
  },
  {
    "statement_text": "Oxygen is a member of group 16 elements.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Halogens belong to group 1.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct concept: Halogens belong to group 17.",
    "is_correct": false
  },
  {
    "statement_text": "p-Block elements occupy groups 13 to 18.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Halogens belong to group 17 of periodic table.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Noble gases belong to group 18.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Nitrogen can exhibit oxidation state +5.",
    "subject": "Chemistry",
    "topic_id": "CI031103",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Ionic bonds are produced when atoms share electrons equally between them.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Sharing of electrons results in covalent bonding, while ionic bonding occurs through transfer of electrons.",
    "is_correct": false
  },
  {
    "statement_text": "Covalent bonding occurs when one atom completely transfers electrons to another atom.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Complete transfer of electrons leads to ionic bonding, not covalent bonding.",
    "is_correct": false
  },
  {
    "statement_text": "Hybridisation takes place only in isolated atoms and never during bond formation.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Hybridisation occurs during bond formation to explain molecular geometry.",
    "is_correct": false
  },
  {
    "statement_text": "Increasing bond order always decreases the stability of a molecule.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Higher bond order generally corresponds to stronger bonds and greater stability.",
    "is_correct": false
  },
  {
    "statement_text": "Ionic bonds are formed by transfer of electrons from one atom to another creating oppositely charged ions.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Sharing of electrons results in covalent bonding, while ionic bonding occurs through transfer of electrons.",
    "is_correct": true
  },
  {
    "statement_text": "Covalent bonds are formed when two atoms share one or more pairs of electrons.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Complete transfer of electrons leads to ionic bonding, not covalent bonding.",
    "is_correct": true
  },
  {
    "statement_text": "Greater bond order generally increases bond strength and molecular stability.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Higher bond order generally corresponds to stronger bonds and greater stability.",
    "is_correct": true
  },
  {
    "statement_text": "Ionic bonds involve sharing of electrons.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "Correct concept: Ionic bonds involve transfer of electrons between atoms.",
    "is_correct": false
  },
  {
    "statement_text": "Hydrogen gas is diatomic.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrogen'.",
    "is_correct": true
  },
  {
    "statement_text": "Covalent bonds involve sharing of electron pairs.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Chemical Bonding & Molecular Structure'.",
    "is_correct": true
  },
  {
    "statement_text": "Group 14 elements form covalent compounds.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'p-Block Elements (Group 13 & 14)'.",
    "is_correct": true
  },
  {
    "statement_text": "Ionic bonds are formed by transfer of electrons.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Chemical Bonding & Molecular Structure'.",
    "is_correct": true
  },
  {
    "statement_text": "Compounds of alkali metals are usually ionic.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 's-Block Elements'.",
    "is_correct": true
  },
  {
    "statement_text": "Sigma bonds are formed by head-on overlap of orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Chemical Bonding & Molecular Structure'.",
    "is_correct": true
  },
  {
    "statement_text": "Alkali metals are highly reactive.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 's-Block Elements'.",
    "is_correct": true
  },
  {
    "statement_text": "Covalent bonding is common in organic compounds.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Organic Chemistry - GOC'.",
    "is_correct": true
  },
  {
    "statement_text": "VSEPR theory predicts molecular shapes.",
    "subject": "Chemistry",
    "topic_id": "CI041104",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Chemical Bonding & Molecular Structure'.",
    "is_correct": true
  },
  {
    "statement_text": "Every p‑block element including copper behaves as a typical metal.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "p‑Block contains metals, metalloids and non‑metals.",
    "is_correct": false
  },
  {
    "statement_text": "All d‑block elements including zinc have completely filled d orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Most d‑block elements have partially filled d orbitals.",
    "is_correct": false
  },
  {
    "statement_text": "Increasing temperature always decreases the rate of reactions involving zinc compounds.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Higher temperature increases molecular kinetic energy and usually increases reaction rate.",
    "is_correct": false
  },
  {
    "statement_text": "All d‑block elements including nitrogen have completely filled d orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Most d‑block elements have partially filled d orbitals.",
    "is_correct": false
  },
  {
    "statement_text": "All d‑block elements including phosphorus have completely filled d orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Most d‑block elements have partially filled d orbitals.",
    "is_correct": false
  },
  {
    "statement_text": "All d‑block elements including calcium have completely filled d orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Most d‑block elements have partially filled d orbitals.",
    "is_correct": false
  },
  {
    "statement_text": "d‑Block elements generally possess partially filled d orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Most d‑block elements have partially filled d orbitals.",
    "is_correct": true
  },
  {
    "statement_text": "Transition metals have completely filled d orbitals.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Correct concept: Transition metals have partially filled d orbitals.",
    "is_correct": false
  },
  {
    "statement_text": "Transition metal complexes are often coloured.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Many transition metals show variable oxidation states.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Lanthanoid contraction affects atomic radii trends.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "d-block metals frequently form coordination compounds.",
    "subject": "Chemistry",
    "topic_id": "CI041213",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Coordination number of complexes containing chlorine refers to the number of metal atoms present.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Coordination number counts ligand donor atoms bonded to the metal.",
    "is_correct": false
  },
  {
    "statement_text": "Coordination number of complexes containing oxygen refers to the number of metal atoms present.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Coordination number counts ligand donor atoms bonded to the metal.",
    "is_correct": false
  },
  {
    "statement_text": "Coordination number of complexes containing sodium refers to the number of metal atoms present.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Coordination number counts ligand donor atoms bonded to the metal.",
    "is_correct": false
  },
  {
    "statement_text": "Coordination number of complexes containing aluminium refers to the number of metal atoms present.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Coordination number counts ligand donor atoms bonded to the metal.",
    "is_correct": false
  },
  {
    "statement_text": "Coordination number equals the number of ligand atoms bonded to the central metal.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Coordination number counts ligand donor atoms bonded to the metal.",
    "is_correct": true
  },
  {
    "statement_text": "Medicines act selectively to treat disease.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Drugs act selectively on particular biological targets.",
    "is_correct": true
  },
  {
    "statement_text": "Ligands accept electrons from metal.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Correct concept: Ligands donate electron pairs.",
    "is_correct": false
  },
  {
    "statement_text": "Central metal atom forms coordinate bonds with ligands.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Ligands donate lone pair electrons to metal ions.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Coordination number equals number of donor atoms.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Complex ions consist of metal surrounded by ligands.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Werner proposed coordination theory of complexes.",
    "subject": "Chemistry",
    "topic_id": "CI051214",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Haloalkanes containing bromine atoms consist only of carbon and hydrogen atoms.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Haloalkanes contain halogen atoms bonded to carbon.",
    "is_correct": false
  },
  {
    "statement_text": "Haloalkanes containing carbon atoms consist only of carbon and hydrogen atoms.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Haloalkanes contain halogen atoms bonded to carbon.",
    "is_correct": false
  },
  {
    "statement_text": "Haloalkanes containing potassium atoms consist only of carbon and hydrogen atoms.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Haloalkanes contain halogen atoms bonded to carbon.",
    "is_correct": false
  },
  {
    "statement_text": "Haloalkanes containing iron atoms consist only of carbon and hydrogen atoms.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Haloalkanes contain halogen atoms bonded to carbon.",
    "is_correct": false
  },
  {
    "statement_text": "Haloalkanes are hydrocarbons where halogen atoms replace hydrogen.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Haloalkanes contain halogen atoms bonded to carbon.",
    "is_correct": true
  },
  {
    "statement_text": "Aryl halides have halogen attached to aromatic ring.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Haloalkanes have halogen attached to sp2 carbon.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Correct concept: Haloalkanes attach halogen to sp3 carbon.",
    "is_correct": false
  },
  {
    "statement_text": "Haloalkanes contain halogen bonded to sp3 carbon.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Nucleophilic substitution commonly occurs in haloalkanes.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Grignard reagents form from alkyl halides and magnesium.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Carbon–halogen bond polarity affects reactivity.",
    "subject": "Chemistry",
    "topic_id": "CO061215",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Alcohols derived from iodine compounds behave as strong acids in water.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Alcohols are weak acids compared with mineral acids.",
    "is_correct": false
  },
  {
    "statement_text": "Alcohols derived from sulfur compounds behave as strong acids in water.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Alcohols are weak acids compared with mineral acids.",
    "is_correct": false
  },
  {
    "statement_text": "Alcohols derived from magnesium compounds behave as strong acids in water.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Alcohols are weak acids compared with mineral acids.",
    "is_correct": false
  },
  {
    "statement_text": "Alcohols exhibit weak acidic character.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Alcohols are weak acids compared with mineral acids.",
    "is_correct": true
  },
  {
    "statement_text": "Alcohol molecules contain hydroxyl functional group.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Alcohols lack oxygen atoms.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Correct concept: Alcohols contain –OH group.",
    "is_correct": false
  },
  {
    "statement_text": "Alcohol oxidation can produce aldehydes or ketones.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Phenols possess hydroxyl group attached to benzene ring.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Ethers contain oxygen linking two carbon groups.",
    "subject": "Chemistry",
    "topic_id": "CO071216",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Organic compounds must always contain oxygen atoms in their structure.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "Many organic compounds such as hydrocarbons contain only carbon and hydrogen.",
    "is_correct": false
  },
  {
    "statement_text": "Members of a homologous series always differ by a CH₃ group.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "Successive members of a homologous series differ by a CH₂ unit.",
    "is_correct": false
  },
  {
    "statement_text": "Benzene consists of three independent double bonds that do not interact with each other.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "Benzene has delocalised π electrons distributed over the ring due to resonance.",
    "is_correct": false
  },
  {
    "statement_text": "Organic compounds are primarily compounds of carbon and may or may not contain oxygen.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "Many organic compounds such as hydrocarbons contain only carbon and hydrogen.",
    "is_correct": true
  },
  {
    "statement_text": "Members of a homologous series differ from each other by a CH₂ group.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "Successive members of a homologous series differ by a CH₂ unit.",
    "is_correct": true
  },
  {
    "statement_text": "Organic compounds are mainly ionic.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "Correct concept: Most organic compounds contain covalent bonds.",
    "is_correct": false
  },
  {
    "statement_text": "Isomerism refers to compounds having same formula but different structures.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Organic Chemistry - GOC'.",
    "is_correct": true
  },
  {
    "statement_text": "Organic reactions often involve electron pair movement.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Organic Chemistry - GOC'.",
    "is_correct": true
  },
  {
    "statement_text": "Functional groups determine properties of organic molecules.",
    "subject": "Chemistry",
    "topic_id": "CO081108",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Organic Chemistry - GOC'.",
    "is_correct": true
  },
  {
    "statement_text": "All ketones and aldehydes containing nitrogen give positive Tollens' test.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Tollens reagent oxidizes aldehydes but usually not ketones.",
    "is_correct": false
  },
  {
    "statement_text": "Carboxylic acids formed from oxygen compounds are weaker acids than alcohols.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Carboxylate ion is resonance stabilised making acids stronger than alcohols.",
    "is_correct": false
  },
  {
    "statement_text": "All ketones and aldehydes containing phosphorus give positive Tollens' test.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Tollens reagent oxidizes aldehydes but usually not ketones.",
    "is_correct": false
  },
  {
    "statement_text": "Carboxylic acids formed from sodium compounds are weaker acids than alcohols.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Carboxylate ion is resonance stabilised making acids stronger than alcohols.",
    "is_correct": false
  },
  {
    "statement_text": "All ketones and aldehydes containing calcium give positive Tollens' test.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Tollens reagent oxidizes aldehydes but usually not ketones.",
    "is_correct": false
  },
  {
    "statement_text": "Carboxylic acids formed from aluminium compounds are weaker acids than alcohols.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Carboxylate ion is resonance stabilised making acids stronger than alcohols.",
    "is_correct": false
  },
  {
    "statement_text": "All ketones and aldehydes containing zinc give positive Tollens' test.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Tollens reagent oxidizes aldehydes but usually not ketones.",
    "is_correct": false
  },
  {
    "statement_text": "Carboxylic acids formed from chlorine compounds are weaker acids than alcohols.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Carboxylate ion is resonance stabilised making acids stronger than alcohols.",
    "is_correct": false
  },
  {
    "statement_text": "Aldehydes give positive Tollens test while ketones generally do not.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Tollens reagent oxidizes aldehydes but usually not ketones.",
    "is_correct": true
  },
  {
    "statement_text": "Carboxylic acids are stronger acids than alcohols.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Carboxylate ion is resonance stabilised making acids stronger than alcohols.",
    "is_correct": true
  },
  {
    "statement_text": "Aldehydes contain terminal carbonyl group –CHO.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Ketones contain –COOH group.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Correct concept: Carboxylic acids contain –COOH.",
    "is_correct": false
  },
  {
    "statement_text": "Carboxylic acids contain –COOH functional group.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Carboxylic acids react with alcohols to form esters.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Ketones possess carbonyl group within carbon chain.",
    "subject": "Chemistry",
    "topic_id": "CO081217",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "All hydrocarbons contain at least one carbon–carbon double bond.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "Alkanes are hydrocarbons containing only single bonds between carbon atoms.",
    "is_correct": false
  },
  {
    "statement_text": "Hydrocarbons may contain single, double or triple bonds depending on their type.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "Alkanes are hydrocarbons containing only single bonds between carbon atoms.",
    "is_correct": true
  },
  {
    "statement_text": "Alkanes contain carbon–carbon double bonds.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "Correct concept: Alkanes contain only single bonds between carbon atoms.",
    "is_correct": false
  },
  {
    "statement_text": "Alkenes contain at least one double bond.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrocarbons'.",
    "is_correct": true
  },
  {
    "statement_text": "Alkynes contain a carbon–carbon triple bond.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrocarbons'.",
    "is_correct": true
  },
  {
    "statement_text": "Alkanes contain only single bonds.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrocarbons'.",
    "is_correct": true
  },
  {
    "statement_text": "Aromatic hydrocarbons contain benzene rings.",
    "subject": "Chemistry",
    "topic_id": "CO091109",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrocarbons'.",
    "is_correct": true
  },
  {
    "statement_text": "Amines containing carbon atoms cannot accept protons in aqueous solution.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Nitrogen atom has lone pair enabling amines to accept protons.",
    "is_correct": false
  },
  {
    "statement_text": "Amines containing potassium atoms cannot accept protons in aqueous solution.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Nitrogen atom has lone pair enabling amines to accept protons.",
    "is_correct": false
  },
  {
    "statement_text": "Amines containing iron atoms cannot accept protons in aqueous solution.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Nitrogen atom has lone pair enabling amines to accept protons.",
    "is_correct": false
  },
  {
    "statement_text": "Amines containing bromine atoms cannot accept protons in aqueous solution.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Nitrogen atom has lone pair enabling amines to accept protons.",
    "is_correct": false
  },
  {
    "statement_text": "Amines behave as bases and can accept protons.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Nitrogen atom has lone pair enabling amines to accept protons.",
    "is_correct": true
  },
  {
    "statement_text": "Amines behave as strong acids.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Correct concept: Amines are basic.",
    "is_correct": false
  },
  {
    "statement_text": "Amines form ammonium salts with acids.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Aromatic amines undergo diazotization reactions.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Amines show basic character due to lone pair.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Primary amines contain one alkyl or aryl group.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Amines are organic derivatives of ammonia.",
    "subject": "Chemistry",
    "topic_id": "CO091218",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Proteins present in systems containing sulfur are polymers made of glucose molecules.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Proteins consist of amino acid units linked by peptide bonds.",
    "is_correct": false
  },
  {
    "statement_text": "Polymers containing phosphorus atoms are produced only by natural biological processes.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Many polymers are synthetic materials prepared industrially.",
    "is_correct": false
  },
  {
    "statement_text": "Medicines containing sodium cure diseases by destroying every cell in the body.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Drugs act selectively on particular biological targets.",
    "is_correct": false
  },
  {
    "statement_text": "Proteins present in systems containing magnesium are polymers made of glucose molecules.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Proteins consist of amino acid units linked by peptide bonds.",
    "is_correct": false
  },
  {
    "statement_text": "Polymers containing calcium atoms are produced only by natural biological processes.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Many polymers are synthetic materials prepared industrially.",
    "is_correct": false
  },
  {
    "statement_text": "Proteins present in systems containing copper are polymers made of glucose molecules.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Proteins consist of amino acid units linked by peptide bonds.",
    "is_correct": false
  },
  {
    "statement_text": "Polymers containing zinc atoms are produced only by natural biological processes.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Many polymers are synthetic materials prepared industrially.",
    "is_correct": false
  },
  {
    "statement_text": "Proteins present in systems containing iodine are polymers made of glucose molecules.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Proteins consist of amino acid units linked by peptide bonds.",
    "is_correct": false
  },
  {
    "statement_text": "Polymers containing nitrogen atoms are produced only by natural biological processes.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Many polymers are synthetic materials prepared industrially.",
    "is_correct": false
  },
  {
    "statement_text": "Proteins are polymers of amino acids.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Proteins consist of amino acid units linked by peptide bonds.",
    "is_correct": true
  },
  {
    "statement_text": "Polymers may be natural or synthetic.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Many polymers are synthetic materials prepared industrially.",
    "is_correct": true
  },
  {
    "statement_text": "Polymers have very small molecular mass.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct concept: Polymers have very high molecular mass.",
    "is_correct": false
  },
  {
    "statement_text": "Proteins are polymers of fatty acids.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct concept: Proteins are polymers of amino acids.",
    "is_correct": false
  },
  {
    "statement_text": "Polymers are macromolecules made from repeating units.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Proteins consist of long chains of amino acids.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Vitamins are essential organic micronutrients.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Condensation polymerization eliminates small molecules.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Glucose is classified as a monosaccharide.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "DNA stores hereditary information.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Enzymes accelerate biochemical reactions.",
    "subject": "Chemistry",
    "topic_id": "CO101219",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 3 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic number of carbon is equal to the number of neutrons present in its nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Atomic number represents the number of protons in the nucleus, not the number of neutrons.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 28 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic number of sodium is equal to the number of neutrons present in its nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Atomic number represents the number of protons in the nucleus, not the number of neutrons.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 53 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic number of sulfur is equal to the number of neutrons present in its nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Atomic number represents the number of protons in the nucleus, not the number of neutrons.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 78 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 103 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 128 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 153 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 178 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 203 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 228 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Activation energy is minimum energy needed for reaction.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 253 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 278 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 303 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 328 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 353 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 378 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 403 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 428 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 453 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Molar mass of every chemical compound is always exactly 478 g mol⁻¹ regardless of its formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": false
  },
  {
    "statement_text": "Atomic number of an element is equal to the number of protons present in its nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Atomic number represents the number of protons in the nucleus, not the number of neutrons.",
    "is_correct": true
  },
  {
    "statement_text": "Molar mass of a compound equals the sum of atomic masses of all atoms present in its molecular formula.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "Molar mass depends on the molecular formula and is calculated by adding atomic masses of all atoms in the compound.",
    "is_correct": true
  },
  {
    "statement_text": "p‑block elements include metals, metalloids and non‑metals.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "The p‑block contains metals, metalloids and non‑metals.",
    "is_correct": true
  },
  {
    "statement_text": "One mole of a substance contains Avogadro number of particles.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Some Basic Concepts of Chemistry'.",
    "is_correct": true
  },
  {
    "statement_text": "Water is a compound of hydrogen and oxygen.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Hydrogen'.",
    "is_correct": true
  },
  {
    "statement_text": "Stoichiometry deals with quantitative relationships in chemical reactions.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Some Basic Concepts of Chemistry'.",
    "is_correct": true
  },
  {
    "statement_text": "Molar mass is the mass of one mole of a substance.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Some Basic Concepts of Chemistry'.",
    "is_correct": true
  },
  {
    "statement_text": "The law of conservation of mass states that mass is neither created nor destroyed.",
    "subject": "Chemistry",
    "topic_id": "CP011101",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Some Basic Concepts of Chemistry'.",
    "is_correct": true
  },
  {
    "statement_text": "A liquid boils when its vapour pressure equals the external pressure.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Boiling occurs when vapour pressure of the liquid becomes equal to the external atmospheric pressure.",
    "is_correct": true
  },
  {
    "statement_text": "Molarity of a solution containing potassium ions does not change with temperature.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Molarity depends on volume of solution which changes with temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Molarity of a solution containing iron ions does not change with temperature.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Molarity depends on volume of solution which changes with temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Molarity of a solution containing bromine ions does not change with temperature.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Molarity depends on volume of solution which changes with temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Molarity of a solution containing carbon ions does not change with temperature.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Molarity depends on volume of solution which changes with temperature.",
    "is_correct": false
  },
  {
    "statement_text": "Molarity changes with temperature because solution volume changes.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Molarity depends on volume of solution which changes with temperature.",
    "is_correct": true
  },
  {
    "statement_text": "Mole fraction depends on temperature of solution.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Correct concept: Mole fraction depends only on moles of components.",
    "is_correct": false
  },
  {
    "statement_text": "Molarity equals moles of solute divided by litres of solution.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Colligative properties depend on number of solute particles present.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Raoult’s law relates vapour pressure with mole fraction of solvent.",
    "subject": "Chemistry",
    "topic_id": "CP011210",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Atomic number of hydrogen is equal to the number of neutrons present in its nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "Atomic number represents the number of protons in the nucleus, not the number of neutrons.",
    "is_correct": false
  },
  {
    "statement_text": "According to quantum mechanics electrons in atoms revolve in fixed circular orbits like planets.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "Quantum mechanics describes electrons in orbitals with probability distributions, not fixed circular paths.",
    "is_correct": false
  },
  {
    "statement_text": "According to quantum mechanics electrons occupy orbitals where the probability of finding an electron is highest.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "Quantum mechanics describes electrons in orbitals with probability distributions, not fixed circular paths.",
    "is_correct": true
  },
  {
    "statement_text": "Bohr proposed that electrons move in fixed energy levels.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Structure of Atom'.",
    "is_correct": true
  },
  {
    "statement_text": "Electrons are located inside the nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "Correct concept: Electrons occupy orbitals around the nucleus, not inside it.",
    "is_correct": false
  },
  {
    "statement_text": "Electrons occupy orbitals around the nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Structure of Atom'.",
    "is_correct": true
  },
  {
    "statement_text": "The atomic number equals the number of protons in the nucleus.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Structure of Atom'.",
    "is_correct": true
  },
  {
    "statement_text": "Orbitals represent regions of high probability of finding electrons.",
    "subject": "Chemistry",
    "topic_id": "CP021102",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Structure of Atom'.",
    "is_correct": true
  },
  {
    "statement_text": "Electrolytes containing magnesium conduct electricity in the solid state through free electrons.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Electrolytic conduction occurs due to movement of ions in molten or aqueous state.",
    "is_correct": false
  },
  {
    "statement_text": "Electrical conductivity of solutions containing potassium ions decreases when ion concentration increases.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "More ions generally increase conductivity.",
    "is_correct": false
  },
  {
    "statement_text": "Electrolytes containing copper conduct electricity in the solid state through free electrons.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Electrolytic conduction occurs due to movement of ions in molten or aqueous state.",
    "is_correct": false
  },
  {
    "statement_text": "Electrical conductivity of solutions containing iron ions decreases when ion concentration increases.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "More ions generally increase conductivity.",
    "is_correct": false
  },
  {
    "statement_text": "Electrolytes containing iodine conduct electricity in the solid state through free electrons.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Electrolytic conduction occurs due to movement of ions in molten or aqueous state.",
    "is_correct": false
  },
  {
    "statement_text": "Electrical conductivity of solutions containing bromine ions decreases when ion concentration increases.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "More ions generally increase conductivity.",
    "is_correct": false
  },
  {
    "statement_text": "Electrolytes containing sulfur conduct electricity in the solid state through free electrons.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Electrolytic conduction occurs due to movement of ions in molten or aqueous state.",
    "is_correct": false
  },
  {
    "statement_text": "Electrical conductivity of solutions containing carbon ions decreases when ion concentration increases.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "More ions generally increase conductivity.",
    "is_correct": false
  },
  {
    "statement_text": "Electrolytes conduct electricity through movement of ions.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Electrolytic conduction occurs due to movement of ions in molten or aqueous state.",
    "is_correct": true
  },
  {
    "statement_text": "Conductivity usually increases with increasing ion concentration.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "More ions generally increase conductivity.",
    "is_correct": true
  },
  {
    "statement_text": "Electrolysis requires electrical energy to drive reactions.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Standard electrode potential indicates reduction tendency.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Galvanic cells convert chemical energy into electrical energy.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Oxidation takes place at the anode of an electrochemical cell.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Reduction occurs at the cathode during electrochemical reactions.",
    "subject": "Chemistry",
    "topic_id": "CP021211",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Increasing temperature always decreases the rate of reactions involving covalent compounds.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Higher temperature increases molecular kinetic energy and usually increases reaction rate.",
    "is_correct": false
  },
  {
    "statement_text": "Adding a catalyst to reactions involving magnesium reduces activation energy to zero.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Catalysts lower activation energy but do not eliminate it.",
    "is_correct": false
  },
  {
    "statement_text": "Colloidal particles containing calcium settle rapidly under gravity like ordinary precipitates.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Colloidal particles remain suspended due to Brownian motion.",
    "is_correct": false
  },
  {
    "statement_text": "Adding a catalyst to reactions involving copper reduces activation energy to zero.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Catalysts lower activation energy but do not eliminate it.",
    "is_correct": false
  },
  {
    "statement_text": "Increasing temperature always decreases the rate of reactions involving nitrogen compounds.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Higher temperature increases molecular kinetic energy and usually increases reaction rate.",
    "is_correct": false
  },
  {
    "statement_text": "Adding a catalyst to reactions involving iodine reduces activation energy to zero.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Catalysts lower activation energy but do not eliminate it.",
    "is_correct": false
  },
  {
    "statement_text": "Increasing temperature always decreases the rate of reactions involving phosphorus compounds.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Higher temperature increases molecular kinetic energy and usually increases reaction rate.",
    "is_correct": false
  },
  {
    "statement_text": "Adding a catalyst to reactions involving sulfur reduces activation energy to zero.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Catalysts lower activation energy but do not eliminate it.",
    "is_correct": false
  },
  {
    "statement_text": "Reaction rate generally increases with temperature.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Higher temperature increases molecular kinetic energy and usually increases reaction rate.",
    "is_correct": true
  },
  {
    "statement_text": "Catalysts reduce activation energy but it remains greater than zero.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Catalysts lower activation energy but do not eliminate it.",
    "is_correct": true
  },
  {
    "statement_text": "Catalysts increase activation energy.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Correct concept: Catalysts decrease activation energy.",
    "is_correct": false
  },
  {
    "statement_text": "Reaction rate usually increases when temperature increases.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Rate law relates reaction rate with reactant concentrations.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Catalysts lower activation energy of chemical reactions.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "Order of reaction must be determined experimentally.",
    "subject": "Chemistry",
    "topic_id": "CP031212",
    "concept": "Correct NCERT concept.",
    "is_correct": true
  },
  {
    "statement_text": "An ideal gas is defined as a gas with very strong intermolecular attractions.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "The ideal gas model assumes intermolecular forces between gas molecules are negligible.",
    "is_correct": false
  },
  {
    "statement_text": "The pressure of a gas becomes zero whenever its temperature increases at constant volume.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "According to Gay‑Lussac's law, pressure increases with temperature at constant volume.",
    "is_correct": false
  },
  {
    "statement_text": "Entropy of an isolated system decreases during every spontaneous chemical process.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "The second law of thermodynamics states that entropy of an isolated system increases in spontaneous processes.",
    "is_correct": false
  },
  {
    "statement_text": "An ideal gas is a hypothetical gas in which intermolecular forces are negligible and molecules occupy negligible volume.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "The ideal gas model assumes intermolecular forces between gas molecules are negligible.",
    "is_correct": true
  },
  {
    "statement_text": "At constant volume, pressure of a gas is directly proportional to its absolute temperature.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "According to Gay‑Lussac's law, pressure increases with temperature at constant volume.",
    "is_correct": true
  },
  {
    "statement_text": "Entropy of an isolated system increases during spontaneous processes.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "The second law of thermodynamics states that entropy of an isolated system increases in spontaneous processes.",
    "is_correct": true
  },
  {
    "statement_text": "Energy can be destroyed in chemical reactions.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "Correct concept: According to the first law of thermodynamics, energy is conserved.",
    "is_correct": false
  },
  {
    "statement_text": "Boyle’s law states that pressure is inversely proportional to volume at constant temperature.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'States of Matter'.",
    "is_correct": true
  },
  {
    "statement_text": "Exothermic reactions release heat.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Thermodynamics'.",
    "is_correct": true
  },
  {
    "statement_text": "Gases are incompressible like solids.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "Correct concept: Gases are highly compressible due to large intermolecular spaces.",
    "is_correct": false
  },
  {
    "statement_text": "Intermolecular forces affect physical properties of liquids.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'States of Matter'.",
    "is_correct": true
  },
  {
    "statement_text": "Gases are highly compressible compared to solids.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'States of Matter'.",
    "is_correct": true
  },
  {
    "statement_text": "Energy can neither be created nor destroyed according to the first law of thermodynamics.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Thermodynamics'.",
    "is_correct": true
  },
  {
    "statement_text": "Charles’ law states that volume is proportional to temperature at constant pressure.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'States of Matter'.",
    "is_correct": true
  },
  {
    "statement_text": "Endothermic reactions absorb heat.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Thermodynamics'.",
    "is_correct": true
  },
  {
    "statement_text": "Enthalpy change represents heat absorbed or released at constant pressure.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Thermodynamics'.",
    "is_correct": true
  },
  {
    "statement_text": "In crystalline solids such as those containing sodium, the arrangement of particles is completely random like in liquids.",
    "subject": "Chemistry",
    "topic_id": "CP051105",
    "concept": "Crystalline solids have long‑range order with particles arranged in a repeating lattice.",
    "is_correct": false
  },
  {
    "statement_text": "A chemical reaction at equilibrium stops completely and no molecules react further.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Chemical equilibrium is dynamic where forward and reverse reactions continue at equal rates.",
    "is_correct": false
  },
  {
    "statement_text": "A catalyst increases the equilibrium constant value of the reaction it catalyses.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Catalysts change the rate of reaction but do not change the equilibrium constant or equilibrium composition.",
    "is_correct": false
  },
  {
    "statement_text": "Boiling of a liquid occurs when its vapour pressure becomes zero.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Boiling occurs when vapour pressure of the liquid becomes equal to the external atmospheric pressure.",
    "is_correct": false
  },
  {
    "statement_text": "Acids release hydroxide ions when dissolved in water.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Hydroxide ions are produced by bases, not acids.",
    "is_correct": false
  },
  {
    "statement_text": "Bases donate protons to other chemical species in aqueous solution.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Proton donation is the property of acids according to Brønsted–Lowry theory.",
    "is_correct": false
  },
  {
    "statement_text": "At equilibrium forward and reverse reactions occur at equal rates while concentrations remain constant.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Chemical equilibrium is dynamic where forward and reverse reactions continue at equal rates.",
    "is_correct": true
  },
  {
    "statement_text": "A catalyst speeds up attainment of equilibrium without changing the equilibrium constant.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Catalysts change the rate of reaction but do not change the equilibrium constant or equilibrium composition.",
    "is_correct": true
  },
  {
    "statement_text": "According to Arrhenius theory acids release hydrogen ions (H⁺) in aqueous solution.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Hydroxide ions are produced by bases, not acids.",
    "is_correct": true
  },
  {
    "statement_text": "Bases accept protons (H⁺) according to Brønsted–Lowry theory.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Proton donation is the property of acids according to Brønsted–Lowry theory.",
    "is_correct": true
  },
  {
    "statement_text": "Le Chatelier’s principle predicts the effect of changes in conditions.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Equilibrium'.",
    "is_correct": true
  },
  {
    "statement_text": "In dynamic equilibrium the forward and reverse reactions occur at equal rates.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Equilibrium'.",
    "is_correct": true
  },
  {
    "statement_text": "Equilibrium can exist in reversible reactions.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Equilibrium'.",
    "is_correct": true
  },
  {
    "statement_text": "The equilibrium constant depends on temperature.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Equilibrium'.",
    "is_correct": true
  },
  {
    "statement_text": "Alcohols derived from copper compounds behave as strong acids in water.",
    "subject": "Chemistry",
    "topic_id": "CP061106",
    "concept": "Alcohols are weak acids compared with mineral acids.",
    "is_correct": false
  },
  {
    "statement_text": "Oxidation is defined as the gain of electrons by a chemical species.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Gain of electrons corresponds to reduction, not oxidation.",
    "is_correct": false
  },
  {
    "statement_text": "Reduction is defined as the loss of electrons during a chemical reaction.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Loss of electrons corresponds to oxidation.",
    "is_correct": false
  },
  {
    "statement_text": "Oxidation is defined as loss of electrons by a chemical species.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Gain of electrons corresponds to reduction, not oxidation.",
    "is_correct": true
  },
  {
    "statement_text": "Reduction is defined as gain of electrons during a chemical reaction.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Loss of electrons corresponds to oxidation.",
    "is_correct": true
  },
  {
    "statement_text": "Hybridisation is the mixing of atomic orbitals during bond formation to form hybrid orbitals.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Hybridisation occurs during bond formation to explain molecular geometry.",
    "is_correct": true
  },
  {
    "statement_text": "Reduction means loss of electrons.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Correct concept: Reduction is gain of electrons, while oxidation is loss of electrons.",
    "is_correct": false
  },
  {
    "statement_text": "An oxidizing agent accepts electrons.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Redox Reactions'.",
    "is_correct": true
  },
  {
    "statement_text": "A reducing agent donates electrons.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Redox Reactions'.",
    "is_correct": true
  },
  {
    "statement_text": "Oxidation involves loss of electrons.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Redox Reactions'.",
    "is_correct": true
  },
  {
    "statement_text": "Reduction involves gain of electrons.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "This statement correctly represents a concept from the NCERT Class 11 Chemistry chapter 'Redox Reactions'.",
    "is_correct": true
  },
  {
    "statement_text": "Reduction occurs at anode in galvanic cell.",
    "subject": "Chemistry",
    "topic_id": "CP071107",
    "concept": "Correct concept: Reduction occurs at cathode.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in humans always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in flowering plants are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in bacteria occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in fungi occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by algae increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in protozoa are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in angiosperms occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in gymnosperms is different for every species.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in insects creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for mammals diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in birds.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in amphibians refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in fish biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in viruses biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of yeast always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of rice plants depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing maize plants is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing humans obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing flowering plants refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of bacteria increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting fungi increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting algae decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in protozoa always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in angiosperms are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in gymnosperms occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in insects occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by mammals increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in birds are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in amphibians occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in fish is different for every species.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in viruses creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for yeast diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in rice plants.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in maize plants refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in humans biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in flowering plants biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of bacteria always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of fungi depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing algae is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing protozoa obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing angiosperms refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of gymnosperms increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting insects increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting mammals decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in birds always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in amphibians are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in fish occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in viruses occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by yeast increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in rice plants are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in maize plants occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in humans is different for every species.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in flowering plants creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for bacteria diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in fungi.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in algae refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in protozoa biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in angiosperms biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of gymnosperms always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of insects depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing mammals is cyclic.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing birds obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing amphibians refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of fish increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting viruses increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting yeast decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in rice plants always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in maize plants are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in humans occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in flowering plants occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by bacteria increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in fungi are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in algae occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in protozoa is different for every species.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in angiosperms creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for gymnosperms diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in insects.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in mammals refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in birds biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in amphibians biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of fish always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of viruses depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing yeast is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing rice plants obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing maize plants refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of humans increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting flowering plants increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting bacteria decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in fungi always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in algae are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in protozoa occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in angiosperms occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by gymnosperms increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in insects are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in mammals occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in birds is different for every species.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in amphibians creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for fish diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in viruses.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in yeast refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in rice plants biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in maize plants biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of humans always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of flowering plants depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing bacteria is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing fungi obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing algae refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of protozoa increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting angiosperms increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting gymnosperms decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in insects always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in mammals are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in birds occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in amphibians occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by fish increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in viruses are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in yeast occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in rice plants is different for every species.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in maize plants creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for humans diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in bacteria refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in fungi biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in algae biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of protozoa always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of angiosperms depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing gymnosperms is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing insects obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing mammals refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of birds increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting amphibians increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting fish decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in viruses always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in yeast are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in rice plants occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in maize plants occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by humans increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in flowering plants are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in bacteria occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in fungi is different for every species.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in algae creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for protozoa diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in angiosperms.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in gymnosperms refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in insects biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in mammals biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of birds always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of amphibians depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing fish is cyclic.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing viruses obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing yeast refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of rice plants increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting maize plants increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting humans decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in flowering plants always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in bacteria are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in fungi occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in algae occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by protozoa increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in angiosperms are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in gymnosperms occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in insects is different for every species.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in mammals creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for birds diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in amphibians.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in fish refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in viruses biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in yeast biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of rice plants always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of maize plants depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing humans is cyclic.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing flowering plants obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing bacteria refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of fungi increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting algae increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting protozoa decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in angiosperms always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in gymnosperms are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in insects occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in mammals occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by birds increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in amphibians are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in fish occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in viruses is different for every species.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in yeast creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for rice plants diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in maize plants.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in humans refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in flowering plants biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in bacteria biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of fungi always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of algae depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing protozoa is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing angiosperms obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing gymnosperms refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of insects increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting mammals increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting birds decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in amphibians always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in fish are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in viruses occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in yeast occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by rice plants increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in maize plants are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in humans occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in flowering plants is different for every species.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in bacteria creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for fungi diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in algae.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in protozoa refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in angiosperms biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in gymnosperms biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of insects always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of mammals depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing birds is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing amphibians obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing fish refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of viruses increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting yeast increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting rice plants decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in maize plants always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in humans are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in flowering plants occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in bacteria occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by fungi increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in algae are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in protozoa occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in angiosperms is different for every species.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in gymnosperms creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for insects diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in mammals.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in birds refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in amphibians biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in fish biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of viruses always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of yeast depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing rice plants is cyclic.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing maize plants obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing humans refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of flowering plants increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting bacteria increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting fungi decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in algae always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in protozoa are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in angiosperms occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in gymnosperms occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by insects increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in mammals are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in birds occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in amphibians is different for every species.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in fish creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for viruses diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in yeast.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in rice plants refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in maize plants biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in humans biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of flowering plants always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of bacteria depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing fungi is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing algae obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing protozoa refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of angiosperms increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting gymnosperms increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting insects decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in mammals always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in birds are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in amphibians occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in fish occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by viruses increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in yeast are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in rice plants occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in maize plants is different for every species.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in humans creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for flowering plants diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in bacteria.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in fungi refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in algae biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in protozoa biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of angiosperms always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of gymnosperms depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing insects is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing mammals obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing birds refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of amphibians increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting fish increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting viruses decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in yeast always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in rice plants are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in maize plants occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in humans occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by flowering plants increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in bacteria are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in fungi occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in algae is different for every species.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in protozoa creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for angiosperms diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in gymnosperms.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in insects refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in mammals biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in birds biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of amphibians always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of fish depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing viruses is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing yeast obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing rice plants refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of maize plants increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting humans increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting flowering plants decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in bacteria always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in fungi are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in algae occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in protozoa occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by angiosperms increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in gymnosperms are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in insects occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in mammals is different for every species.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in birds creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for amphibians diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in fish.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in viruses refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in yeast biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in rice plants biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of maize plants always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of humans depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing flowering plants is cyclic.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing bacteria obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing fungi refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of algae increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting protozoa increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting angiosperms decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in gymnosperms always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in insects are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in mammals occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in birds occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by amphibians increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in fish are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in viruses occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in yeast is different for every species.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in rice plants creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for maize plants diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in humans.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in flowering plants refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in bacteria biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in fungi biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of algae always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of protozoa depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing angiosperms is cyclic.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing gymnosperms obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing insects refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of mammals increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting birds increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting amphibians decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Reproduction in fish always produces genetically identical offspring.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": false
  },
  {
    "statement_text": "Pollen grains in viruses are produced inside the ovary.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": false
  },
  {
    "statement_text": "Fertilisation in yeast occurs outside the ovule in flowering plants.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": false
  },
  {
    "statement_text": "Spermatogenesis in rice plants occurs in the prostate gland.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": false
  },
  {
    "statement_text": "All contraceptive methods used by maize plants increase fertility rates.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": false
  },
  {
    "statement_text": "Dominant alleles in humans are always more common in a population.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": false
  },
  {
    "statement_text": "DNA replication in flowering plants occurs only during protein synthesis.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": false
  },
  {
    "statement_text": "Genetic code in bacteria is different for every species.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": false
  },
  {
    "statement_text": "Natural selection in fungi creates new variations directly.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": false
  },
  {
    "statement_text": "Vaccines used for algae diseases contain fully virulent pathogens.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": false
  },
  {
    "statement_text": "Antibiotics are effective against viral infections in protozoa.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": false
  },
  {
    "statement_text": "Mycorrhiza in angiosperms refers to association between bacteria and animals.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": false
  },
  {
    "statement_text": "PCR in gymnosperms biotechnology is used mainly to destroy DNA.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Restriction enzymes in insects biotechnology synthesize DNA molecules.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": false
  },
  {
    "statement_text": "Transgenic crops of mammals always produce vitamins instead of proteins.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": false
  },
  {
    "statement_text": "Population density of birds depends only on birth rate.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": false
  },
  {
    "statement_text": "Energy flow in ecosystem containing amphibians is cyclic.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": false
  },
  {
    "statement_text": "Producers in ecosystems containing fish obtain energy by eating other organisms.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Biodiversity in regions containing viruses refers only to number of animal species.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": false
  },
  {
    "statement_text": "Deforestation in habitats of yeast increases biodiversity.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": false
  },
  {
    "statement_text": "Ozone depletion affecting rice plants increases protection from ultraviolet radiation.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": false
  },
  {
    "statement_text": "Biomagnification of toxins affecting maize plants decreases toxin concentration at higher trophic levels.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": false
  },
  {
    "statement_text": "Sexual reproduction produces genetically diverse offspring.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Sexual reproduction produces genetic variation due to recombination and segregation.",
    "is_correct": true
  },
  {
    "statement_text": "Pollen grains are produced in the anthers.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Pollen grains are formed in the anther of the stamen, not the ovary.",
    "is_correct": true
  },
  {
    "statement_text": "Fertilisation occurs inside the ovule.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "In flowering plants fertilisation occurs inside the embryo sac of the ovule.",
    "is_correct": true
  },
  {
    "statement_text": "Spermatogenesis occurs in testes.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Spermatogenesis occurs in seminiferous tubules of the testes.",
    "is_correct": true
  },
  {
    "statement_text": "Contraceptives are used to prevent pregnancy.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Contraceptive methods prevent or reduce chances of pregnancy.",
    "is_correct": true
  },
  {
    "statement_text": "Dominant alleles are not necessarily more frequent.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Dominance does not determine allele frequency in populations.",
    "is_correct": true
  },
  {
    "statement_text": "DNA replication occurs during S phase.",
    "subject": "Biology",
    "topic_id": "BZ061225",
    "concept": "DNA replication occurs during the S phase of the cell cycle before cell division.",
    "is_correct": true
  },
  {
    "statement_text": "Genetic code is nearly universal.",
    "subject": "Biology",
    "topic_id": "BZ071226",
    "concept": "Genetic code is nearly universal among organisms.",
    "is_correct": true
  },
  {
    "statement_text": "Natural selection selects favourable variations.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Variations arise through mutation and recombination, while natural selection acts on existing variation.",
    "is_correct": true
  },
  {
    "statement_text": "Vaccines contain weakened or inactive antigens.",
    "subject": "Biology",
    "topic_id": "BB081227",
    "concept": "Vaccines contain weakened or inactivated pathogens or their components.",
    "is_correct": true
  },
  {
    "statement_text": "Antibiotics treat bacterial infections.",
    "subject": "Biology",
    "topic_id": "BB091228",
    "concept": "Antibiotics act against bacteria but not viruses.",
    "is_correct": true
  },
  {
    "statement_text": "Mycorrhiza is a fungus–plant root symbiosis.",
    "subject": "Biology",
    "topic_id": "BB101229",
    "concept": "Mycorrhiza is association between fungi and plant roots.",
    "is_correct": true
  },
  {
    "statement_text": "PCR amplifies DNA fragments.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "PCR is used to amplify specific DNA sequences.",
    "is_correct": true
  },
  {
    "statement_text": "Restriction enzymes cleave DNA.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Restriction enzymes cut DNA at specific sequences.",
    "is_correct": true
  },
  {
    "statement_text": "Transgenic crops express introduced genes to produce useful proteins.",
    "subject": "Biology",
    "topic_id": "BZ131232",
    "concept": "Transgenic crops may produce proteins such as insecticidal Bt toxins.",
    "is_correct": true
  },
  {
    "statement_text": "Population density is influenced by several demographic factors.",
    "subject": "Biology",
    "topic_id": "BB111230",
    "concept": "Population density depends on birth rate, death rate, immigration and emigration.",
    "is_correct": true
  },
  {
    "statement_text": "Energy flows from producers to consumers and decomposers.",
    "subject": "Biology",
    "topic_id": "BZ121231",
    "concept": "Energy flow through ecosystems is unidirectional.",
    "is_correct": true
  },
  {
    "statement_text": "Producers produce food using light energy.",
    "subject": "Biology",
    "topic_id": "BB011220",
    "concept": "Producers synthesize food through photosynthesis.",
    "is_correct": true
  },
  {
    "statement_text": "Biodiversity includes multiple levels of biological variation.",
    "subject": "Biology",
    "topic_id": "BZ021221",
    "concept": "Biodiversity includes genetic, species and ecosystem diversity.",
    "is_correct": true
  },
  {
    "statement_text": "Deforestation leads to biodiversity loss.",
    "subject": "Biology",
    "topic_id": "BB031222",
    "concept": "Deforestation destroys habitats and reduces biodiversity.",
    "is_correct": true
  },
  {
    "statement_text": "Ozone layer protects Earth from UV radiation.",
    "subject": "Biology",
    "topic_id": "BB041223",
    "concept": "Ozone depletion reduces protection against harmful UV radiation.",
    "is_correct": true
  },
  {
    "statement_text": "Toxins accumulate along food chains.",
    "subject": "Biology",
    "topic_id": "BB051224",
    "concept": "Biomagnification increases toxin concentration at higher trophic levels.",
    "is_correct": true
  },
  {
    "statement_text": "Proteins are made of fatty acids.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct concept: Proteins are polymers of amino acids linked by peptide bonds, whereas fatty acids are components of lipids.",
    "is_correct": false
  },
  {
    "statement_text": "Each species has a two-part scientific name consisting of genus and species.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Living World'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "DNA is composed of amino acids.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct concept: DNA is composed of nucleotide units containing a sugar, phosphate group, and nitrogenous base.",
    "is_correct": false
  },
  {
    "statement_text": "Leaves absorb nitrogen gas directly from atmosphere.",
    "subject": "Biology",
    "topic_id": "BZ041104",
    "concept": "Correct concept: Plants absorb nitrogen mainly as nitrate or ammonium ions from the soil rather than directly as nitrogen gas.",
    "is_correct": false
  },
  {
    "statement_text": "ATP is a lipid molecule used for storing DNA.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct concept: ATP (adenosine triphosphate) is a nucleotide that acts as the energy currency of the cell.",
    "is_correct": false
  },
  {
    "statement_text": "Archaebacteria often live in extreme environments.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Biological Classification'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Plants absorb minerals mainly through leaves.",
    "subject": "Biology",
    "topic_id": "BB031103",
    "concept": "Correct concept: Mineral nutrients are absorbed primarily through the roots from the soil solution.",
    "is_correct": false
  },
  {
    "statement_text": "Chlorophyll is responsible for respiration in animals.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct concept: Respiration in animals occurs in mitochondria where glucose is oxidized to produce ATP. Chlorophyll is a photosynthetic pigment found in chloroplasts of plants.",
    "is_correct": false
  },
  {
    "statement_text": "Gymnosperms produce naked seeds not enclosed in fruits.",
    "subject": "Biology",
    "topic_id": "BB031103",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Ribosomes store genetic information.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct concept: Genetic information is stored in DNA. Ribosomes function as the sites of protein synthesis.",
    "is_correct": false
  },
  {
    "statement_text": "Photosynthesis occurs in mitochondria.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct concept: Photosynthesis occurs in chloroplasts. The light reactions take place in thylakoid membranes and carbon fixation occurs in the stroma.",
    "is_correct": false
  },
  {
    "statement_text": "Chordates possess a notochord at some stage of development.",
    "subject": "Biology",
    "topic_id": "BZ041104",
    "concept": "Correct statement from NCERT concept in chapter 'Animal Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Xylem transports sugars throughout plants.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct concept: Phloem transports organic food such as sucrose, while xylem transports water and minerals.",
    "is_correct": false
  },
  {
    "statement_text": "The stem helps in conduction of water and nutrients.",
    "subject": "Biology",
    "topic_id": "BB051105",
    "concept": "Correct statement from NCERT concept in chapter 'Morphology of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Phloem tissue transports food materials.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct statement from NCERT concept in chapter 'Anatomy of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Ribosomes are sites of protein synthesis.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct statement from NCERT concept in chapter 'Cell: The Unit of Life'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Human red blood cells contain a nucleus and chloroplast.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct concept: Mature human red blood cells lack a nucleus and do not contain chloroplasts; their main function is oxygen transport via haemoglobin.",
    "is_correct": false
  },
  {
    "statement_text": "Prophase is the first stage of mitosis.",
    "subject": "Biology",
    "topic_id": "BZ101110",
    "concept": "Correct statement from NCERT concept in chapter 'Cell Cycle and Cell Division'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Enzymes act as biological catalysts.",
    "subject": "Biology",
    "topic_id": "BZ091109",
    "concept": "Correct statement from NCERT concept in chapter 'Biomolecules'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Light reactions occur in thylakoid membranes.",
    "subject": "Biology",
    "topic_id": "BZ111111",
    "concept": "Correct statement from NCERT concept in chapter 'Photosynthesis in Higher Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Krebs cycle occurs in mitochondria.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct statement from NCERT concept in chapter 'Respiration in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Gibberellins promote stem elongation.",
    "subject": "Biology",
    "topic_id": "BZ131113",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Growth and Development'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Phloem transports sugars in plants.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct statement from NCERT concept in chapter 'Transport in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Nitrogen is absorbed mainly as nitrate ions.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct statement from NCERT concept in chapter 'Mineral Nutrition'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Small intestine is the main site of absorption.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct statement from NCERT concept in chapter 'Digestion and Absorption'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Alveoli increase surface area for gas exchange.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct statement from NCERT concept in chapter 'Breathing and Exchange of Gases'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Haemoglobin transports oxygen in blood.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct statement from NCERT concept in chapter 'Body Fluids and Circulation'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Urea is a nitrogenous waste in humans.",
    "subject": "Biology",
    "topic_id": "BB161116",
    "concept": "Correct statement from NCERT concept in chapter 'Excretory Products and their Elimination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Bones provide support and protection.",
    "subject": "Biology",
    "topic_id": "BZ171117",
    "concept": "Correct statement from NCERT concept in chapter 'Locomotion and Movement'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Synapse is the junction between neurons.",
    "subject": "Biology",
    "topic_id": "BZ181118",
    "concept": "Correct statement from NCERT concept in chapter 'Neural Control and Coordination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Adrenaline prepares the body for emergencies.",
    "subject": "Biology",
    "topic_id": "BZ191119",
    "concept": "Correct statement from NCERT concept in chapter 'Chemical Coordination and Integration'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Bryophytes are known as amphibians of the plant kingdom.",
    "subject": "Biology",
    "topic_id": "BB031103",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "The flower is the reproductive structure of angiosperms.",
    "subject": "Biology",
    "topic_id": "BB051105",
    "concept": "Correct statement from NCERT concept in chapter 'Morphology of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Parenchyma cells are living cells with thin walls.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct statement from NCERT concept in chapter 'Anatomy of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "DNA is a polymer of nucleotides.",
    "subject": "Biology",
    "topic_id": "BZ091109",
    "concept": "Correct statement from NCERT concept in chapter 'Biomolecules'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Chlorophyll absorbs mainly red and blue light.",
    "subject": "Biology",
    "topic_id": "BZ111111",
    "concept": "Correct statement from NCERT concept in chapter 'Photosynthesis in Higher Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "ATP acts as the energy currency of the cell.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct statement from NCERT concept in chapter 'Respiration in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Auxin promotes cell elongation.",
    "subject": "Biology",
    "topic_id": "BZ131113",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Growth and Development'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Transpiration occurs mainly through stomata.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct statement from NCERT concept in chapter 'Transport in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Bile helps emulsify fats.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct statement from NCERT concept in chapter 'Digestion and Absorption'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Breathing involves inhalation and exhalation.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct statement from NCERT concept in chapter 'Breathing and Exchange of Gases'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Platelets help in blood clotting.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct statement from NCERT concept in chapter 'Body Fluids and Circulation'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Kidneys filter blood to remove wastes.",
    "subject": "Biology",
    "topic_id": "BB161116",
    "concept": "Correct statement from NCERT concept in chapter 'Excretory Products and their Elimination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Neurons transmit electrical impulses.",
    "subject": "Biology",
    "topic_id": "BZ181118",
    "concept": "Correct statement from NCERT concept in chapter 'Neural Control and Coordination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Thyroxine regulates metabolic rate.",
    "subject": "Biology",
    "topic_id": "BZ191119",
    "concept": "Correct statement from NCERT concept in chapter 'Chemical Coordination and Integration'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Systematics studies diversity and evolutionary relationships among organisms.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Living World'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Protists are primarily unicellular eukaryotes.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Biological Classification'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Angiosperms produce flowers.",
    "subject": "Biology",
    "topic_id": "BB031103",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Echinoderms exhibit radial symmetry in adults.",
    "subject": "Biology",
    "topic_id": "BZ041104",
    "concept": "Correct statement from NCERT concept in chapter 'Animal Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Chloroplasts contain chlorophyll pigments.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct statement from NCERT concept in chapter 'Cell: The Unit of Life'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Carbohydrates are composed of sugar units.",
    "subject": "Biology",
    "topic_id": "BZ091109",
    "concept": "Correct statement from NCERT concept in chapter 'Biomolecules'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Calvin cycle occurs in the stroma.",
    "subject": "Biology",
    "topic_id": "BZ111111",
    "concept": "Correct statement from NCERT concept in chapter 'Photosynthesis in Higher Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Ethylene promotes fruit ripening.",
    "subject": "Biology",
    "topic_id": "BZ131113",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Growth and Development'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Potassium helps regulate stomatal opening.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct statement from NCERT concept in chapter 'Mineral Nutrition'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Amylase breaks down starch.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct statement from NCERT concept in chapter 'Digestion and Absorption'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Skeletal muscles are voluntary muscles.",
    "subject": "Biology",
    "topic_id": "BZ171117",
    "concept": "Correct statement from NCERT concept in chapter 'Locomotion and Movement'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Leaves are the primary sites of photosynthesis in plants.",
    "subject": "Biology",
    "topic_id": "BB051105",
    "concept": "Correct statement from NCERT concept in chapter 'Morphology of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Sclerenchyma provides mechanical support.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct statement from NCERT concept in chapter 'Anatomy of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Respiration releases energy from glucose.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct statement from NCERT concept in chapter 'Respiration in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Phosphorus is a component of ATP.",
    "subject": "Biology",
    "topic_id": "BZ091109",
    "concept": "Correct statement from NCERT concept in chapter 'Mineral Nutrition'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Oxygen is transported mainly by haemoglobin.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct statement from NCERT concept in chapter 'Breathing and Exchange of Gases'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Plasma is the liquid component of blood.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct statement from NCERT concept in chapter 'Body Fluids and Circulation'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Nephrons are functional units of kidneys.",
    "subject": "Biology",
    "topic_id": "BB161116",
    "concept": "Correct statement from NCERT concept in chapter 'Excretory Products and their Elimination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Joints allow movement between bones.",
    "subject": "Biology",
    "topic_id": "BZ171117",
    "concept": "Correct statement from NCERT concept in chapter 'Locomotion and Movement'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Nerve impulses travel along axons.",
    "subject": "Biology",
    "topic_id": "BZ181118",
    "concept": "Correct statement from NCERT concept in chapter 'Neural Control and Coordination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Taxonomy involves identification, nomenclature and classification of organisms.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Living World'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Kingdom Monera consists of unicellular prokaryotic organisms.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Biological Classification'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Arthropods possess jointed appendages and chitinous exoskeleton.",
    "subject": "Biology",
    "topic_id": "BZ041104",
    "concept": "Correct statement from NCERT concept in chapter 'Animal Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Mitochondria are sites of aerobic respiration.",
    "subject": "Biology",
    "topic_id": "BB081108",
    "concept": "Correct statement from NCERT concept in chapter 'Cell: The Unit of Life'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Meiosis reduces chromosome number by half.",
    "subject": "Biology",
    "topic_id": "BZ101110",
    "concept": "Correct statement from NCERT concept in chapter 'Cell Cycle and Cell Division'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Glycolysis occurs in the cytoplasm.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct statement from NCERT concept in chapter 'Respiration in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Xylem conducts water from roots to leaves.",
    "subject": "Biology",
    "topic_id": "BB121112",
    "concept": "Correct statement from NCERT concept in chapter 'Transport in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Insulin lowers blood glucose levels.",
    "subject": "Biology",
    "topic_id": "BZ191119",
    "concept": "Correct statement from NCERT concept in chapter 'Chemical Coordination and Integration'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Molluscs typically have a muscular foot.",
    "subject": "Biology",
    "topic_id": "BZ041104",
    "concept": "Correct statement from NCERT concept in chapter 'Animal Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Cytokinins promote cell division.",
    "subject": "Biology",
    "topic_id": "BZ131113",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Growth and Development'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Magnesium is a component of chlorophyll.",
    "subject": "Biology",
    "topic_id": "BZ091109",
    "concept": "Correct statement from NCERT concept in chapter 'Mineral Nutrition'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Carbon dioxide diffuses from blood into alveoli.",
    "subject": "Biology",
    "topic_id": "BZ141114",
    "concept": "Correct statement from NCERT concept in chapter 'Breathing and Exchange of Gases'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Heart pumps blood through the circulatory system.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct statement from NCERT concept in chapter 'Body Fluids and Circulation'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Proteins are polymers of amino acids.",
    "subject": "Biology",
    "topic_id": "BZ091109",
    "concept": "Correct statement from NCERT concept in chapter 'Biomolecules'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Brain is the central control organ.",
    "subject": "Biology",
    "topic_id": "BZ181118",
    "concept": "Correct statement from NCERT concept in chapter 'Neural Control and Coordination'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Root pressure helps in water transport.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct statement from NCERT concept in chapter 'Transport in Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Pteridophytes possess vascular tissues.",
    "subject": "Biology",
    "topic_id": "BB031103",
    "concept": "Correct statement from NCERT concept in chapter 'Plant Kingdom'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Xylem tissue conducts water and minerals.",
    "subject": "Biology",
    "topic_id": "BB061106",
    "concept": "Correct statement from NCERT concept in chapter 'Anatomy of Flowering Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Pepsin digests proteins in the stomach.",
    "subject": "Biology",
    "topic_id": "BZ151115",
    "concept": "Correct statement from NCERT concept in chapter 'Digestion and Absorption'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Cyanobacteria perform oxygenic photosynthesis.",
    "subject": "Biology",
    "topic_id": "BB021102",
    "concept": "Correct statement from NCERT concept in chapter 'Biological Classification'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  },
  {
    "statement_text": "Oxygen released in photosynthesis comes from water.",
    "subject": "Biology",
    "topic_id": "BZ111111",
    "concept": "Correct statement from NCERT concept in chapter 'Photosynthesis in Higher Plants'. It accurately describes the biological principle taught in this chapter.",
    "is_correct": true
  }
];

    try {
        console.log("Processing Statements...");
        let count = 0;
        for (const item of fullData) {
            const existing = await db.select().from(diagnosticStatementBank).where(
                and(
                    eq(diagnosticStatementBank.statementText, item.statement_text),
                    eq(diagnosticStatementBank.topicId, item.topic_id)
                )
            );

            if (existing.length > 0) {
                // Update if exists
                await db.update(diagnosticStatementBank).set({
                    subject: item.subject,
                    concept: item.concept,
                    isCorrect: item.is_correct,
                    updatedAt: new Date()
                }).where(eq(diagnosticStatementBank.id, existing[0].id));
            } else {
                // Insert if new
                await db.insert(diagnosticStatementBank).values({
                    statementText: item.statement_text,
                    subject: item.subject,
                    topicId: item.topic_id,
                    concept: item.concept,
                    isCorrect: item.is_correct
                });
            }
            count++;
            if (count % 100 === 0) console.log(`Processed ${count} statements...`);
        }

        console.log(`✅ Seeded/Updated ${fullData.length} statements.`);
    } catch (error) {
        console.error("❌ Failed to seed Diagnostic data: ", error);
        process.exit(1);
    }

    process.exit(0);
}

main().catch(console.error);
