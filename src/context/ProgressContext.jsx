import { createContext, useContext, useEffect, useState } from 'react';

const ProgressContext = createContext(null);

const STORAGE_KEY = 'financial_educator_progress';

const INITIAL_STATE = {
    xp: 0,
    completedLessons: [], // Array of lesson IDs
    quizScores: {}, // Map of lessonId -> score (0-100)
    streak: 0,
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

    // Persistence Effect
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error("Failed to save progress", e);
        }
    }, [state]);

    const addXp = (amount) => {
        setState(prev => ({ ...prev, xp: prev.xp + amount }));
    };

    const completeLesson = (lessonId, score) => {
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
        <ProgressContext.Provider value={{ state, addXp, completeLesson, resetProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
