'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Plus,
  AlertCircle,
  ThumbsUp,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { TreatmentTask } from '@/types';

export default function FollowUpPage() {
  const { language, t } = useLanguage();
  const { treatmentTasks, toggleTreatmentTask, addTreatmentTask, activeCrop } = useFarm();

  const [newTaskTarget, setNewTaskTarget] = useState('');
  const [newTaskAction, setNewTaskAction] = useState('');
  const [newTaskDosage, setNewTaskDosage] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTarget || !newTaskAction) return;

    addTreatmentTask({
      id: `task-${Date.now()}`,
      cropName: activeCrop.cropNameTe,
      targetIssue: newTaskTarget,
      actionEn: newTaskAction,
      actionTe: newTaskAction,
      dosage: newTaskDosage || 'As recommended',
      scheduledDate: newTaskDate,
      completed: false,
    });

    setNewTaskTarget('');
    setNewTaskAction('');
    setNewTaskDosage('');
    setShowModal(false);
  };

  const pendingTasks = treatmentTasks.filter((t) => !t.completed);
  const completedTasks = treatmentTasks.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'te' ? 'నివారణ చర్యల పర్యవేక్షణ' : 'Treatment Follow-up & Efficacy Tracker'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.followUp.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.followUp.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'te' ? 'కొత్త రిమైండర్ చేర్చండి' : 'Add Treatment Reminder'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{t.followUp.pendingTasks}</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingTasks.length} {language === 'te' ? 'చేయవలసినవి' : 'Pending'}
            </span>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-farm-200 text-center text-gray-500">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-700">
                {language === 'te' ? 'అన్ని పనులు పూర్తయ్యాయి!' : 'All treatment tasks completed!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl p-4 border border-farm-200 shadow-xs flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      {task.cropName} • {task.targetIssue}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 leading-snug">
                      {language === 'te' ? task.actionTe : task.actionEn}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {language === 'te' ? 'మోతాదు:' : 'Dosage:'}{' '}
                      <span className="font-semibold text-rose-700">{task.dosage}</span> • Due:{' '}
                      <span className="font-semibold text-gray-800">{task.scheduledDate}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTreatmentTask(task.id)}
                    className="px-3 py-1.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs shrink-0 transition-colors"
                  >
                    {t.followUp.markDone}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed & Efficacy Ratings Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.followUp.completedTasks}</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {completedTasks.length} {language === 'te' ? 'పూర్తయినవి' : 'Done'}
            </span>
          </div>

          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                      {task.cropName} • {task.targetIssue}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">
                      {language === 'te' ? task.actionTe : task.actionEn}
                    </h4>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold shrink-0">
                    Completed
                  </span>
                </div>

                <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">{t.followUp.rateEfficacy}:</span>
                  <span className="font-bold text-emerald-800">
                    ✓ {t.followUp.partiallyImproved}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              {language === 'te' ? 'కొత్త నివారణ పని చేర్చండి' : 'Add Treatment Task'}
            </h3>

            <form onSubmit={handleAddTask} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Pest / Disease / Nutrients
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sucking pests, Whitefly, Zinc spray"
                  value={newTaskTarget}
                  onChange={(e) => setNewTaskTarget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Prescription / Chemical Action
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spray Delegate 15ml / 16L pump"
                  value={newTaskAction}
                  onChange={(e) => setNewTaskAction(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="15 ml / pump"
                    value={newTaskDosage}
                    onChange={(e) => setNewTaskDosage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-farm-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-md"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
