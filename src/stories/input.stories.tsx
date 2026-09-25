import { useId } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Input } from '../components/ui/input';

const meta = {
  title: 'UI/Input',
  component: Input,
  args: {
    placeholder: 'Digite aqui...',
    type: 'text',
    disabled: false,
    readOnly: false,
    'aria-label': 'Campo de texto',
    onChange: fn(),
  },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
  decorators: [(Story) => <div className="w-72 max-w-full"><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Mello Flow' } };
export const Email: Story = { args: { type: 'email', placeholder: 'voce@exemplo.com', 'aria-label': 'E-mail' } };
export const Password: Story = { args: { type: 'password', defaultValue: 'senha-exemplo', 'aria-label': 'Senha' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Campo desabilitado' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Somente leitura' } };

export const WithLabel: Story = {
  render: function LabeledInput(args) {
    const id = useId();
    return (
      <div className="grid gap-2">
        <label htmlFor={id} className="text-sm font-medium">Nome</label>
        <Input {...args} id={id} aria-label={undefined} aria-describedby={`${id}-hint`} placeholder="Seu nome" />
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">Como você gostaria de ser chamado?</p>
      </div>
    );
  },
};

export const Invalid: Story = {
  args: { type: 'email', defaultValue: 'email-invalido', 'aria-invalid': true },
  render: function InvalidInput(args) {
    const id = useId();
    return (
      <div className="grid gap-2">
        <label htmlFor={id} className="text-sm font-medium">E-mail</label>
        <Input {...args} id={id} aria-label={undefined} aria-describedby={`${id}-error`} />
        <p id={`${id}-error`} className="text-xs text-destructive">Informe um e-mail válido.</p>
      </div>
    );
  },
};
