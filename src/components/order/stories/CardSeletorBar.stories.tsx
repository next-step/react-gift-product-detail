import { CardSelectorBar } from "@/components/order/CardSelectorBar";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CardSelectorBar> = {
  component: CardSelectorBar,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof CardSelectorBar>;

export const Default: Story = {
  args: {},
};
