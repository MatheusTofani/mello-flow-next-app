import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ToggleThemeButton } from '../themes/ToggleThemeButton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const meta = {
  title: 'Themes/ToggleThemeButton',
  component: ToggleThemeButton,
  parameters: {
    docs: {
      description: {
        component: 'Alterna a aparência (Light, Dark ou System) e a marca. Os providers e estilos são compartilhados pelo preview do Storybook. O menu organiza as opções nos grupos Appearance e Brand. Use a barra superior ou o próprio menu para experimentar os temas.',
      },
    },
  },
} satisfies Meta<typeof ToggleThemeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Light: Story = {
  name: 'Tema claro',
  globals: { appearance: 'light' },
};

export const Dark: Story = {
  name: 'Tema escuro',
  globals: { appearance: 'dark' },
};

export const System: Story = {
  name: 'Tema do sistema',
  globals: { appearance: 'system' },
};

export const OpenMenu: Story = {
  name: 'Menu aberto',
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Toggle theme' }));
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(page.getByRole('group', { name: 'Appearance' })).toBeVisible();
      expect(page.getByRole('group', { name: 'Brand' })).toBeVisible();
    });
  },
};

export const ThemeSwitching: Story = {
  name: 'Alternar aparência',
  globals: { appearance: 'light' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // O menu é renderizado em um portal fora do canvas.
    const document = canvasElement.ownerDocument;
    const page = within(document.body);
    const trigger = canvas.getByRole('button', { name: 'Toggle theme' });

    await userEvent.click(trigger);
    await waitFor(() => {
      expect(page.getByRole('group', { name: 'Appearance' })).toBeVisible();
      expect(page.getByRole('group', { name: 'Brand' })).toBeVisible();
    });
    await userEvent.click(page.getByRole('menuitem', { name: 'Dark' }));
    await waitFor(() => expect(document.documentElement).toHaveClass('dark'));

    await userEvent.click(trigger);
    await userEvent.click(await page.findByRole('menuitem', { name: 'Light' }));
    await waitFor(() => expect(document.documentElement).toHaveClass('light'));
  },
};

export const WithComponents: Story = {
  render: () => (
    <div className="w-80 max-w-full space-y-6 rounded-xl border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Experimente o tema</h2>
        <ToggleThemeButton />
      </div>
      <p className="text-sm text-muted-foreground">Use o menu para visualizar as cores nos componentes.</p>
      <Input placeholder="Digite aqui..." aria-label="Exemplo de input" />
      <div className="flex flex-wrap gap-2">
        <Button>Primário</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="secondary">Secundário</Button>
      </div>
    </div>
  ),
};
