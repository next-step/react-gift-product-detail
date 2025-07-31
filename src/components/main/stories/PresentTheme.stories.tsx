import { PresentTheme } from "@/components/main";
import { MainPageDecorator } from "@/components/main/stories/MainPageDecorators";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PresentTheme> = {
  component: PresentTheme,
  decorators: [MainPageDecorator],
};

export default meta;
type Story = StoryObj<typeof PresentTheme>;

export const Default: Story = {
  args: {},
};
