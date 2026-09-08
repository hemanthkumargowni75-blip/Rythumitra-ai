'use client';

import React, { useState } from 'react';
import { X, Sprout, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCropTranslations } from '@/data/cropTranslations';
import { CropCategory } from '@/types';

interface AdminCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCropAdded: () => void;
}

export function AdminCropModal({ isOpen, onClose, onCropAdded }: AdminCropModalProps) {
  const { language } = useLanguage();
  const tCrop = getCropTranslations(language);

  const [cropId, setCropId] = useState('');
  const [cropNameEn, setCropNameEn] = useState('');
  const [cropNameTe, setCropNameTe] = useState('');
  const [cropNameHi, setCropNameHi] = useState('');
  const [category, setCategory] = useState<CropCategory>('VEGETABLE');
  const [scientificName, setScientificName] = useState('');
  const [durationDays, setDurationDays] = useState('120');
  const [waterRequirementMm, setWaterRequirementMm] = useState('500');
  const [expectedYield, setExpectedYield] = useState('15 - 20 Tonnes');
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [aliases, setAliases] = useState('');
  const [summary, setSummary] = useState('');

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setLoading(true);

    try {
      const payload = {
        id: cropId.trim().toLowerCase().replace(/\s+/g, '-'),
        category,
        scientificName: scientificName.trim(),
        iconEmoji: '🌱',
        durationDays: Number(durationDays),
        waterRequirementMm: Number(waterRequirementMm),
        expectedYieldPerAcre: expectedYield.trim(),
        riskLevel,
        aliases: aliases.split(',').map((s) => s.trim()).filter(Boolean),
        translations: {
          en: {
            name: cropNameEn || cropId,
            localNames: [cropNameEn, cropId].filter(Boolean),
            whatIsThis: summary || `${cropNameEn} is a high-demand crop registered in RythuMitra AI.`,
            growingSeason: 'Kharif and Rabi seasons with adequate irrigation.',
            soilRequirements: 'Well-drained fertile loamy soils.',
            waterRequirements: `${waterRequirementMm} mm water throughout season.`,
            mainStages: ['Vegetative Growth', 'Flowering & Fruiting', 'Harvesting'],
            whatToMonitor: ['Leaf health', 'Pest symptoms', 'Soil moisture'],
            commonPestsAndDiseases: ['Common aphids', 'Leaf spot'],
            generalCare: 'Follow standard regional agronomy package of practices.',
            whenToContactExpert: 'Contact agricultural extension officer if pest damage exceeds 10%.',
          },
          te: {
            name: cropNameTe || cropNameEn || cropId,
            localNames: [cropNameTe, cropNameEn, cropId].filter(Boolean),
            whatIsThis: summary || `${cropNameTe || cropNameEn} రైతుమిత్రలో నమోదు చేయబడిన ప్రముఖ పంట.`,
            growingSeason: 'అనుకూలమైన ఖరీఫ్ మరియు రబీ కాలాలు.',
            soilRequirements: 'సారవంతమైన ఎర్ర నేలలు మరియు నల్లరేగడి నేలలు.',
            waterRequirements: `${waterRequirementMm} మి.మీ నీటి అవసరం.`,
            mainStages: ['మొక్క ఎదుగుదల', 'పూత దశ', 'కోత దశ'],
            whatToMonitor: ['ఆకు ఆరోగ్యం', 'తేమ స్థాయి'],
            commonPestsAndDiseases: ['సాధారణ తెగుళ్లు'],
            generalCare: 'సమగ్ర సస్యరక్షణ పాటించండి.',
            whenToContactExpert: 'తెగులు ఉధృతి పెరిగితే శాస్త్రవేత్తను సంప్రదించండి.',
          },
          hi: {
            name: cropNameHi || cropNameEn || cropId,
            localNames: [cropNameHi, cropNameEn, cropId].filter(Boolean),
            whatIsThis: summary || `${cropNameHi || cropNameEn} किसान हितैषी फसल है।`,
            growingSeason: 'खरीफ और रबी।',
            soilRequirements: 'उपजाऊ दोमट मिट्टी।',
            waterRequirements: `${waterRequirementMm} मिमी पानी।`,
            mainStages: ['वृद्धि', 'फूल', 'कटाई'],
            whatToMonitor: ['पत्तियों का स्वास्थ्य'],
            commonPestsAndDiseases: ['सामान्य कीट'],
            generalCare: 'उचित देखभाल करें।',
            whenToContactExpert: 'कीट बढ़ने पर संपर्क करें।',
          },
          ta: { name: cropNameEn, localNames: [cropNameEn], whatIsThis: summary, growingSeason: 'பருவம்', soilRequirements: 'மண்', waterRequirements: 'நீர்', mainStages: ['வளர்ச்சி', 'அறுவடை'], whatToMonitor: ['ஆரோக்கியம்'], commonPestsAndDiseases: ['பூச்சிகள்'], generalCare: 'பராமரிப்பு', whenToContactExpert: 'அணுகவும்' },
          kn: { name: cropNameEn, localNames: [cropNameEn], whatIsThis: summary, growingSeason: 'ಹಂಗಾಮು', soilRequirements: 'ಮಣ್ಣು', waterRequirements: 'ನೀರು', mainStages: ['ಬೆಳವಣಿಗೆ', 'ಕೊಯ್ಲು'], whatToMonitor: ['ಆರೋಗ್ಯ'], commonPestsAndDiseases: ['ಕೀಟಗಳು'], generalCare: 'ಪಾಲನೆ', whenToContactExpert: 'ಸಂಪರ್ಕಿಸಿ' },
          ml: { name: cropNameEn, localNames: [cropNameEn], whatIsThis: summary, growingSeason: 'സീസൺ', soilRequirements: 'മണ്ണ്', waterRequirements: 'വെള്ളം', mainStages: ['വളർച്ച', 'വിളവെടുപ്പ്'], whatToMonitor: ['ആരോഗ്യം'], commonPestsAndDiseases: ['കീടങ്ങൾ'], generalCare: 'പരിചരണം', whenToContactExpert: 'സഹായം തേടുക' },
          mr: { name: cropNameEn, localNames: [cropNameEn], whatIsThis: summary, growingSeason: 'हंगाम', soilRequirements: 'जमीन', waterRequirements: 'पाणी', mainStages: ['वाढ', 'कापणी'], whatToMonitor: ['आरोग्य'], commonPestsAndDiseases: ['कीड'], generalCare: 'काळजी', whenToContactExpert: 'सल्ला घ्या' },
        },
      };

      const res = await fetch('/api/v1/crops/admin/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || tCrop.adminModal.errorMessage);
      }

      setStatusMessage({ type: 'success', text: tCrop.adminModal.successMessage });
      onCropAdded();
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 1200);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || tCrop.adminModal.errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-farm-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-farm-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-farm-800 rounded-xl">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight">{tCrop.adminModal.title}</h2>
              <p className="text-[11px] text-farm-300">{tCrop.adminModal.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-farm-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {statusMessage && (
            <div
              className={`p-3 rounded-xl flex items-center gap-2 font-bold ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border border-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.cropId} *</label>
              <input
                type="text"
                required
                value={cropId}
                onChange={(e) => setCropId(e.target.value)}
                placeholder="e.g. cauliflower"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.category} *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CropCategory)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              >
                <option value="CEREAL">Cereal / Millet (తృణధాన్యాలు)</option>
                <option value="PULSE">Pulse / Dal (పప్పుధాన్యాలు)</option>
                <option value="VEGETABLE">Vegetable (కూరగాయలు)</option>
                <option value="OILSEED">Oilseed (నూనెగింజలు)</option>
                <option value="SPICE">Spice (సుగంధ ద్రవ్యాలు)</option>
                <option value="FRUIT">Fruit (పండ్ల తోటలు)</option>
                <option value="COMMERCIAL">Commercial / Cash (వాణిజ్య)</option>
                <option value="OTHER">Other Crops</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.cropNameEn} *</label>
              <input
                type="text"
                required
                value={cropNameEn}
                onChange={(e) => setCropNameEn(e.target.value)}
                placeholder="Cauliflower"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.cropNameTe}</label>
              <input
                type="text"
                value={cropNameTe}
                onChange={(e) => setCropNameTe(e.target.value)}
                placeholder="కాలీఫ్లవర్"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.cropNameHi}</label>
              <input
                type="text"
                value={cropNameHi}
                onChange={(e) => setCropNameHi(e.target.value)}
                placeholder="फूलगोभी"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.scientificName} *</label>
              <input
                type="text"
                required
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                placeholder="e.g. Brassica oleracea var. botrytis"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium italic"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.riskLevel}</label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              >
                <option value="LOW">Low Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="HIGH">High Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.durationDays}</label>
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.waterRequirementMm}</label>
              <input
                type="number"
                value={waterRequirementMm}
                onChange={(e) => setWaterRequirementMm(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.expectedYield}</label>
              <input
                type="text"
                value={expectedYield}
                onChange={(e) => setExpectedYield(e.target.value)}
                placeholder="15 - 20 Tonnes"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.aliases}</label>
            <input
              type="text"
              value={aliases}
              onChange={(e) => setAliases(e.target.value)}
              placeholder="gobi, phool gobi, కాలీఫ్లవర్, cauliflower, coliflower"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
            />
            <p className="text-[10px] text-gray-500 mt-0.5">Separate multiple local names and spelling variations with commas.</p>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">{tCrop.adminModal.summary}</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short farmer-friendly explanation of the crop, soil, and management..."
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 font-medium"
            />
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors"
            >
              {tCrop.adminModal.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-farm-600 hover:bg-farm-700 text-white font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{tCrop.adminModal.saveCrop}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
