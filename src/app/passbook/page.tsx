'use client';

import React, { useState } from 'react';
import {
  BookOpenCheck,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Calendar,
  FileSpreadsheet,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { MeeBhoomiCard } from '@/components/MeeBhoomiCard';
import { formatINR } from '@/lib/utils';
import { FinancialEntry, Season } from '@/types';

export default function PassbookPage() {
  const { language, t } = useLanguage();
  const { ledgerEntries, addLedgerEntry, deleteLedgerEntry, farm, farmer, activeCrop } = useFarm();

  const [showAddModal, setShowAddModal] = useState(false);
  const [entryType, setEntryType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [category, setCategory] = useState('FERTILIZER');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  // Computations
  const totalExpenses = ledgerEntries
    .filter((e) => e.type === 'EXPENSE')
    .reduce((acc, e) => acc + e.amount, 0);

  const totalIncome = ledgerEntries
    .filter((e) => e.type === 'INCOME')
    .reduce((acc, e) => acc + e.amount, 0);

  const netProfit = totalIncome - totalExpenses;
  const costPerAcre = Math.round(totalExpenses / Math.max(1, farm.boundary.areaAcres));

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newEntry: FinancialEntry = {
      id: `led-${Date.now()}`,
      farmId: farm.id,
      season: 'KHARIF',
      year: 2025,
      type: entryType,
      category: category as any,
      categoryTe: category,
      title,
      amount: parseFloat(amount),
      date,
      notes,
    };

    addLedgerEntry(newEntry);
    setTitle('');
    setAmount('');
    setNotes('');
    setShowAddModal(false);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner (Hidden on Print) */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-earth-100 text-earth-900 text-xs font-bold mb-2">
            <BookOpenCheck className="w-4 h-4 text-earth-700" />
            <span>{language === 'te' ? 'రైతు అధికారిక డిజిటల్ లెడ్జర్' : 'Official Digital Farm Passbook'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.passbook.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.passbook.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.passbook.addExpense}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{t.passbook.printPassbook}</span>
          </button>
        </div>
      </div>

      {/* AP MeeBhoomi Official Land Records Integration */}
      <MeeBhoomiCard className="no-print" />

      {/* Government Land Record Disclaimer (Visible on Screen & Print) */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 font-semibold">
        <div className="flex items-center gap-2">
          <BookOpenCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            {language === 'te'
              ? 'ప్రభుత్వ భూమి రికార్డు అనుసంధానం అందుబాటులో లేదు. అధికారిక రికార్డుల కోసం AP మీభూమి పోర్టల్ ఉపయోగించండి.'
              : 'Government land-record integration unavailable. Please use the official government portal.'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg self-start sm:self-auto">
          Self-Reported Farm Operational Ledger
        </span>
      </div>

      {/* Printable Digital Farmer Passbook Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
        {/* Passbook Title & Farmer Header */}
        <div className="border-b-2 border-farm-700 pb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-farm-900 tracking-tight">
                {language === 'te' ? 'రైతు డిజిటల్ లెడ్జర్ (వ్యక్తిగత ఖర్చులు)' : 'RYTHU FARM EXPENSE & REVENUE LEDGER'}
              </span>
              <span className="px-2 py-0.5 rounded bg-farm-700 text-white text-xs font-black">
                2025–2026
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">
              {language === 'te'
                ? 'రైతు స్వయం-నిర్వహిత సాగు లావాదేవీల రికార్డు (ప్రభుత్వ యాజమాన్య ధృవీకరణ కాదు)'
                : 'Self-reported farmer agronomic expense and yield log (Not an official title document)'}
            </p>
          </div>

          <div className="text-right text-xs space-y-0.5">
            <p className="font-bold text-gray-900">
              {farmer.nameTelugu} ({farmer.name})
            </p>
            <p className="text-gray-600">
              {farmer.village}, {farmer.mandal}, {farmer.district}
            </p>
            <p className="font-mono text-gray-700">
              Survey No: {farm.surveyNumber} • {farm.boundary.areaAcres} {t.dashboard.acres}
            </p>
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] font-bold text-rose-800 uppercase block">
              {t.passbook.totalExpenses}
            </span>
            <span className="text-2xl font-black text-rose-900 mt-1 block">
              {formatINR(totalExpenses)}
            </span>
            <span className="text-[10px] text-rose-700 font-medium mt-0.5 block">
              {costPerAcre} / acre
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-800 uppercase block">
              {t.passbook.grossRevenue}
            </span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {formatINR(totalIncome)}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
              Mandi / MSP Sales
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <span className="text-[11px] font-bold text-blue-800 uppercase block">
              {t.passbook.netProfit}
            </span>
            <span className="text-2xl font-black text-blue-900 mt-1 block">
              {formatINR(netProfit)}
            </span>
            <span className="text-[10px] text-blue-700 font-medium mt-0.5 block">
              Net Positive Margin
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-bold text-gray-600 uppercase block">
              {t.dashboard.activeCrop}
            </span>
            <span className="text-lg font-black text-gray-900 mt-1 block">
              {activeCrop.cropNameTe}
            </span>
            <span className="text-[10px] text-gray-500 font-medium mt-0.5 block">
              {farm.boundary.areaAcres} {t.dashboard.acres} ({farm.soilType.replace('_', ' ')})
            </span>
          </div>
        </div>

        {/* Ledger Transaction History Table */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">
              {t.passbook.ledgerHistory}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {ledgerEntries.length} {language === 'te' ? 'నమోదులు' : 'entries'}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                  <th className="p-3 rounded-l-lg">{t.passbook.date}</th>
                  <th className="p-3">{t.passbook.category}</th>
                  <th className="p-3">Description / Voucher</th>
                  <th className="p-3">{t.passbook.amount}</th>
                  <th className="p-3 rounded-r-lg text-right no-print">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ledgerEntries.map((entry) => {
                  const isExpense = entry.type === 'EXPENSE';

                  return (
                    <tr key={entry.id} className="hover:bg-gray-50/80">
                      <td className="p-3 font-medium text-gray-600 whitespace-nowrap">
                        {entry.date}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isExpense
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {entry.category}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-gray-900">
                        {entry.title}
                        {entry.notes && (
                          <span className="block text-[11px] font-normal text-gray-500">
                            {entry.notes}
                          </span>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`font-black text-sm ${
                            isExpense ? 'text-rose-700' : 'text-emerald-700'
                          }`}
                        >
                          {isExpense ? '-' : '+'} {formatINR(entry.amount)}
                        </span>
                      </td>
                      <td className="p-3 text-right no-print">
                        <button
                          type="button"
                          onClick={() => deleteLedgerEntry(entry.id)}
                          className="p-1 rounded text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Passbook Certification & Government Disclaimer Footer */}
        <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap justify-between items-center text-xs text-gray-500 gap-3">
          <div>
            <p className="font-bold text-gray-800">
              {language === 'te' ? 'రైతు స్వయం-నిర్వహిత డిజిటల్ లెడ్జర్' : 'Farmer Self-Maintained Operational Ledger'}
            </p>
            <p className="text-[11px] text-gray-500">
              {language === 'te'
                ? 'వ్యక్తిగత సాగు ఖర్చులు & ఆదాయ నమోదుల నివేదిక'
                : 'Personal agronomic crop expense and revenue records'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              {language === 'te'
                ? 'ప్రభుత్వ భూమి రికార్డు అనుసంధానం అందుబాటులో లేదు. అధికారిక ప్రభుత్వ పోర్టల్ ఉపయోగించండి.'
                : 'Government land-record integration unavailable. Please use the official government portal.'}
            </p>
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              {language === 'te' ? 'ఆర్థిక లావాదేవీ నమోదు' : 'Add Financial Transaction'}
            </h3>

            <form onSubmit={handleCreateEntry} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEntryType('EXPENSE')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    entryType === 'EXPENSE'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Expense (ఖర్చు)
                </button>
                <button
                  type="button"
                  onClick={() => setEntryType('INCOME')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    entryType === 'INCOME'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Income (ఆదాయం)
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.passbook.category}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-farm-500"
                >
                  <option value="SEEDS">Seeds / Seedlings (విత్తనాలు)</option>
                  <option value="FERTILIZER">Fertilizer (ఎరువులు)</option>
                  <option value="PESTICIDE">Pesticides / IPM (మందులు)</option>
                  <option value="LABOR">Labor (కూలీల ఖర్చులు)</option>
                  <option value="TRACTOR_MACHINERY">Tractor & Machinery (ట్రాక్టర్)</option>
                  <option value="IRRIGATION">Irrigation & Power (నీటి తడి)</option>
                  <option value="HARVEST_SALE">Harvest Sale / Mandi (అమ్మకం)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Description / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Urea & DAP bags from PACS"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.passbook.amount} (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 14500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.passbook.date}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Notes / Receipt Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. PACS Receipt #8812"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-md"
                >
                  {t.passbook.saveEntry}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
