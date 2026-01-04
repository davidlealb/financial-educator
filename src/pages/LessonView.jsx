import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronRight, Check, X, ArrowLeft, Loader2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useLessons } from '../hooks/useLessons';

export default function LessonView() {
    const { t } = useTranslation();
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { completeLesson } = useProgress();
    const { lessons, loading } = useLessons();

    const lesson = useMemo(() => lessons.find(l => l.id === lessonId), [lessons, lessonId]);

    // Combined slides: Content first, then Quiz questions
    const slides = useMemo(() => {
        if (!lesson) return [];
        const contentSlides = (lesson.content || []).map(c => ({ type: 'content', data: c }));
        const quizSlides = (lesson.quiz || []).map(q => ({ type: 'quiz', data: q }));
        return [...contentSlides, ...quizSlides];
    }, [lesson]);

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [score, setScore] = useState(0);
    const [shouldShake, setShouldShake] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <Loader2 className="text-primary animate-spin mb-4" size={40} />
                <p className="text-text-secondary font-bold">{t('common.loading')}</p>
            </div>
        );
    }

    if (!lesson) return <Navigate to="/" />;
    if (slides.length === 0) return <Navigate to="/" />;

    const currentSlide = slides[currentSlideIndex];
    const isLastSlide = currentSlideIndex === slides.length - 1;
    const progress = ((currentSlideIndex) / slides.length) * 100;

    const handleNext = () => {
        if (isLastSlide) {
            // Calculate final score percentage
            const totalQuestions = lesson.quiz.length;
            const finalScore = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;

            completeLesson(lesson.id, finalScore, lesson.xpReward);
            navigate('/');
        } else {
            setCurrentSlideIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
            setShouldShake(false);
        }
    };

    const checkAnswer = () => {
        if (currentSlide.type === 'quiz') {
            setIsAnswerChecked(true);
            if (selectedOption === currentSlide.data.correctAnswerIndex) {
                setScore(prev => prev + 1);
            } else {
                // Trigger shake animation for incorrect answer
                setShouldShake(true);
                setTimeout(() => setShouldShake(false), 500);
            }
        } else {
            handleNext();
        }
    };

    // Render Content Slide
    const renderContent = (content) => (
        <div className="flex flex-col h-full justify-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-3xl font-bold text-primary">{content.title}</h2>
            <p className="text-lg text-text-primary leading-relaxed">{content.text}</p>
        </div>
    );

    // Render Quiz Slide
    const renderQuiz = (question) => {
        const isCorrect = selectedOption === question.correctAnswerIndex;

        return (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-text-primary mb-6">{question.question}</h2>

                <div className="space-y-3">
                    {question.options.map((option, idx) => {
                        let optionClass = "w-full p-4 rounded-xl border-2 text-left font-medium transition-all ";

                        if (isAnswerChecked) {
                            if (idx === question.correctAnswerIndex) {
                                optionClass += "bg-green-100 border-green-500 text-green-700";
                            } else if (idx === selectedOption) {
                                optionClass += `bg-red-100 border-red-500 text-red-700 ${shouldShake ? 'animate-shake' : ''}`;
                            } else {
                                optionClass += "bg-surface border-slate-200 text-text-muted opacity-50";
                            }
                        } else {
                            if (selectedOption === idx) {
                                optionClass += "bg-blue-50 border-blue-500 text-blue-700 shadow-sm";
                            } else {
                                optionClass += "bg-surface border-slate-200 hover:border-blue-300 hover:bg-slate-50";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => !isAnswerChecked && setSelectedOption(idx)}
                                disabled={isAnswerChecked}
                                className={optionClass}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {isAnswerChecked && (
                    <div className={`mt-6 p-4 rounded-lg flex items-start space-x-3 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        <div className="mt-1">
                            {isCorrect ? <Check size={20} /> : <X size={20} />}
                        </div>
                        <div>
                            <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                            <p className="text-sm mt-1 opacity-90">{question.explanation}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center space-x-4 border-b border-slate-100 bg-surface z-10">
                <button onClick={() => navigate('/')} className="text-text-muted hover:text-text-primary">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto pb-24">
                {currentSlide.type === 'content'
                    ? renderContent(currentSlide.data)
                    : renderQuiz(currentSlide.data)
                }
            </div>

            {/* Footer / Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-slate-100 max-w-md mx-auto">
                {currentSlide.type === 'content' ? (
                    <button
                        onClick={handleNext}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center space-y-2 flex-col"
                    >
                        <span>{t('common.continue')}</span>
                        <ChevronRight size={20} />
                    </button>
                ) : (
                    !isAnswerChecked ? (
                        <button
                            onClick={checkAnswer}
                            disabled={selectedOption === null}
                            className="w-full bg-primary disabled:bg-slate-300 disabled:text-slate-500 hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
                        >
                            {t('common.check_answer')}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className={`w-full font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 ${selectedOption === currentSlide.data.correctAnswerIndex
                                ? 'bg-secondary hover:bg-secondary-dark text-white shadow-secondary/30'
                                : 'bg-primary hover:bg-primary-dark text-white shadow-primary/30' // Continue anyway
                                }`}
                        >
                            <span>{isLastSlide ? t('common.finish_lesson') : t('common.continue')}</span>
                            <ChevronRight size={20} />
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
