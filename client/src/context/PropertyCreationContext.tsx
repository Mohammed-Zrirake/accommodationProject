"use client";

import React, { createContext, useState, useContext, useCallback, useMemo } from "react";

interface PropertyCreationContextType {
  propertyData: any;
  setPropertyData: (data: any) => void;
  rooms: any[];
  addRoom: (room: any) => void;
  removeRoom: (tempId: number) => void;
  dorms: any[];
  addDorm: (dorm: any) => void;
  removeDorm: (tempId: number) => void;
  resetCreationProcess: () => void;
}

const PropertyCreationContext = createContext<PropertyCreationContextType | undefined>(undefined);

export const PropertyCreationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [propertyData, setPropertyData] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [dorms, setDorms] = useState<any[]>([]);

  const addRoom = useCallback((room: any) => {
    setRooms((prev) => [...prev, { ...room, tempId: Date.now() }]);
  }, []);

  const removeRoom = useCallback((tempId: number) => {
    setRooms((prev) => prev.filter((r) => r.tempId !== tempId));
  }, []);

  const addDorm = useCallback((dorm: any) => {
    setDorms((prev) => [...prev, { ...dorm, tempId: Date.now() }]);
  }, []);

  const removeDorm = useCallback((tempId: number) => {
    setDorms((prev) => prev.filter((d) => d.tempId !== tempId));
  }, []);

  const resetCreationProcess = useCallback(() => {
    setPropertyData(null);
    setRooms([]);
    setDorms([]);
  }, []);

  const value = useMemo(
    () => ({
      propertyData,
      setPropertyData,
      rooms,
      addRoom,
      removeRoom,
      dorms,
      addDorm,
      removeDorm,
      resetCreationProcess,
    }),
    [propertyData, rooms, dorms, addRoom, removeRoom, addDorm, removeDorm, resetCreationProcess]
  );

  return (
    <PropertyCreationContext.Provider value={value}>
      {children}
    </PropertyCreationContext.Provider>
  );
};

export const usePropertyCreation = () => {
  const context = useContext(PropertyCreationContext);
  if (!context) {
    throw new Error("usePropertyCreation must be used within PropertyCreationProvider");
  }
  return context;
};
