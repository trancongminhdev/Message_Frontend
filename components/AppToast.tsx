'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { LuCircleCheckBig } from 'react-icons/lu';
import { MdClose, MdErrorOutline } from 'react-icons/md';

type STATUS = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

const DURATION = 3000

const CONFIG_TYPE = {
  SUCCESS: {
    icon: <LuCircleCheckBig className='text-colorGreenSuccess' size={20} />,
    bgColor: 'bg-colorGreenLight',
    borderColor: 'border-colorGreenSuccess',
    progressColor: 'bg-colorGreenSuccess'
  },
  ERROR: {
    icon: <MdErrorOutline className='text-colorRedError' size={20} />,
    bgColor: 'bg-colorRedLight',
    borderColor: 'border-colorRedError',
    progressColor: 'bg-colorRedError'
  },
  WARNING: {
    icon: <IoWarningOutline className='text-colorYellowWarning' size={20} />,
    bgColor: 'bg-colorYellowLight',
    borderColor: 'border-colorYellowWarning',
    progressColor: 'bg-colorYellowWarning'
  },
  INFO: {
    icon: <MdErrorOutline className='text-colorBlue' size={20} />,
    bgColor: 'bg-colorBlueLight',
    borderColor: 'border-colorBlue',
    progressColor: 'bg-colorBlue'
  }
};

// Toast Context
const ToastContext = createContext<{
  SUCCESS: (message: string) => void;
  ERROR: (message: string) => void;
  WARNING: (message: string) => void;
  INFO: (message: string) => void;
} | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast phải được sử dụng trong ToastProvider');
  }
  return context;
};

interface IToast {
  id: string;
  message: string;
  status: STATUS;
  onClose?: (id: string) => void
}

// Toast Component
const AppToast: React.FC<IToast> = ({ id, message, status, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 10);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(id), 300);
    }, DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [DURATION, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(id), 300);
  };


  const config = CONFIG_TYPE[status];
  const Icon = config.icon;

  return (
    <div
      className={`w-80 ${config.bgColor} border-l-4 ${config.borderColor} rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out mb-4 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
    >
      <div className="p-4 flex items-start gap-3">
        {Icon}
        <p className="flex-1 text-sm text-gray-800">{message}</p>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          <MdClose size={18} />
        </button>
      </div>
      <div className="h-1 bg-gray-200">
        <div
          className={`h-full ${config.progressColor} transition-all ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toast = {
    SUCCESS: (message: string) => {
      const id = Date.now() + Math.random().toString();
      setToasts(prev => [...prev, { id, message, status: 'SUCCESS' }]);
    },
    ERROR: (message: string) => {
      const id = Date.now() + Math.random().toString();
      setToasts(prev => [...prev, { id, message, status: 'ERROR' }]);
    },
    WARNING: (message: string) => {
      const id = Date.now() + Math.random().toString();
      setToasts(prev => [...prev, { id, message, status: 'WARNING' }]);
    },
    INFO: (message: string) => {
      const id = Date.now() + Math.random().toString();
      setToasts(prev => [...prev, { id, message, status: 'INFO' }]);
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-999 pointer-events-none">
        <div className="pointer-events-auto">
          {toasts.map(item => (
            <AppToast
              key={item.id}
              id={item.id}
              message={item.message}
              status={item.status}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default AppToast;