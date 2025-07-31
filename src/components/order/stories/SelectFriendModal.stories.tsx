import { SelectFriendModal } from "@/components/order/SelectFriendModal";
import { OrderDecorator } from "@/components/order/stories/OrderDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SelectFriendModal> = {
  component: SelectFriendModal,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof SelectFriendModal>;

export const Default: Story = {
  args: {},
};
