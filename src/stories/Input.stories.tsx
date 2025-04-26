import type { Meta, StoryObj } from '@storybook/react';
import Input from '@/components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Email: Story = {
  args: { type: 'email', label: 'Email', placeholder: 'Enter your email' },
};