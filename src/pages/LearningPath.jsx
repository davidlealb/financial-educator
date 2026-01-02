import { useProgress } from '../context/ProgressContext';
import lessons from '../data/lessons.json';
import LessonCard from '../components/lessons/LessonCard';
import { Trophy, Flame } from 'lucide-react';

export default function LearningPath() {
    const { state } = useProgress();

    // Helper to determine lesson status
    const getLessonStatus = (lessonId, index) => {
        if (state.completedLessons.includes(lessonId)) return 'completed';
        return 'active';
    };

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

            {/* Lesson List */}
            <div className="space-y-4">
                {lessons.map((lesson, index) => (
                    <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        status={getLessonStatus(lesson.id, index)}
                    />
                ))}

                {/* Placeholder for future lessons */}
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-text-muted text-sm">More lessons coming soon!</p>
                </div>
            </div>
        </div>
    );
}
