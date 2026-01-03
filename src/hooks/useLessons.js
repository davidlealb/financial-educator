import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import localLessons from '../data/lessons/index.js';

/**
 * useLessons Hook
 * 
 * Fetches lessons from Firestore. 
 * Falls back to local JSON data if Firestore is not configured or fails.
 */
export function useLessons() {
    const [lessons, setLessons] = useState(localLessons);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                // Check if firebase is configured (safer check for missing or placeholder project ID)
                const projectId = db?.app?.options?.projectId;
                const isConfigured = projectId && !projectId.includes("YOUR_PROJECT_ID");

                if (!isConfigured) {
                    console.warn("Firebase not configured, using local lesson data.");
                    setLessons(localLessons);
                    setLoading(false);
                    return;
                }

                const querySnapshot = await getDocs(collection(db, "lessons"));
                const firestoreLessons = querySnapshot.docs.map(doc => doc.data());

                if (firestoreLessons.length > 0) {
                    setLessons(firestoreLessons);
                } else {
                    console.info("Firestore 'lessons' collection is empty, using local data.");
                    setLessons(localLessons);
                }
            } catch (err) {
                console.error("Error fetching lessons from Firestore:", err);
                setError(err);
                setLessons(localLessons); // Fallback
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    return { lessons, loading, error };
}
