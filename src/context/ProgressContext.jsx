import { createContext, useContext, useEffect, useState } from 'react';

const ProgressContext = createContext(null);

const STORAGE_KEY = 'financial_educator_progress';

const INITIAL_STATE = {
    xp: 0,
    completedLessons: [], // Array of lesson IDs
    quizScores: {}, // Map of lessonId -> score (0-100)
    streak: 1,
    lastLogin: new Date().toISOString().split('T')[0],
};

export function ProgressProvider({ children }) {
    const [state, setState] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : INITIAL_STATE;
        } catch (e) {
            console.error("Failed to load progress", e);
            return INITIAL_STATE;
        }
    });

    // Persistence Logic - Runs on every state change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error("Failed to sync progress", e);
        }
    }, [state]);

    // Streak Logic - Runs on mount or when specifically needed
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = state.lastLogin;

        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            setState(prev => {
                let newStreak = prev.streak;
                if (lastDate === yesterdayStr) {
                    newStreak += 1;
                } else if (lastDate < yesterdayStr) {
                    newStreak = 1; // Reset if gap > 1 day
                }

                return {
                    ...prev,
                    streak: newStreak || 1,
                    lastLogin: today
                };
            });
        }
    }, []); // Run once on startup

    const completeLesson = (lessonId, score, xpAmount) => {
        setState(prev => {
            const isFirstTime = !prev.completedLessons.includes(lessonId);

            // Update scores if new score is higher
            const currentScore = prev.quizScores[lessonId] || 0;
            const newScores = { ...prev.quizScores };
            if (score > currentScore) {
                newScores[lessonId] = score;
            }

            return {
                ...prev,
                xp: isFirstTime ? prev.xp + (xpAmount || 0) : prev.xp,
                completedLessons: isFirstTime
                    ? [...prev.completedLessons, lessonId]
                    : prev.completedLessons,
                quizScores: newScores
            };
        });
    };

    const resetProgress = () => {
        setState(INITIAL_STATE);
    };

    return (
        <ProgressContext.Provider value={{ state, completeLesson, resetProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
