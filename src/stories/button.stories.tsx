import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
const sizes = ['xs', 'sm', 'default', 'lg'] as const;

const meta = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Botão',
    variant: 'default',
    size: 'default',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: [...sizes, 'icon-xs', 'icon-sm', 'icon', 'icon-lg'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Excluir' } };
export const Link: Story = { args: { variant: 'link', children: 'Saiba mais' } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  args: { children: <><Plus data-icon="inline-start" /> Adicionar</> },
  argTypes: { children: { control: false } },
};

export const IconOnly: Story = {
  args: { children: <Plus />, size: 'icon', 'aria-label': 'Adicionar' },
  argTypes: { children: { control: false } },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => <Button {...args} key={variant} variant={variant}>{variant}</Button>)}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => <Button {...args} key={size} size={size}>{size}</Button>)}
    </div>
  ),
};
