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

const lessonsDir = path.resolve(__dirname, '../src/data/lessons');
const files = fs.readdirSync(lessonsDir).filter(file => file.endsWith('.json'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const migrate = async () => {
    console.log(`Starting standalone migration for ${files.length} lessons...`);

    const levelMapping = {
        'opening-first-account': 1,
        'banking-basics': 1,
        'atm-savvy': 1,
        'debit-and-etransfer': 1,
        'your-first-credit-card': 1,
        'emergency-funds': 1,
        'the-30-percent-rule': 1,
        'paystubs-and-taxes': 2,
        'building-credit': 2,
        'advanced-credit': 2,
        'cell-phone-traps': 2,
        'renting-and-credit': 2,
        'canada-child-benefit': 3,
        'tax-filing-101': 3,
        'spotting-scams': 3,
        'tfsa-basics': 4,
        'rrsp-basics': 4,
        'fhsa-basics': 4,
        'tfsa-vs-rrsp': 4,
        'insurance-essentials': 4,
        'car-loans-canada': 4,
        'investing-beginners': 4,
        'segregated-funds': 5
    };

    // Helper to ensure multilingual object
    const toI18n = (val) => {
        if (typeof val === 'string') return { en: val };
        return val; // Assume it's already an object { en, es, fr }
    };

    for (const file of files) {
        try {
            const rawData = JSON.parse(fs.readFileSync(path.join(lessonsDir, file), 'utf-8'));

            // Map and format the data
            const lessonData = {
                id: rawData.id,
                title: toI18n(rawData.title),
                description: toI18n(rawData.description),
                level: rawData.level || levelMapping[rawData.id] || 1,
                xpReward: rawData.xpReward || 50,
                content: (rawData.content || []).map(c => ({
                    ...c,
                    title: toI18n(c.title),
                    text: toI18n(c.text)
                })),
                quiz: (rawData.quiz || []).map(q => ({
                    ...q,
                    question: toI18n(q.question),
                    options: (q.options || []).map(opt => toI18n(opt)),
                    explanation: toI18n(q.explanation)
                }))
            };

            await setDoc(doc(db, "lessons", lessonData.id), lessonData);
            console.log(`Successfully migrated lesson: ${lessonData.title.en} (Level ${lessonData.level})`);
        } catch (error) {
            console.error(`Error migrating lesson ${lesson.id}:`, error);
        }
    }
    console.log("Migration complete!");
    process.exit(0);
}

migrate();
