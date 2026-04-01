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
    'w-full bg-secondary/40 border border-border/60 rounded-2xl px-4 py-3.5 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 transition-all duration-250';

  return (
    <PageWrapper>
      <header className="mb-8">
        <h1 className="text-[26px] font-semibold text-foreground tracking-tight">Zakat Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Calculate your annual zakat obligation</p>
      </header>

      <div className="space-y-5">
        <div className="card-elevated p-6 space-y-5">
          <h2 className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">Assets</h2>
          {[
            { label: 'Cash & Bank Balances', value: cash, set: setCash },
            { label: 'Gold Value', value: gold, set: setGold },
            { label: 'Silver Value', value: silver, set: setSilver },
            { label: 'Investments & Stocks', value: investments, set: setInvestments },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">{f.label}</label>
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

        <div className="card-elevated p-6 space-y-5">
          <h2 className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">Liabilities</h2>
          <div>
            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">Debts & Obligations</label>
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

        <div className="card-elevated p-6 space-y-5">
          <h2 className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">Nisab Standard</h2>
          <div className="flex gap-2">
            {[true, false].map((isGold) => (
              <button
                key={String(isGold)}
                onClick={() => setUseGoldNisab(isGold)}
                className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all duration-250 tap-scale ${
                  useGoldNisab === isGold ? 'gradient-gold text-accent-foreground shadow-lg' : 'bg-secondary/50 text-muted-foreground'
                }`}
              >
                {isGold ? 'Gold' : 'Silver'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">Gold $/g</label>
              <input type="number" value={goldPrice} onChange={(e) => setGoldPrice(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">Silver $/g</label>
              <input type="number" value={silverPrice} onChange={(e) => setSilverPrice(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`card-elevated p-8 text-center ${result.zakatDue ? 'glow-gold' : ''}`}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 font-medium">Your Zakat</p>
          <p className={`text-[42px] font-semibold tabular-nums leading-none ${result.zakatDue ? 'text-gold' : 'text-foreground'}`}>
            ${result.zakat.toFixed(2)}
          </p>
          <div className="h-px bg-border/30 my-5" />
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Nisab: ${result.nisab.toFixed(0)}</span>
            <span>Net: ${result.total.toFixed(0)}</span>
          </div>
          {!result.zakatDue && result.total > 0 && (
            <p className="text-xs text-emerald-glow mt-4">Below nisab threshold</p>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
