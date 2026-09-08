'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  MapPin,
  CheckCircle2,
  Clock,
  UserCheck,
  FileCheck2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { FieldVisitBooking } from '@/types';

export default function ScoutingPage() {
  const { language, t } = useLanguage();
  const { fieldVisits, bookFieldVisit, farm, farmer } = useFarm();

  const [bookingDate, setBookingDate] = useState('2026-09-15');
  const [bookingReason, setBookingReason] = useState('Mid-season flowering scout & thrips control verification');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: FieldVisitBooking = {
      id: `visit-${Date.now()}`,
      farmId: farm.id,
      expertId: 'exp-2',
      farmerName: farmer.name,
      scheduledDate: `${bookingDate} (10:00 AM)`,
      visitReason: bookingReason,
      status: 'BOOKED',
    };

    bookFieldVisit(newBooking);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
            <CalendarCheck className="w-4 h-4 text-teal-700" />
            <span>{language === 'te' ? 'ప్రత్యక్ష క్షేత్ర పరిశీలన' : 'Agronomist Field Scouting'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.scouting.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.scouting.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Book Field Visit Form */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">
            {t.scouting.bookVisit}
          </h3>

          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t.scouting.selectDate}
              </label>
              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-farm-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t.scouting.visitReason}
              </label>
              <textarea
                rows={3}
                required
                value={bookingReason}
                onChange={(e) => setBookingReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-farm-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-farm-50 border border-farm-200 text-xs text-farm-900 space-y-1">
              <span className="font-bold block">{farm.name}</span>
              <p className="text-gray-600 text-[11px]">
                {t.dashboard.surveyNo}: {farm.surveyNumber} • {farm.boundary.areaAcres} {t.dashboard.acres}
              </p>
              <p className="text-emerald-700 text-[11px] font-semibold">
                ✓ GPS Coordinates will be verified upon arrival
              </p>
            </div>

            {bookingSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'te' ? 'క్షేత్ర పరిశీలన నమోదు చేయబడింది!' : 'Field visit booked successfully!'}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.scouting.confirmBooking}</span>
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Inspection History & Official Scout Reports */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-gray-900">
            {t.scouting.pastVisits}
          </h3>

          <div className="space-y-4">
            {fieldVisits.map((visit) => {
              const rep = visit.scoutReport;

              return (
                <div
                  key={visit.id}
                  className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase">
                          {visit.status}
                        </span>
                        {rep?.gpsVerified && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            GPS Field Match
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-gray-900">
                        {visit.visitReason}
                      </h4>
                    </div>

                    <span className="text-xs font-bold text-gray-500">
                      {visit.scheduledDate}
                    </span>
                  </div>

                  {rep && (
                    <div className="space-y-4">
                      {/* Scout Metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
                          <span className="text-[10px] uppercase font-bold text-rose-800 block">Pest Incidence</span>
                          <span className="text-xl font-black text-rose-900 mt-1 block">
                            {rep.pestIncidencePercentage}%
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 block">Weed Level</span>
                          <span className="text-xl font-black text-emerald-900 mt-1 block">
                            {rep.weedInfestationLevel}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
                          <span className="text-[10px] uppercase font-bold text-sky-800 block">Soil Moisture</span>
                          <span className="text-xl font-black text-sky-900 mt-1 block">
                            {rep.soilMoistureStatus}
                          </span>
                        </div>
                      </div>

                      {/* Observations */}
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                        <span className="font-bold text-gray-800 block mb-1">
                          {t.scouting.scoutFindings}:
                        </span>
                        <p className="text-gray-600 leading-relaxed italic">
                          &ldquo;{language === 'te' ? rep.expertObservationsTe : rep.expertObservationsEn}&rdquo;
                        </p>
                      </div>

                      {/* Action Items */}
                      <div>
                        <span className="text-xs font-bold text-gray-800 block mb-2">
                          {t.scouting.recommendations}:
                        </span>
                        <div className="space-y-1.5">
                          {(language === 'te'
                            ? rep.actionRecommendationsTe
                            : rep.actionRecommendationsEn
                          ).map((act, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-farm-50/70 border border-farm-200 text-xs text-farm-900 flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Signature */}
                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-gray-500">{t.scouting.digitalSignature}:</span>
                        <span className="font-mono font-bold text-teal-800">
                          {rep.expertSignature}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
