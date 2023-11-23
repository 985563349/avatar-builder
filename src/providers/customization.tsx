import { createContext, useContext, useState } from 'react';

export interface CustomizationProviderProps {
  children: React.ReactNode;
}

export interface CustomizationProviderState {
  theme: 'light' | 'dark';
  expression: number;
  hair: number;
  eyebrows: number;
  sunglasses: number;
  clothes: number;
  necklace: number;
  earrings: number;
  tattoo: number;
}

interface CustomizationProviderContextType extends CustomizationProviderState {
  setCustomization: <P extends keyof CustomizationProviderState>(
    prop: P,
    value: CustomizationProviderState[P]
  ) => void;
}

const initialState: CustomizationProviderState = {
  theme: 'light',
  expression: 1,
  hair: 1,
  eyebrows: 1,
  sunglasses: 1,
  clothes: 1,
  necklace: 1,
  earrings: 1,
  tattoo: 1,
};

const CustomizationProviderContext = createContext<CustomizationProviderContextType>({
  ...initialState,
  setCustomization: () => null,
});

export function CustomizationProvider({ children }: CustomizationProviderProps) {
  const [customization, setCustomization] = useState(initialState);

  const value: CustomizationProviderContextType = {
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
