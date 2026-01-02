import { useProgress } from '../context/ProgressContext';
import lessons from '../data/lessons/index.js';
import LevelAccordion from '../components/lessons/LevelAccordion';
import HorizontalLessonCard from '../components/lessons/HorizontalLessonCard';
import { Trophy, Flame, Milestone } from 'lucide-react';

export default function LearningPath() {
    const { state } = useProgress();

    // Helper to determine lesson status
    const getLessonStatus = (lessonId) => {
        if (state.completedLessons.includes(lessonId)) return 'completed';
        // Basic locking logic: if first or previous is completed
        // For now, let's stick to 'active' for all unless we want strict locking
        return 'active';
    };

    // Curriculum structure
    const levels = [
        {
            id: 1,
            title: "Level 1: The First 30 Days (Survival)",
            lessonIds: [
                'opening-first-account',
                'banking-basics',
                'atm-savvy',
                'debit-and-etransfer',
                'your-first-credit-card'
            ]
        },
        {
            id: 2,
            title: "Level 2: Building Your Foundation",
            lessonIds: [
                'paystubs-and-taxes',
                'building-credit',
                'advanced-credit',
                'cell-phone-traps'
            ]
        },
        {
            id: 3,
            title: "Level 3: Government Benefits & Tax",
            lessonIds: [
                'canada-child-benefit',
                'tax-filing-101',
                'spotting-scams'
            ]
        },
        {
            id: 4,
            title: "Level 4: Protection & Long-Term Growth",
            lessonIds: [
                'tfsa-basics',
                'rrsp-basics',
                'fhsa-basics',
                'tfsa-vs-rrsp',
                'insurance-essentials',
                'car-loans-canada',
                'investing-beginners'
            ]
        }
    ];

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
                    const levelLessons = level.lessonIds
                        .map(id => lessons.find(l => l.id === id))
                        .filter(Boolean);

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
