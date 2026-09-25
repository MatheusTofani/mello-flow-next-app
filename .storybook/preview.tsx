import { useEffect, useRef } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { useTheme } from 'next-themes';
import { ThemeProvider } from '../src/themes/ThemeProvider';
import { WhiteLabelProvider } from '../src/themes/WhiteLabelContext';
import '../src/app/globals.css';

function SyncAppearance({ appearance }: { appearance: string }) {
  const { setTheme } = useTheme();
  const lastAppearance = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (lastAppearance.current === appearance) return;
    lastAppearance.current = appearance;
    setTheme(appearance);
  }, [appearance, setTheme]);

  return null;
}

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    appearance: {
      description: 'Aparência dos componentes',
      toolbar: {
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Escuro' },
          { value: 'system', title: 'Sistema' },
        ],
      },
    },
  },
  initialGlobals: { appearance: 'light' },
  decorators: [
    (Story, context) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="storybook-appearance" disableTransitionOnChange>
        <WhiteLabelProvider>
          <SyncAppearance appearance={context.globals.appearance} />
          <div className="bg-background p-6 text-foreground">
            <Story />
          </div>
        </WhiteLabelProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
