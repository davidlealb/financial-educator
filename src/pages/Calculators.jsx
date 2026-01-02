import { useState } from 'react';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';

function IncomeTaxCalculator() {
    const [salary, setSalary] = useState('');
    const [province, setProvince] = useState('ON');

    const taxData = {
        FED: [
            { threshold: 55867, rate: 0.15 },
            { threshold: 111733, rate: 0.205 },
            { threshold: 173205, rate: 0.26 },
            { threshold: 246752, rate: 0.29 },
            { threshold: Infinity, rate: 0.33 }
        ],
        ON: [
            { threshold: 51446, rate: 0.0505 },
            { threshold: 102894, rate: 0.0915 },
            { threshold: 150000, rate: 0.1116 },
            { threshold: 220000, rate: 0.1216 },
            { threshold: Infinity, rate: 0.1316 }
        ],
        BC: [
            { threshold: 47937, rate: 0.0506 },
            { threshold: 95875, rate: 0.077 },
            { threshold: 110076, rate: 0.105 },
            { threshold: 133664, rate: 0.1229 },
            { threshold: 162354, rate: 0.147 },
            { threshold: 227091, rate: 0.168 },
            { threshold: Infinity, rate: 0.205 }
        ],
        AB: [
            { threshold: 148269, rate: 0.10 },
            { threshold: 177922, rate: 0.12 },
            { threshold: 237230, rate: 0.13 },
            { threshold: 355845, rate: 0.14 },
            { threshold: Infinity, rate: 0.15 }
        ],
        QC: [
            { threshold: 51780, rate: 0.14 },
            { threshold: 103545, rate: 0.19 },
            { threshold: 126000, rate: 0.24 },
            { threshold: Infinity, rate: 0.2575 }
        ],
        // Adding simplified versions for others to keep it concise but usable
        MB: [{ threshold: 47000, rate: 0.108 }, { threshold: 100000, rate: 0.1275 }, { threshold: Infinity, rate: 0.174 }],
        SK: [{ threshold: 52056, rate: 0.105 }, { threshold: 148734, rate: 0.125 }, { threshold: Infinity, rate: 0.145 }],
        NS: [{ threshold: 29590, rate: 0.0879 }, { threshold: 59180, rate: 0.1495 }, { threshold: Infinity, rate: 0.21 }],
        NB: [{ threshold: 47936, rate: 0.0968 }, { threshold: 95874, rate: 0.1482 }, { threshold: Infinity, rate: 0.203 }],
        NL: [{ threshold: 43198, rate: 0.087 }, { threshold: 86395, rate: 0.145 }, { threshold: Infinity, rate: 0.218 }],
        PE: [{ threshold: 32656, rate: 0.098 }, { threshold: 65313, rate: 0.133 }, { threshold: Infinity, rate: 0.167 }],
        YT: [{ threshold: 55867, rate: 0.064 }, { threshold: 111733, rate: 0.09 }, { threshold: Infinity, rate: 0.15 }],
        NT: [{ threshold: 50597, rate: 0.059 }, { threshold: 101198, rate: 0.086 }, { threshold: Infinity, rate: 0.1405 }],
        NU: [{ threshold: 50597, rate: 0.04 }, { threshold: 101198, rate: 0.07 }, { threshold: Infinity, rate: 0.115 }],
    };

    const calculateTax = (amount, brackets) => {
        let tax = 0;
        let prevThreshold = 0;
        for (const bracket of brackets) {
            const taxableInThisBracket = Math.max(0, Math.min(amount, bracket.threshold) - prevThreshold);
            tax += taxableInThisBracket * bracket.rate;
            if (amount <= bracket.threshold) break;
            prevThreshold = bracket.threshold;
        }
        return tax;
    };

    const salaryNum = parseFloat(salary) || 0;
    const fedTax = calculateTax(salaryNum, taxData.FED);
    const provTax = calculateTax(salaryNum, taxData[province] || taxData.ON);

    // 2024 CPP and EI
    const cpp = Math.min(salaryNum * 0.0595, 3867.50);
    const ei = Math.min(salaryNum * 0.0166, 1049.12);

    // Total Deductions
    const totalDeductions = fedTax + provTax + cpp + ei;
    const takeHome = Math.max(0, salaryNum - totalDeductions);

    return (
        <section className="bg-surface p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/5 text-primary rounded-lg">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-text-primary">Income Tax Estimator</h3>
                    <p className="text-xs text-text-secondary">2024 Federal & Provincial Take-home</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Annual Gross Salary</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="e.g. 60000"
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Province/Territory</label>
                    <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-primary outline-none transition-all appearance-none bg-white"
                    >
                        <option value="ON">Ontario</option>
                        <option value="BC">British Columbia</option>
                        <option value="AB">Alberta</option>
                        <option value="QC">Quebec</option>
                        <option value="MB">Manitoba</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="YT">Yukon</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                    </select>
                </div>
            </div>

            {salaryNum > 0 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                            <p className="text-xs text-text-secondary mb-1">Monthly Net</p>
                            <p className="text-xl font-bold text-primary">${(takeHome / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                            <p className="text-xs text-text-secondary mb-1">Annual Net</p>
                            <p className="text-xl font-bold text-primary">${takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Federal Tax</span>
                            <span className="font-medium text-text-primary">-${fedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Provincial Tax</span>
                            <span className="font-medium text-text-primary">-${provTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">CPP & EI</span>
                            <span className="font-medium text-text-primary">-${(cpp + ei).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

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
                <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                    Calculators 🇨🇦
                </h1>
                <p className="text-text-secondary">Refining your Canadian financial plan.</p>
            </header>

            <div className="space-y-6">
                {/* Income Tax Calculator */}
                <IncomeTaxCalculator />

                {/* Budget Calculator */}
                <section className="bg-surface p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-primary/5 text-primary rounded-lg">
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
                </section>

                {/* Debt Trap Calculator */}
                <DebtTrapCalculator />
            </div>
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
