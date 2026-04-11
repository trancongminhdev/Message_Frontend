'use client';

import { IMAGE_SOUCE } from '@/public/assets/images';
import React, { createContext, useContext, useState } from 'react';
import AppImage from './image/AppImage';


/* =======================
   Loading Context
======================= */

const LoadingContext = createContext<{
  SHOW: () => void;
  HIDE: () => void;
} | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading phải được sử dụng trong LoadingProvider');
  }
  return context;
};

/* =======================
   Loading UI Component
======================= */

const AppLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <AppImage
        src={IMAGE_SOUCE.LOADING}
        alt="loading"
        classNameContainer="h-[50px] w-[50px]"
        unoptimized
      />
    </div>
  );
};

/* =======================
   Loading Provider
======================= */

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const loading = {
    SHOW: () => setVisible(true),
    HIDE: () => setVisible(false),
  };

  return (
    <LoadingContext.Provider value={loading}>
      {children}
      {visible && <AppLoading />}
    </LoadingContext.Provider>
  );
};
