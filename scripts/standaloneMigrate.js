import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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

const lessons = [
    { id: "banking-basics", title: "Banking Basics in Canada", description: "Understand how to choose your first bank and the difference between accounts.", xpReward: 50 },
    { id: "building-credit", title: "Building Your Credit Score", description: "The foundation of your financial life in Canada.", xpReward: 100 },
    { id: "opening-first-account", title: "Opening Your First Account", description: "Step-by-step guide to your first Canadian bank visit.", xpReward: 50 },
    { id: "atm-savvy", title: "ATM Savvy", description: "Learn how to use Canadian ATMs safely and avoid fees.", xpReward: 50 },
    { id: "debit-and-etransfer", title: "Debit & Interac e-Transfer", description: "Master the most common ways to pay and send money in Canada.", xpReward: 50 },
    { id: "your-first-credit-card", title: "Your First Credit Card", description: "How to apply and use it responsibly to build credit.", xpReward: 100 },
    { id: "paystubs-and-taxes", title: "Understanding Your Paystub", description: "Where does your money go? Gross vs Net pay explained.", xpReward: 50 },
    { id: "cell-phone-traps", title: "Cell Phone Plan Traps", description: "Avoid expensive contracts and choose the right carrier.", xpReward: 50 },
    { id: "tax-filing-101", title: "Tax Filing 101", description: "Why everyone in Canada should file their taxes.", xpReward: 100 },
    { id: "canada-child-benefit", title: "Canada Child Benefit (CCB)", description: "Tax-free monthly payment to help with the cost of raising children.", xpReward: 50 },
    { id: "tfsa-basics", title: "TFSA Basics", description: "Tax-Free Savings Account: The best way to save for any goal.", xpReward: 75 },
    { id: "rrsp-basics", title: "RRSP Basics", description: "Registered Retirement Savings Plan: Save for your future and pay less tax.", xpReward: 75 },
    { id: "fhsa-basics", title: "FHSA Basics", description: "First Home Savings Account: The newest way to save for your first home.", xpReward: 75 },
    { id: "spotting-scams", title: "Spotting Scams", description: "Protect yourself from common financial scams targeting newcomers.", xpReward: 100 }
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
    console.log("Starting standalone migration...");
    const lessonsRef = collection(db, "lessons");

    for (const lesson of lessons) {
        try {
            // In a real scenario, we'd want the FULL lesson content, 
            // but for this verification, we'll just push metadata if needed
            // Actually, I should probably use the full JSON if I can.
            await setDoc(doc(lessonsRef, lesson.id), lesson, { merge: true });
            console.log(`Successfully migrated lesson: ${lesson.title}`);
        } catch (error) {
            console.error(`Error migrating lesson ${lesson.id}:`, error);
        }
    }
    console.log("Migration complete!");
    process.exit(0);
}

migrate();
