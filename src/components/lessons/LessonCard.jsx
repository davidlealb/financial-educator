import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LessonCard({ lesson, status }) {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div className={`relative bg-surface rounded-xl overflow-hidden transition-all duration-300 ${isLocked
            ? 'opacity-75 border border-slate-200'
            : `shadow-sm hover:shadow-md cursor-pointer ${isCompleted ? 'border-2 border-emerald-green' : 'border border-slate-200'}`
            }`}>

            {/* Progress Indicator (Sky Blue Line) for Active/In-Progress lessons */}
            {!isLocked && !isCompleted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-sky-blue" />
            )}

            <div className="p-4 pt-5">
                <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-full ${isCompleted ? 'bg-emerald-green/10 text-emerald-green' :
                        isLocked ? 'bg-slate-100 text-text-muted' : 'bg-sky-blue/10 text-sky-blue'
                        }`}>
                        {isCompleted ? <CheckCircle size={20} /> :
                            isLocked ? <Lock size={20} /> : <PlayCircle size={20} />}
                    </div>
                    {!isLocked && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isCompleted ? 'text-emerald-green bg-emerald-green/10' : 'bg-slate-100 text-text-secondary'}`}>
                            {lesson.xpReward} XP
                        </span>
                    )}
                </div>

                <h3 className={`font-semibold text-lg mb-1 ${isLocked ? 'text-text-muted' : 'text-deep-navy'}`}>
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
        </div>
    );
}
