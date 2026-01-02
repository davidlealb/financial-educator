import { useProgress } from '../context/ProgressContext';
import lessons from '../data/lessons/index.js';
import LessonCard from '../components/lessons/LessonCard';
import { Trophy, Flame } from 'lucide-react';

export default function LearningPath() {
    const { state } = useProgress();

    // Helper to determine lesson status
    const getLessonStatus = (lessonId, index) => {
        if (state.completedLessons.includes(lessonId)) return 'completed';
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
                'building-credit',
                'advanced-credit'
            ]
        },
        {
            id: 3,
            title: "Level 3: Government Benefits & Tax",
            lessonIds: [] // Placeholder for future content
        },
        {
            id: 4,
            title: "Level 4: Protection & Long-Term Growth",
            lessonIds: [
                'tfsa-vs-rrsp'
            ]
        }
    ];

    return (
        <div className="pb-8">
            {/* Header Stats */}
            <header className="mb-8 pt-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                            Learning Path 🇨🇦
                        </h1>
                        <p className="text-text-secondary text-sm">Empowering newcomers with financial knowledge</p>
                    </div>
                    <div className="flex space-x-3">
                        {/* Streak Badge */}
                        <div className="flex items-center space-x-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold">
                            <Flame size={14} />
                            <span>{state.streak}</span>
                        </div>
                        {/* XP Badge */}
                        <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold">
                            <Trophy size={14} />
                            <span>{state.xp}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Curriculum Levels */}
            <div className="space-y-12">
                {levels.map((level) => {
                    const levelLessons = level.lessonIds
                        .map(id => lessons.find(l => l.id === id))
                        .filter(Boolean);

                    const completedInLevel = levelLessons.filter(l => state.completedLessons.includes(l.id)).length;
                    const isLevelEmpty = levelLessons.length === 0;

                    return (
                        <div key={level.id} className="space-y-4">
                            <div className="flex items-end justify-between px-1">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
                                    {level.title}
                                </h2>
                                {!isLevelEmpty && (
                                    <span className="text-xs font-medium text-text-muted">
                                        {completedInLevel}/{levelLessons.length} Done
                                    </span>
                                )}
                            </div>

                            {isLevelEmpty ? (
                                <div className="p-6 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
                                    <p className="text-text-muted text-sm italic">New lessons coming soon to this level!</p>
                                </div>
                            ) : (
                                /* Lesson List - Two Column Grid */
                                <div className="grid grid-cols-2 gap-4">
                                    {levelLessons.map((lesson, index) => (
                                        <LessonCard
                                            key={lesson.id}
                                            lesson={lesson}
                                            status={getLessonStatus(lesson.id, index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Footer Motivation */}
                <div className="pt-4 px-1">
                    <div className="p-8 text-center bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-text-primary font-medium text-sm italic">"The best time to start was yesterday. The second best time is now." 🏠</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
