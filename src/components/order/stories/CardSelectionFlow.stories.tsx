import { CardSelectorBar } from "@/components/order/CardSelectorBar";
import { SelectedCardView } from "@/components/order/SelectedCardView";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  decorators: [OrderDecorator],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <>
      <CardSelectorBar />
      <SelectedCardView />
    </>
  ),
};
