import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';

const NISAB_GOLD_GRAMS = 85;
const NISAB_SILVER_GRAMS = 595;

export default function ZakatPage() {
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [investments, setInvestments] = useState('');
  const [debts, setDebts] = useState('');
  const [goldPrice, setGoldPrice] = useState('65');
  const [silverPrice, setSilverPrice] = useState('0.80');
  const [useGoldNisab, setUseGoldNisab] = useState(true);

  const result = useMemo(() => {
    const total =
      (parseFloat(cash) || 0) +
      (parseFloat(gold) || 0) +
      (parseFloat(silver) || 0) +
      (parseFloat(investments) || 0) -
      (parseFloat(debts) || 0);

    const nisab = useGoldNisab
      ? NISAB_GOLD_GRAMS * (parseFloat(goldPrice) || 0)
      : NISAB_SILVER_GRAMS * (parseFloat(silverPrice) || 0);

    const zakatDue = total >= nisab;
    const zakat = zakatDue ? total * 0.025 : 0;
    return { total, nisab, zakatDue, zakat };
  }, [cash, gold, silver, investments, debts, goldPrice, silverPrice, useGoldNisab]);

  const inputClass =
    'w-full glass rounded-lg px-4 py-3.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-light/30 focus:border-emerald-light/50 transition-all duration-200 font-medium';

  return (
    <PageWrapper>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <header className="mb-8">
          <h1 className="text-[26px] font-semibold text-foreground tracking-tight">Zakat Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1.5 font-medium">Calculate your annual zakat obligation</p>
        </header>

        <div className="space-y-6">
          <div className="card-glass p-7 space-y-5">
            <h2 className="text-[11px] font-semibold text-emerald-light uppercase tracking-[0.2em]">Assets</h2>
            {[
              { label: 'Cash & Bank Balances', value: cash, set: setCash },
              { label: 'Gold Value', value: gold, set: setGold },
              { label: 'Silver Value', value: silver, set: setSilver },
              { label: 'Investments & Stocks', value: investments, set: setInvestments },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[11px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">{f.label}</label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          <div className="card-glass p-7 space-y-5">
            <h2 className="text-[11px] font-semibold text-emerald-light uppercase tracking-[0.2em]">Liabilities</h2>
            <div>
              <label className="text-[11px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">Debts & Obligations</label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="card-glass p-7 space-y-5">
            <h2 className="text-[11px] font-semibold text-emerald-light uppercase tracking-[0.2em]">Nisab Standard</h2>
            <div className="flex gap-2 glass rounded-xl p-1.5">
              {[true, false].map((isGold) => (
                <button
                  key={String(isGold)}
                  onClick={() => setUseGoldNisab(isGold)}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 tap-scale ${
                    useGoldNisab === isGold 
                      ? 'bg-gradient-emerald text-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isGold ? 'Gold' : 'Silver'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">Gold $/g</label>
                <input type="number" value={goldPrice} onChange={(e) => setGoldPrice(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">Silver $/g</label>
                <input type="number" value={silverPrice} onChange={(e) => setSilverPrice(e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`card-glass p-8 text-center hover:glow-emerald-strong active:scale-95 transition-all ${result.zakatDue ? 'glow-emerald-strong border-emerald-light/20' : ''}`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-light/60 mb-3 font-semibold">Your Zakat Due</p>
            <p className={`text-5xl font-bold tabular-nums leading-none mb-6 ${result.zakatDue ? 'text-emerald-light drop-shadow-lg' : 'text-muted-foreground'}`}>
              ${result.zakat.toFixed(2)}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-light/20 to-transparent mb-5" />
            <div className="flex justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Nisab: <span className="text-foreground">${result.nisab.toFixed(0)}</span></span>
              <span>Net: <span className="text-foreground">${result.total.toFixed(0)}</span></span>
            </div>
            {!result.zakatDue && result.total > 0 && (
              <p className="text-xs text-emerald-light/70 mt-4 font-medium">Below nisab threshold</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
