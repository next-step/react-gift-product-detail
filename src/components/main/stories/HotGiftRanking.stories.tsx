import { HotGiftRanking } from "@/components/main";
import { MainPageDecorator } from "@/components/main/stories/MainPageDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof HotGiftRanking> = {
  component: HotGiftRanking,
  decorators: [MainPageDecorator],
};

export default meta;
type Story = StoryObj<typeof HotGiftRanking>;

export const Default: Story = {
  args: {},
};
