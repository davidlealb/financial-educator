import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTranslation } from 'react-i18next';

// Module-level persistence to keep advisor consistent across navigation
let persistedAdvisor = null;
let persistedAdvisorsList = [];

/**
 * useRandomAdvisor Hook
 * 
 * Fetches the 'advisors' collection from Firestore and selects one at random.
 * Persists the selection in module state to avoid reshuffling on navigation.
 */
export function useRandomAdvisor() {
    const { i18n } = useTranslation();
    const [advisor, setAdvisor] = useState(persistedAdvisor);
    const [loading, setLoading] = useState(!persistedAdvisor);
    const [error, setError] = useState(null);

    const lang = i18n.language?.split('-')[0] || 'en';

    const getLocalizedField = (field) => {
        if (typeof field === 'object' && field !== null) {
            return field[lang] || field['en'] || Object.values(field)[0] || "";
        }
        return field;
    };

    const selectRandomAdvisor = (list) => {
        if (!list || list.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * list.length);
        const selected = list[randomIndex];

        // Localize fields
        return {
            ...selected,
            name: getLocalizedField(selected.name),
            title: getLocalizedField(selected.title),
            photoUrl: selected.photoUrl || selected.photoURL || selected.photo || selected.image || selected.imageUrl || null,
        };
    };

    const fetchAdvisors = useCallback(async (forceRefresh = false) => {
        if (!forceRefresh && persistedAdvisor) {
            setAdvisor(persistedAdvisor);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const projectId = db?.app?.options?.projectId;
            const isConfigured = projectId && !projectId.includes("YOUR_PROJECT_ID");

            if (!isConfigured) {
                console.warn("Firebase not configured for advisors.");
                setError("Firebase not configured");
                setLoading(false);
                return;
            }

            // Fetch from Firestore if list is empty or forceRefresh is true
            if (persistedAdvisorsList.length === 0 || forceRefresh) {
                const querySnapshot = await getDocs(collection(db, "advisors"));
                persistedAdvisorsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            }

            if (persistedAdvisorsList.length > 0) {
                const selected = selectRandomAdvisor(persistedAdvisorsList);
                persistedAdvisor = selected;
                setAdvisor(selected);
            } else {
                setError("No advisors found");
            }
        } catch (err) {
            console.error("Error fetching advisors:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [lang]);

    useEffect(() => {
        if (!persistedAdvisor) {
            fetchAdvisors();
        }
    }, [fetchAdvisors]);

    const refresh = () => {
        const selected = selectRandomAdvisor(persistedAdvisorsList);
        if (selected) {
            persistedAdvisor = selected;
            setAdvisor(selected);
        } else {
            fetchAdvisors(true);
        }
    };

    return { advisor, loading, error, refresh };
}
