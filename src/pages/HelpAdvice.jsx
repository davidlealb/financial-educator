import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRandomAdvisor } from '../hooks/useRandomAdvisor';
import AdvisorCard from '../components/advisor/AdvisorCard';
import Header from '../components/layout/Header';

const HelpAdvice = () => {
    const { t } = useTranslation();
    const { advisor, loading, refresh } = useRandomAdvisor();

    return (
        <div className="pb-24">
            <Header />

            <main className="px-6 pt-24 max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-deep-navy mb-2">
                        {t('common.help_advice')}
                    </h1>
                    <p className="text-text-muted">
                        {t('common.talk_to_advisor')}
                    </p>
                </div>

                <section>
                    <AdvisorCard
                        advisor={advisor}
                        loading={loading}
                        onRefresh={refresh}
                    />
                </section>

                <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic text-sm text-text-muted text-center">
                    {t('common.footer_motivation')}
                </div>
            </main>
        </div>
    );
};

export default HelpAdvice;
