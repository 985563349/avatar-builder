import { createContext, useContext, useState } from 'react';

type Customization = {
  theme: 'light' | 'dark';
  expression: number;
  hair: number;
  eyebrows: number;
  sunglasses: number;
  clothes: number;
  necklace: number;
  earrings: number;
  tattoo: number;
};

export interface CustomizationProviderProps {
  children: React.ReactNode;
}

interface CustomizationProviderState extends Customization {
  setCustomization: <P extends keyof Customization>(prop: P, value: Customization[P]) => void;
}

const CustomizationProviderContext = createContext<CustomizationProviderState | null>(null);

export function CustomizationProvider({ children }: CustomizationProviderProps) {
  const [customization, setCustomization] = useState({
    theme: 'light' as const,
    expression: 1,
    hair: 2,
    eyebrows: 1,
    sunglasses: 1,
    clothes: 1,
    necklace: 1,
    earrings: 1,
    tattoo: 1,
  });

  const value: CustomizationProviderState = {
    ...customization,
    setCustomization: (prop, value) => setCustomization((props) => ({ ...props, [prop]: value })),
  };

  return (
    <CustomizationProviderContext.Provider value={value}>
      {children}
    </CustomizationProviderContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationProviderContext);

  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }

  return context;
}
