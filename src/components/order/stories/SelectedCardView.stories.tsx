import { SelectedCardView } from "@/components/order/SelectedCardView";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SelectedCardView> = {
  component: SelectedCardView,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof SelectedCardView>;

export const Default: Story = {
  args: {},
};
