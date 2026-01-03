import React from 'react';
import { CheckCircle, PlayCircle, Lock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * HorizontalLessonCard Component
 * 
 * A clean, horizontal card designed for the Learning Path catalogue.
 * Features:
 * - Large touch area (thumb-friendly)
 * - Status indicators (Locked, In Progress, Completed)
 * - XP Reward badge
 * - 1-sentence description
 */
export default function HorizontalLessonCard({ lesson, status }) {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div className={`group relative bg-surface rounded-2xl p-4 transition-all duration-300 border 
                        ${isLocked
                ? 'opacity-60 border-slate-100'
                : 'border-slate-200 hover:border-primary/30 hover:shadow-md active:scale-[0.98]'
            }`}>

            <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                                ${isCompleted
                        ? 'bg-emerald-green/10 text-emerald-green'
                        : isLocked
                            ? 'bg-slate-100 text-text-muted'
                            : 'bg-primary/10 text-primary'
                    }`}>
                    {isCompleted ? <CheckCircle size={24} strokeWidth={2.5} /> :
                        isLocked ? <Lock size={20} /> : <PlayCircle size={24} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className={`font-bold text-base truncate ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}>
                            {lesson.title}
                        </h3>
                        {/* XP Reward Badge */}
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 flex-shrink-0">
                            <Trophy size={11} className="text-secondary" />
                            <span className="text-[10px] font-bold text-text-secondary">{lesson.xpReward} XP</span>
                        </div>
                    </div>

                    <p className={`text-sm line-clamp-1 ${isLocked ? 'text-text-muted/60' : 'text-text-secondary'}`}>
                        {lesson.description}
                    </p>
                </div>

                {/* Progress Visual Cues */}
                {isCompleted && (
                    <div className="flex-shrink-0 ml-2 animate-in fade-in zoom-in duration-300">
                        <div className="w-6 h-6 bg-emerald-green rounded-full flex items-center justify-center">
                            <CheckCircle size={14} className="text-white" strokeWidth={3} />
                        </div>
                    </div>
                )}
            </div>

            {/* Tap Target / Link */}
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
