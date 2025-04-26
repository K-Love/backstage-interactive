import type { Meta, StoryObj } from '@storybook/react';
import Card from '@/components/Card';
import { Globe } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Web Development',
    description: 'Custom websites and applications built with modern technologies and best practices.',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <Globe size={24} />,
  },
};