import { SenderInfoSection } from "@/components/order/SenderInfoSection";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SenderInfoSection> = {
  component: SenderInfoSection,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof SenderInfoSection>;

export const Default: Story = {
  args: {},
};
