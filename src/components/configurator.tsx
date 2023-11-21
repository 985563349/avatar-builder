import { useState } from 'react';
import { range } from 'lodash';

import { cn } from '../lib/utils';

const previews = [
  { label: 'Expression', key: 'face', total: 12 },
  { label: 'Head', key: 'hair', total: 12 },
  { label: 'Eyebrows', key: 'eyebrows', total: 8 },
  { label: 'Sunglasses', key: 'sunglasses', total: 12 },
  { label: 'Clothes', key: 'clothes', total: 12 },
  { label: 'Necklaces', key: 'necklace', total: 12 },
  { label: 'Earrings', key: 'earrings', total: 12 },
  { label: 'Tattoo', key: 'tattoo', total: 12 },
];

const Configurator: React.FC = () => {
  const [active, setActive] = useState('face');
  const [color, setColor] = useState('light');

  const preview = previews.find(({ key }) => key === active)!;

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute -top-20 space-x-2">
        <button
          className={cn(
            'transition-colors border-4 border-white hover:border-teal-500 p-1 rounded-xl bg-white',
            {
              'border-teal-500': color === 'light',
            }
          )}
          onClick={() => setColor('light')}
        >
          <span className="block rounded-md w-7 h-7 bg-gradient-to-br from-orange-200 to-orange-300" />
        </button>

        <button
          className={cn(
            'transition-colors border-4 border-white hover:border-teal-500 p-1 rounded-xl bg-white',
            {
              'border-teal-500': color === 'dark',
            }
          )}
          onClick={() => setColor('dark')}
        >
          <span className="block rounded-md w-7 h-7 bg-gradient-to-br from-yellow-700 to-yellow-900" />
        </button>
      </div>

      <div className="rounded-xl p-2 bg-white">
        <div className="p-4 mb-2 space-x-10 whitespace-nowrap overflow-x-auto">
          {previews.map(({ label, key }) => (
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
          <ul className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 gap-6">
            {range(1, preview.total + 1).map((value) => {
              const src = `/previews/${color}/${active}/${value}.png`;

              return (
                <li className="relative pb-[100%] h-0 cursor-pointer" key={src}>
                  <span className="transition-colors absolute inset-0 border-4 border-gray-200 hover:border-teal-500 hover:shadow-[inset_0_0_0_4px_#ffffff] rounded-lg w-full h-full bg-gray-200" />
                  <img
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    src={src}
                    alt={`${active}-${value}`}
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
