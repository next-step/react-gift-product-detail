import { LoginForm } from "@/components/login/LoginForm";
import { LoginDecorator } from "@/components/login/stories/LoginDecorator";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  decorators: [LoginDecorator],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
