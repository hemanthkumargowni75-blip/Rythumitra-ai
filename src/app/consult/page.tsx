'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  UserCheck,
  Star,
  CheckCircle2,
  Calendar,
  Phone,
  Image as ImageIcon,
  Mic,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { expertsCatalog } from '@/data/mockDb';
import { ConsultationTicket } from '@/types';

export default function ConsultPage() {
  const { language, t } = useLanguage();
  const { consultations, addConsultation, addConsultationMessage, farmer, farm } = useFarm();

  const [activeTicketId, setActiveTicketId] = useState<string>(
    consultations[0]?.id || ''
  );
  const [messageInput, setMessageInput] = useState('');
  const [newQueryTitle, setNewQueryTitle] = useState('');
  const [newQueryDesc, setNewQueryDesc] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  const activeTicket =
    consultations.find((c) => c.id === activeTicketId) || consultations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeTicket) return;

    addConsultationMessage(activeTicket.id, messageInput, 'FARMER');
    const sentText = messageInput;
    setMessageInput('');

    // Simulate Expert Response after a short delay
    setTimeout(() => {
      const farmerGreeting = farmer?.name ? (language === 'te' ? `${farmer.name} గారు` : `${farmer.name}`) : (language === 'te' ? 'రైతు సోదరా' : 'Farmer');
      let replyText =
        language === 'te'
          ? `${farmerGreeting}, మీ సందేశం అందింది. మీ ${farm.boundary.areaAcres} ఎకరాల తోటలో పూత దశ అత్యంత కీలకం. పైపాటుగా 13-0-45 ఎరువును 5 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి.`
          : `${farmerGreeting}, received your update. For your ${farm.boundary.areaAcres} acres in flowering, spray 13-0-45 @ 5g/L water along with boron for flower retention.`;

      addConsultationMessage(activeTicket.id, replyText, 'EXPERT');
    }, 1800);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQueryTitle.trim() || !newQueryDesc.trim()) return;

    const newTicket: ConsultationTicket = {
      id: `tkt-${Date.now()}`,
      farmerId: farmer.id,
      expertId: 'exp-1',
      title: newQueryTitle,
      queryType: 'PEST_DISEASE',
      description: newQueryDesc,
      status: 'ASSIGNED',
      createdAt: 'Just now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'FARMER',
          senderName: farmer.name,
          text: newQueryDesc,
          sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    addConsultation(newTicket);
    setActiveTicketId(newTicket.id);
    setNewQueryTitle('');
    setNewQueryDesc('');
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold mb-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>{language === 'te' ? 'శాస్త్రవేత్తల ప్రత్యక్ష వేదిక' : 'Expert Agronomy Advisory'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.consult.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.consult.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.consult.askQuestion}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Expert Profiles Directory */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-purple-600" />
            <span>{t.consult.expertDirectory}</span>
          </h3>

          <div className="space-y-3">
            {expertsCatalog.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl p-4 border border-farm-200 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {exp.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-purple-800">
                      {language === 'te' ? exp.titleTe : exp.titleEn}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {exp.institution}
                    </p>
                  </div>

                  {exp.available && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {t.consult.onlineNow}
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{exp.rating}</span>
                    <span className="text-gray-400 font-normal">({exp.reviewsCount})</span>
                  </div>

                  <span className="text-[11px] font-bold text-purple-700">
                    {exp.languages.join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Active Consultation Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-farm-200 shadow-md flex flex-col h-[560px] overflow-hidden">
          {/* Chat Top Bar */}
          <div className="p-4 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 text-[10px] font-black uppercase">
                  {activeTicket?.queryType}
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Assigned: Dr. K. Venkata Rao
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-1">
                {activeTicket?.title}
              </h3>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {activeTicket?.messages.map((msg) => {
              const isFarmer = msg.sender === 'FARMER';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isFarmer ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isFarmer
                        ? 'bg-purple-700 text-white rounded-tr-none'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold block mb-1 ${
                        isFarmer ? 'text-purple-200' : 'text-purple-700'
                      }`}
                    >
                      {msg.senderName}
                    </span>
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.sentAt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t.consult.typeMessage}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
            />

            <button
              type="submit"
              className="p-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white transition-colors shadow-xs"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* New Consultation Query Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              {t.consult.askQuestion}
            </h3>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'te' ? 'సమస్య శీర్షిక' : 'Issue Summary'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yellow leaves on southern plot"
                  value={newQueryTitle}
                  onChange={(e) => setNewQueryTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.consult.describeIssue}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your crop stage, observed damage, and when it started..."
                  value={newQueryDesc}
                  onChange={(e) => setNewQueryDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md"
                >
                  {t.consult.submitQuery}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
