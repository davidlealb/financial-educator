import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LessonCard({ lesson, status }) {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div className={`relative p-4 rounded-xl border transition-all ${isLocked
                ? 'bg-slate-50 border-slate-200 opacity-75'
                : 'bg-surface border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 cursor-pointer'
            }`}>
            <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-full ${isCompleted ? 'bg-primary/10 text-primary' :
                        isLocked ? 'bg-slate-200 text-text-muted' : 'bg-secondary/10 text-secondary'
                    }`}>
                    {isCompleted ? <CheckCircle size={20} /> :
                        isLocked ? <Lock size={20} /> : <PlayCircle size={20} />}
                </div>
                {!isLocked && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-text-secondary">
                        {lesson.xpReward} XP
                    </span>
                )}
            </div>

            <h3 className={`font-semibold text-lg mb-1 ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}>
                {lesson.title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-2">
                {lesson.description}
            </p>

            {!isLocked && (
                <Link
                    to={`/lesson/${lesson.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Start lesson: ${lesson.title}`}
                />
            )}
        </div>
    );
}
