import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

// Create the context - no change here
const PropertyCreationContext = createContext();

// Create a provider component
export const PropertyCreationProvider = ({ children }) => {
    const [propertyData, setPropertyData] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [dorms, setDorms] = useState([]);

    // --- FIX: Wrap all functions that modify state in `useCallback` ---
    // This ensures the functions themselves don't change on every render.
    
    const addRoom = useCallback((room) => {
        // Give it a temporary ID for keying in the list
        setRooms(prev => [...prev, { ...room, tempId: Date.now() }]);
    }, []); // Empty dependency array [] means this function is created only once.

    const removeRoom = useCallback((tempId) => {
        setRooms(prev => prev.filter(r => r.tempId !== tempId));
    }, []);
    
    const addDorm = useCallback((dorm) => {
        setDorms(prev => [...prev, { ...dorm, tempId: Date.now() }]);
    }, []);

    const removeDorm = useCallback((tempId) => {
        setDorms(prev => prev.filter(d => d.tempId !== tempId));
    }, []);

    const resetCreationProcess = useCallback(() => {
        setPropertyData(null);
        setRooms([]);
        setDorms([]);
    }, []); // This function is also created only once.


    // --- FIX: Memoize the context `value` object with `useMemo` ---
    // This ensures the `value` object itself only changes when its contents change.
    const value = useMemo(() => ({
        propertyData,
        setPropertyData, // setState functions from useState are already stable and don't need to be in the dependency array
        rooms,
        addRoom,
        removeRoom,
        dorms,
        addDorm,
        removeDorm,
        resetCreationProcess
    }), [
        // The dependency array: this `value` object will only be re-created
        // if one of these state variables or memoized functions changes.
        propertyData, 
        rooms, 
        dorms, 
        addRoom, 
        removeRoom, 
        addDorm, 
        removeDorm, 
        resetCreationProcess
    ]);

    return (
        <PropertyCreationContext.Provider value={value}>
            {children}
        </PropertyCreationContext.Provider>
    );
};

// Create a custom hook for easy access to the context - no change here
export const usePropertyCreation = () => {
    return useContext(PropertyCreationContext);
};