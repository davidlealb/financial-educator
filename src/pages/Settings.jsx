import { Trash2, Share2, AlertTriangle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useTranslation } from 'react-i18next';

export default function Settings() {
    const { t } = useTranslation();
    const { resetProgress, state } = useProgress();

    const handleReset = () => {
        if (confirm(t('common.reset_confirm'))) {
            resetProgress();
            alert(t('common.reset_success'));
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: t('common.share_title'),
            text: t('common.share_text'),
            url: window.location.origin,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <div className="space-y-6">
            <header className="mb-6 pt-4">
                <h1 className="text-2xl font-bold text-text-primary">{t('common.settings')}</h1>
                <p className="text-text-secondary">{t('common.manage_preferences')}</p>
            </header>

            {/* Share Section */}
            <div className="bg-surface rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-text-primary">{t('common.share_app')}</h3>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {t('common.share_desc')}
                            </p>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center space-x-2 bg-emerald-green text-white hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm"
                        >
                            <Share2 size={16} />
                            <span>{t('common.share_button')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-surface rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-text-primary">{t('common.data_management')}</h3>
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-primary">{t('common.reset_progress')}</p>
                            <p className="text-xs text-text-muted">{t('common.current_xp', { xp: state.xp })}</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="flex items-center space-x-2 text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                            <Trash2 size={16} />
                            <span>{t('common.reset_data')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 flex items-start space-x-3">
                <AlertTriangle className="text-orange-500 shrink-0" size={20} />
                <div className="text-sm text-orange-800">
                    <p className="font-bold">{t('common.note_on_persistence')}</p>
                    <p className="mt-1">
                        {t('common.persistence_desc')}
                    </p>
                </div>
            </div>

            <div className="text-center text-text-muted text-sm pt-8">
                <p>Financial Educator v1.0.0</p>
            </div>
        </div>
    );
}
