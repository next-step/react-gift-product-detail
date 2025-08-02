import { ReceiverInfoForm } from "@/components/order/ReceiverInfoForm";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ReceiverInfoForm> = {
  component: ReceiverInfoForm,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof ReceiverInfoForm>;

export const Default: Story = {
  args: {},
};
