import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

// Level mapping based on LearningPath.jsx
const levelMapping = {
    'opening-first-account': 1,
    'banking-basics': 1,
    'atm-savvy': 1,
    'debit-and-etransfer': 1,
    'your-first-credit-card': 1,
    'paystubs-and-taxes': 2,
    'building-credit': 2,
    'advanced-credit': 2,
    'cell-phone-traps': 2,
    'canada-child-benefit': 3,
    'tax-filing-101': 3,
    'spotting-scams': 3,
    'tfsa-basics': 4,
    'rrsp-basics': 4,
    'fhsa-basics': 4,
    'tfsa-vs-rrsp': 4,
    'insurance-essentials': 4,
    'car-loans-canada': 4,
    'investing-beginners': 4
};

const lessonsDir = path.resolve(__dirname, '../src/data/lessons');
const lessonsFiles = fs.readdirSync(lessonsDir).filter(file => file.endsWith('.json'));

const transformedLessons = lessonsFiles.map(file => {
    const filePath = path.join(lessonsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return {
        id: content.id,
        title: content.title,
        description: content.description,
        level: levelMapping[content.id] || 1,
        xpReward: content.xpReward || 50,
        content: (content.content || []).map(c => ({
            title: c.title,
            text: c.text
        })),
        quiz: (content.quiz || []).map(q => ({
            question: q.question,
            options: q.options,
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation
        }))
    };
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
    console.log(`Starting standalone migration for ${transformedLessons.length} lessons...`);
    const lessonsRef = collection(db, "lessons");

    for (const lesson of transformedLessons) {
        if (!lesson.id) continue;
        try {
            await setDoc(doc(lessonsRef, lesson.id), lesson, { merge: true });
            console.log(`Successfully migrated lesson: ${lesson.title} (Level ${lesson.level})`);
        } catch (error) {
            console.error(`Error migrating lesson ${lesson.id}:`, error);
        }
    }
    console.log("Migration complete!");
    process.exit(0);
}

migrate();
