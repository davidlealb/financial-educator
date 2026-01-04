import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import localLessons from '../data/lessons/index.js';

/**
 * useLessons Hook
 * 
 * Fetches lessons from Firestore and handles multilingual content mapping.
 */
export function useLessons() {
    const { i18n } = useTranslation();
    const [rawLessons, setRawLessons] = useState(localLessons);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Current language (e.g., 'en', 'es', 'fr')
    const lang = i18n.language?.split('-')[0] || 'en';

    // Helper to extract translatable string
    const tField = (field) => {
        if (typeof field === 'object' && field !== null) {
            return field[lang] || field['en'] || Object.values(field)[0] || "";
        }
        return field;
    };

    // Derived state for translated lessons
    const lessons = rawLessons.map(lesson => ({
        ...lesson,
        title: tField(lesson.title),
        description: tField(lesson.description),
        content: (lesson.content || []).map(c => ({
            ...c,
            title: tField(c.title),
            text: tField(c.text)
        })),
        quiz: (lesson.quiz || []).map(q => ({
            ...q,
            question: tField(q.question),
            options: (q.options || []).map(opt => tField(opt)),
            explanation: tField(q.explanation)
        }))
    }));

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const projectId = db?.app?.options?.projectId;
                const isConfigured = projectId && !projectId.includes("YOUR_PROJECT_ID");

                if (!isConfigured) {
                    console.warn("Firebase not configured, using local lesson data.");
                    setRawLessons(localLessons);
                    setLoading(false);
                    return;
                }

                const querySnapshot = await getDocs(collection(db, "lessons"));
                const firestoreLessons = querySnapshot.docs.map(doc => doc.data());

                if (firestoreLessons.length > 0) {
                    setRawLessons(firestoreLessons);
                } else {
                    console.info("Firestore 'lessons' collection is empty, using local data.");
                    setRawLessons(localLessons);
                }
            } catch (err) {
                console.error("Error fetching lessons from Firestore:", err);
                setError(err);
                setRawLessons(localLessons);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    return { lessons, loading, error };
}
