import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

/**
 * LevelAccordion Component
 * 
 * An interactive accordion for curriculum levels.
 * Features:
 * - Progress bar in the header
 * - Smooth framer-motion animations
 * - Summary of lessons completed
 */
export default function LevelAccordion({ level, lessons, completedCount, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const totalLessons = lessons.length;
    const progressPercentage = (completedCount / totalLessons) * 100;
    const isLevelComplete = completedCount === totalLessons && totalLessons > 0;

    return (
        <div className="bg-surface rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300">
            {/* Header / Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-6 text-left flex flex-col gap-3 hover:bg-slate-50 transition-colors focus:outline-none"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl flex items-center justify-center
                                        ${isLevelComplete ? 'bg-emerald-green text-white' : 'bg-slate-100 text-text-secondary'}`}>
                            {isLevelComplete ? <CheckCircle2 size={18} strokeWidth={2.5} /> : <span className="text-xs font-bold font-sans">0{level.id}</span>}
                        </div>
                        <div>
                            <h2 className={`text-sm font-black uppercase tracking-widest leading-none ${isLevelComplete ? 'text-emerald-green' : 'text-text-primary'}`}>
                                {level.title.split(': ')[0]}
                            </h2>
                            <p className="text-xs font-medium text-text-muted mt-1">
                                {level.title.split(': ')[1] || level.title}
                            </p>
                        </div>
                    </div>
                    {isOpen ? <ChevronUp size={20} className="text-text-muted" /> : <ChevronDown size={20} className="text-text-muted" />}
                </div>

                {/* Progress Bar Area */}
                <div className="flex flex-col gap-1.5 px-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-text-muted uppercase">
                        <span>Progress</span>
                        <span className={isLevelComplete ? 'text-emerald-green' : ''}>
                            {completedCount}/{totalLessons} Lessons Done
                        </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${isLevelComplete ? 'bg-emerald-green' : 'bg-primary'}`}
                        />
                    </div>
                </div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-5 pb-6 space-y-3">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
