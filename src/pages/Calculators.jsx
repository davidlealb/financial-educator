import { useState } from 'react';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';
import RecommendedTools from '../components/tools/RecommendedTools';

export default function Calculators() {
    const [income, setIncome] = useState('');

    const rules = income ? [
        { label: "Needs (50%)", amount: income * 0.5, color: "bg-blue-500" },
        { label: "Wants (30%)", amount: income * 0.3, color: "bg-purple-500" },
        { label: "Savings (20%)", amount: income * 0.2, color: "bg-green-500" },
    ] : [];

    return (
        <div className="space-y-6">
            <header className="pt-4">
                <h1 className="text-2xl font-bold text-text-primary">Calculators</h1>
                <p className="text-text-secondary">Simple tools for better money management.</p>
            </header>

            <div className="bg-surface rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-primary">50/30/20 Rule</h3>
                        <p className="text-xs text-text-secondary">Divide your income into needs, wants, and savings.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Monthly After-Tax Income</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {income > 0 && (
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            {rules.map((rule, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-3 h-3 rounded-full ${rule.color}`} />
                                        <span className="font-medium text-text-primary">{rule.label}</span>
                                    </div>
                                    <span className="font-bold text-text-primary">${rule.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Debt Trap Calculator */}
            <DebtTrapCalculator />

            {/* Recommended Tools */}
            <RecommendedTools />
        </div>
    );
}

function DebtTrapCalculator() {
    const [balance, setBalance] = useState('');
    const [rate, setRate] = useState('19.99');
    const [months, setMonths] = useState('12');

    const calculateDebtScenario = () => {
        let currentBalance = parseFloat(balance);
        let totalInterestPaid = 0;
        let r = parseFloat(rate) / 100 / 12;
        let m = parseInt(months);

        if (!currentBalance || !r || !m) return 0;

        for (let i = 0; i < m; i++) {
            let interest = currentBalance * r;
            totalInterestPaid += interest;
            let minPayment = Math.max(currentBalance * 0.03, 10); // 3% or $10 min
            let principal = minPayment - interest;
            currentBalance -= principal;
        }
        return totalInterestPaid;
    };

    const interestPaid = calculateDebtScenario();

    return (
        <div className="bg-surface rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-text-primary">The Debt Trap</h3>
                    <p className="text-xs text-text-secondary">See how credit card interest adds up.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Card Balance</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                            <input
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                placeholder="1000"
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Interest Rate (%)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            placeholder="19.99"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Time Period (Months)</label>
                    <input
                        type="range"
                        min="1"
                        max="60"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-right text-sm text-text-secondary mt-1">{months} Months</div>
                </div>

                {balance > 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            If you only make minimum payments for <strong>{months} months</strong>, you will pay approximately <strong className="text-lg">${interestPaid.toFixed(2)}</strong> in interest alone.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
