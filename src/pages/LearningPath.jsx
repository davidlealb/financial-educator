import { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useLessons } from '../hooks/useLessons';
import LevelAccordion from '../components/lessons/LevelAccordion';
import HorizontalLessonCard from '../components/lessons/HorizontalLessonCard';
import { Trophy, Flame, Milestone, Loader2 } from 'lucide-react';

export default function LearningPath() {
    const { state } = useProgress();
    const { lessons, loading } = useLessons();

    // Helper to determine lesson status
    const getLessonStatus = (lessonId) => {
        if (state.completedLessons.includes(lessonId)) return 'completed';
        return 'active';
    };

    // Level Titles mapping for aesthetics
    const LEVEL_METADATA = {
        1: "The First 30 Days (Survival)",
        2: "Building Your Foundation",
        3: "Government Benefits & Tax",
        4: "Protection & Long-Term Growth",
        5: "Estate Planning & Segregated Funds"
    };

    // Calculate dynamic levels from lesson data
    const levels = useMemo(() => {
        // 1. Group lessons by level
        const groups = lessons.reduce((acc, lesson) => {
            const lvl = lesson.level || 1;
            if (!acc[lvl]) acc[lvl] = [];
            acc[lvl].push(lesson);
            return acc;
        }, {});

        // 2. Transform into the format LevelAccordion expects
        return Object.keys(groups)
            .sort((a, b) => Number(a) - Number(b))
            .map(lvlNumber => {
                const levelId = Number(lvlNumber);
                return {
                    id: levelId,
                    title: `Level ${levelId}: ${LEVEL_METADATA[levelId] || 'Continuing Your Journey'}`,
                    lessons: groups[lvlNumber]
                };
            });
    }, [lessons]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <Loader2 className="text-primary animate-spin mb-4" size={40} />
                <p className="text-text-secondary font-bold">Loading curriculum...</p>
            </div>
        );
    }

    return (
        <div className="pb-24">
            {/* Header Stats */}
            <header className="mb-8 pt-4 px-1">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-primary/10 text-primary p-1.5 rounded-lg">
                                <Milestone size={18} strokeWidth={2.5} />
                            </span>
                            <h1 className="text-2xl font-black text-text-primary tracking-tight">
                                Learning Path
                            </h1>
                        </div>
                        <p className="text-text-secondary text-sm font-medium">Empowering newcomers with financial knowledge 🇨🇦</p>

                    </div>
                    <div className="flex flex-col items-end gap-2">
                        {/* Streak Badge */}
                        <div className="flex items-center space-x-1.5 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-sm border border-orange-200">
                            <Flame size={12} strokeWidth={3} />
                            <span>{state.streak} Day Streak</span>
                        </div>
                        {/* XP Badge */}
                        <div className="flex items-center space-x-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-sm border border-primary/20">
                            <Trophy size={12} strokeWidth={3} />
                            <span>{state.xp} XP Earned</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Curriculum Levels - Accordion Layout */}
            <div className="space-y-4 px-1">
                {levels.map((level, index) => {
                    const levelLessons = level.lessons;
                    const completedCount = levelLessons.filter(l => state.completedLessons.includes(l.id)).length;

                    return (
                        <LevelAccordion
                            key={level.id}
                            level={level}
                            lessons={levelLessons}
                            completedCount={completedCount}
                            defaultOpen={index === 0 || (completedCount > 0 && completedCount < levelLessons.length)}
                        >
                            <div className="pt-2 space-y-3">
                                {levelLessons.map((lesson) => (
                                    <HorizontalLessonCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        status={getLessonStatus(lesson.id)}
                                    />
                                ))}
                            </div>
                        </LevelAccordion>
                    );
                })}
            </div>

            {/* Footer Motivation */}
            <div className="mt-10 px-1">
                <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                    <p className="text-text-secondary font-bold text-sm leading-relaxed italic">
                        "Your financial journey in Canada starts here. Take it one step at a time." 🏠
                    </p>
                </div>
            </div>
        </div>
    );
}
