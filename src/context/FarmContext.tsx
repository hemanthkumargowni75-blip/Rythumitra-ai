'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FarmerProfile,
  Farm,
  SoilTestRecord,
  ActiveCrop,
  WeatherDay,
  ConsultationTicket,
  FieldVisitBooking,
  TreatmentTask,
  FinancialEntry,
} from '@/types';
import {
  initialFarmer,
  initialFarm,
  initialSoilTest,
  initialActiveCrop,
  initialWeatherForecast,
  initialConsultations,
  initialFieldVisits,
  initialTreatmentTasks,
  initialLedgerEntries,
} from '@/data/mockDb';

interface FarmContextType {
  farmer: FarmerProfile;
  setFarmer: (f: FarmerProfile) => void;
  farm: Farm;
  updateFarmBoundary: (
    coords: [number, number][],
    metrics: { areaAcres: number; areaGuntas: number; areaHectares: number; perimeterMeters: number }
  ) => void;
  updateFarmDetails: (details: Partial<Farm>) => void;
  soilTest: SoilTestRecord;
  updateSoilTest: (record: SoilTestRecord) => void;
  activeCrop: ActiveCrop;
  setActiveCrop: (crop: ActiveCrop) => void;
  weatherForecast: WeatherDay[];
  consultations: ConsultationTicket[];
  addConsultation: (ticket: ConsultationTicket) => void;
  addConsultationMessage: (ticketId: string, messageText: string, sender: 'FARMER' | 'EXPERT') => void;
  fieldVisits: FieldVisitBooking[];
  bookFieldVisit: (booking: FieldVisitBooking) => void;
  treatmentTasks: TreatmentTask[];
  toggleTreatmentTask: (taskId: string) => void;
  addTreatmentTask: (task: TreatmentTask) => void;
  ledgerEntries: FinancialEntry[];
  addLedgerEntry: (entry: FinancialEntry) => void;
  deleteLedgerEntry: (id: string) => void;
  resetToDefaults: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [farmer, setFarmerState] = useState<FarmerProfile>(initialFarmer);
  const [farm, setFarmState] = useState<Farm>(initialFarm);
  const [soilTest, setSoilTestState] = useState<SoilTestRecord>(initialSoilTest);
  const [activeCrop, setActiveCropState] = useState<ActiveCrop>(initialActiveCrop);
  const [weatherForecast, setWeatherForecast] = useState<WeatherDay[]>(initialWeatherForecast);

  const [consultations, setConsultationsState] = useState<ConsultationTicket[]>(initialConsultations);
  const [fieldVisits, setFieldVisitsState] = useState<FieldVisitBooking[]>(initialFieldVisits);
  const [treatmentTasks, setTreatmentTasksState] = useState<TreatmentTask[]>(initialTreatmentTasks);
  const [ledgerEntries, setLedgerEntriesState] = useState<FinancialEntry[]>(initialLedgerEntries);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFarm = localStorage.getItem('rythumitra_farm');
      if (savedFarm) setFarmState(JSON.parse(savedFarm));

      const savedFarmer = localStorage.getItem('rythumitra_farmer');
      if (savedFarmer) {
        setFarmerState(JSON.parse(savedFarmer));
      } else {
        const savedUserStr = localStorage.getItem('rythumitra_user');
        if (savedUserStr) {
          const parsedUser = JSON.parse(savedUserStr);
          if (parsedUser && parsedUser.name && parsedUser.name !== 'Farmer') {
            setFarmerState((prev) => ({
              ...prev,
              name: parsedUser.name,
              nameTelugu: parsedUser.name,
              phone: parsedUser.phone || prev.phone,
            }));
          }
        }
      }

      const savedCrop = localStorage.getItem('rythumitra_crop');
      if (savedCrop) setActiveCropState(JSON.parse(savedCrop));

      const savedSoil = localStorage.getItem('rythumitra_soil');
      if (savedSoil) setSoilTestState(JSON.parse(savedSoil));

      const savedConsultations = localStorage.getItem('rythumitra_consult');
      if (savedConsultations) setConsultationsState(JSON.parse(savedConsultations));

      const savedVisits = localStorage.getItem('rythumitra_visits');
      if (savedVisits) setFieldVisitsState(JSON.parse(savedVisits));

      const savedTasks = localStorage.getItem('rythumitra_tasks');
      if (savedTasks) setTreatmentTasksState(JSON.parse(savedTasks));

      const savedLedger = localStorage.getItem('rythumitra_ledger');
      if (savedLedger) setLedgerEntriesState(JSON.parse(savedLedger));
    } catch {
      // Ignore JSON parse errors and stick to initial defaults
    }
  }, []);

  // Fetch live agro-weather based on farm coordinates
  useEffect(() => {
    const lat = farm.centerLocation?.lat || 16.4245;
    const lng = farm.centerLocation?.lng || 80.4548;
    fetch(`/api/v1/weather?lat=${lat}&lon=${lng}&farmName=${encodeURIComponent(farm.name)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.forecast) && data.forecast.length > 0) {
          setWeatherForecast(data.forecast);
        }
      })
      .catch((err) => {
        console.warn('Live weather fetch warning:', err);
      });
  }, [farm.centerLocation?.lat, farm.centerLocation?.lng, farm.name]);


  const setFarmer = (f: FarmerProfile) => {
    setFarmerState(f);
    localStorage.setItem('rythumitra_farmer', JSON.stringify(f));
  };

  const updateFarmBoundary = (
    coords: [number, number][],
    metrics: { areaAcres: number; areaGuntas: number; areaHectares: number; perimeterMeters: number }
  ) => {
    const updated: Farm = {
      ...farm,
      boundary: {
        type: 'Polygon',
        coordinates: coords,
        areaAcres: metrics.areaAcres,
        areaGuntas: metrics.areaGuntas,
        areaHectares: metrics.areaHectares,
        perimeterMeters: metrics.perimeterMeters,
      },
    };
    setFarmState(updated);
    localStorage.setItem('rythumitra_farm', JSON.stringify(updated));
  };

  const updateFarmDetails = (details: Partial<Farm>) => {
    const updated: Farm = { ...farm, ...details };
    setFarmState(updated);
    localStorage.setItem('rythumitra_farm', JSON.stringify(updated));
  };

  const updateSoilTest = (record: SoilTestRecord) => {
    setSoilTestState(record);
    localStorage.setItem('rythumitra_soil', JSON.stringify(record));
  };

  const setActiveCrop = (crop: ActiveCrop) => {
    setActiveCropState(crop);
    localStorage.setItem('rythumitra_crop', JSON.stringify(crop));
  };

  const addConsultation = (ticket: ConsultationTicket) => {
    const updated = [ticket, ...consultations];
    setConsultationsState(updated);
    localStorage.setItem('rythumitra_consult', JSON.stringify(updated));
  };

  const addConsultationMessage = (ticketId: string, messageText: string, sender: 'FARMER' | 'EXPERT') => {
    const updated = consultations.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: `msg-${Date.now()}`,
              sender,
              senderName: sender === 'FARMER' ? farmer.name : 'Dr. K. Venkata Rao',
              text: messageText,
              sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      }
      return ticket;
    });
    setConsultationsState(updated);
    localStorage.setItem('rythumitra_consult', JSON.stringify(updated));
  };

  const bookFieldVisit = (booking: FieldVisitBooking) => {
    const updated = [booking, ...fieldVisits];
    setFieldVisitsState(updated);
    localStorage.setItem('rythumitra_visits', JSON.stringify(updated));
  };

  const toggleTreatmentTask = (taskId: string) => {
    const updated = treatmentTasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTreatmentTasksState(updated);
    localStorage.setItem('rythumitra_tasks', JSON.stringify(updated));
  };

  const addTreatmentTask = (task: TreatmentTask) => {
    const updated = [task, ...treatmentTasks];
    setTreatmentTasksState(updated);
    localStorage.setItem('rythumitra_tasks', JSON.stringify(updated));
  };

  const addLedgerEntry = (entry: FinancialEntry) => {
    const updated = [entry, ...ledgerEntries];
    setLedgerEntriesState(updated);
    localStorage.setItem('rythumitra_ledger', JSON.stringify(updated));
  };

  const deleteLedgerEntry = (id: string) => {
    const updated = ledgerEntries.filter((e) => e.id !== id);
    setLedgerEntriesState(updated);
    localStorage.setItem('rythumitra_ledger', JSON.stringify(updated));
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setFarmerState(initialFarmer);
    setFarmState(initialFarm);
    setSoilTestState(initialSoilTest);
    setActiveCropState(initialActiveCrop);
    setConsultationsState(initialConsultations);
    setFieldVisitsState(initialFieldVisits);
    setTreatmentTasksState(initialTreatmentTasks);
    setLedgerEntriesState(initialLedgerEntries);
  };

  return (
    <FarmContext.Provider
      value={{
        farmer,
        setFarmer,
        farm,
        updateFarmBoundary,
        updateFarmDetails,
        soilTest,
        updateSoilTest,
        activeCrop,
        setActiveCrop,
        weatherForecast,
        consultations,
        addConsultation,
        addConsultationMessage,
        fieldVisits,
        bookFieldVisit,
        treatmentTasks,
        toggleTreatmentTask,
        addTreatmentTask,
        ledgerEntries,
        addLedgerEntry,
        deleteLedgerEntry,
        resetToDefaults,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}
