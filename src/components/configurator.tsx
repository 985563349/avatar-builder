import { useState } from 'react';

import { useCustomization, type CustomizationProviderState } from '@/providers/customization';
import { cn } from '@/lib/utils';

type ConfigKey = Exclude<keyof CustomizationProviderState, 'theme'>;

interface Config {
  label: string;
  key: ConfigKey;
  total: number;
}

const configs: Config[] = [
  { label: 'Expression', key: 'expression', total: 12 },
  { label: 'Hair', key: 'hair', total: 12 },
  { label: 'Eyebrows', key: 'eyebrows', total: 8 },
  { label: 'Sunglasses', key: 'sunglasses', total: 12 },
  { label: 'Clothes', key: 'clothes', total: 12 },
  { label: 'Necklaces', key: 'necklace', total: 12 },
  { label: 'Earrings', key: 'earrings', total: 12 },
  { label: 'Tattoo', key: 'tattoo', total: 12 },
];

const Configurator: React.FC = () => {
  const { theme, setCustomization, ...customization } = useCustomization();

  const [active, setActive] = useState<ConfigKey>('expression');
  const config = configs.find(({ key }) => key === active)!;

  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="absolute -top-20 space-x-2">
        <button
          className={cn(
            'transition-colors border-4 border-white hover:border-teal-500 p-1 rounded-xl bg-white',
            {
              'border-teal-500': theme === 'light',
            }
          )}
          onClick={() => setCustomization('theme', 'light')}
        >
          <span className="block rounded-md w-7 h-7 bg-gradient-to-br from-orange-200 to-orange-300" />
        </button>

        <button
          className={cn(
            'transition-colors border-4 border-white hover:border-teal-500 p-1 rounded-xl bg-white',
            {
              'border-teal-500': theme === 'dark',
            }
          )}
          onClick={() => setCustomization('theme', 'dark')}
        >
          <span className="block rounded-md w-7 h-7 bg-gradient-to-br from-yellow-700 to-yellow-900" />
        </button>
      </div>

      <div className="rounded-xl p-2 bg-white">
        <div className="flex items-center gap-x-10 p-4 mb-2 whitespace-nowrap overflow-x-auto">
          {configs.map(({ label, key }) => (
            <button
              className={cn('transition-colors text-gray-500 hover:text-teal-500', {
                'text-teal-500': active === key,
              })}
              key={key}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="px-4 pb-4">
          <ul className="grid grid-cols-3 md:grid-cols-8 lg:grid-cols-12 gap-6">
            {[...Array(config.total)].map((_, i) => {
              const option = i + 1;
              const src = `/previews/${theme}/${active}/${option}.png`;
              const alt = `${theme}-${active}-${option}`;

              return (
                <li
                  className="relative aspect-square cursor-pointer"
                  key={alt}
                  onClick={() => setCustomization(active, option)}
                >
                  <span
                    className={cn(
                      'transition-colors absolute inset-0 border-4 border-gray-200 hover:border-teal-500 hover:shadow-[inset_0_0_0_4px_#ffffff] rounded-lg w-full h-full bg-gray-200',
                      {
                        'border-teal-500 shadow-[inset_0_0_0_4px_#ffffff]':
                          customization[active] === option,
                      }
                    )}
                  />
                  <img
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    src={src}
                    alt={alt}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

Configurator.displayName = 'Configurator';

export { Configurator };
