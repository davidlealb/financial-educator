import { useState } from 'react';
import { DollarSign, PieChart } from 'lucide-react';

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
        </div>
    );
}
