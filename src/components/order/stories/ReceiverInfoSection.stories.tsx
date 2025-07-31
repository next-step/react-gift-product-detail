import { ReceiverInfoSection } from "@/components/order/ReceiverInfoSection";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ReceiverInfoSection> = {
  component: ReceiverInfoSection,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof ReceiverInfoSection>;

export const Default: Story = {
  args: {},
};
