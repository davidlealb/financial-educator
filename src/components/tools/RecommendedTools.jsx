import { ExternalLink, Star } from 'lucide-react';

const tools = [
    {
        name: 'Scotiabank StartRight Program',
        description: 'Newcomer banking package with no monthly fees for first year.',
        url: 'https://www.scotiabank.com/ca/en/personal/bank-accounts/chequing-accounts/startright-program.html',
        badge: 'No Fees'
    },
    {
        name: 'TD Newcomer Accounts',
        description: 'Unlimited transactions and free Interac e-Transfers.',
        url: 'https://www.td.com/ca/en/personal-banking/solutions/new-to-canada',
        badge: 'Unlimited'
    },
    {
        name: 'BMO NewStart Program',
        description: 'Welcome bonus and waived monthly fees for eligible newcomers.',
        url: 'https://www.bmo.com/main/personal/bank-accounts/newcomers-to-canada/',
        badge: 'Bonus'
    }
];

export default function RecommendedTools() {
    return (
        <div className="bg-surface rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Star size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-text-primary">Recommended Tools</h3>
                    <p className="text-xs text-text-secondary">Trusted banking options for newcomers to Canada.</p>
                </div>
            </div>

            <div className="space-y-3">
                {tools.map((tool, idx) => (
                    <a
                        key={idx}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-slate-200 hover:border-primary hover:bg-slate-50 transition-all group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </h4>
                                    {tool.badge && (
                                        <span className="text-xs font-bold px-2 py-0.5 bg-emerald-green/10 text-emerald-green rounded-full">
                                            {tool.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-text-secondary">{tool.description}</p>
                            </div>
                            <ExternalLink size={16} className="text-text-muted group-hover:text-primary transition-colors ml-3 mt-1 flex-shrink-0" />
                        </div>
                    </a>
                ))}
            </div>

            <p className="text-xs text-text-muted mt-4 italic">
                💡 These are educational recommendations. Always compare options before opening an account.
            </p>
        </div>
    );
}
