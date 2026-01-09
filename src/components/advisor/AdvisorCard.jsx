import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, RefreshCw } from 'lucide-react';

const AdvisorCard = ({ advisor, onRefresh, loading }) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="bg-surface rounded-2xl p-6 shadow-soft animate-pulse border border-slate-100">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 bg-slate-200 rounded-full" />
                    <div className="h-6 w-3/4 bg-slate-200 rounded" />
                    <div className="h-4 w-1/2 bg-slate-200 rounded" />
                    <div className="flex space-x-4 w-full pt-4">
                        <div className="h-12 flex-1 bg-slate-200 rounded-xl" />
                        <div className="h-12 flex-1 bg-slate-200 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!advisor) return null;

    return (
        <div className="bg-surface rounded-2xl p-6 shadow-soft border border-slate-100 transform transition-all hover:scale-[1.01]">
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Advisor Image */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-green to-deep-navy rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    {advisor.photoUrl ? (
                        <img
                            src={advisor.photoUrl}
                            alt={advisor.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(advisor.name) + '&background=0D9488&color=fff';
                            }}
                            className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
                        />
                    ) : (
                        <div className="relative w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm">
                            <span className="text-3xl font-bold text-emerald-green">
                                {advisor.name?.charAt(0)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Advisor Bio */}
                <div>
                    <h3 className="text-xl font-bold text-deep-navy">{advisor.name}</h3>
                    <p className="text-emerald-green font-medium">{advisor.title}</p>
                    {advisor.bio && (
                        <p className="mt-2 text-text-muted text-sm line-clamp-3">
                            {advisor.bio}
                        </p>
                    )}
                </div>

                {/* Contact Buttons */}
                <div className="flex space-x-3 w-full pt-4">
                    <a
                        href={`mailto:${advisor.email}`}
                        className="flex-1 flex items-center justify-center space-x-2 bg-emerald-green text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
                    >
                        <Mail size={18} />
                        <span>{t('common.email')}</span>
                    </a>
                    <a
                        href={`tel:${advisor.phone}`}
                        className="flex-1 flex items-center justify-center space-x-2 bg-deep-navy text-white py-3 px-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        <Phone size={18} />
                        <span>{t('common.call')}</span>
                    </a>
                </div>

                {/* Reshuffle Button */}
                <button
                    onClick={onRefresh}
                    className="mt-6 flex items-center space-x-2 text-text-muted hover:text-deep-navy transition-colors text-sm font-medium"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    <span>{t('common.try_another_advisor')}</span>
                </button>
            </div>
        </div>
    );
};

export default AdvisorCard;
