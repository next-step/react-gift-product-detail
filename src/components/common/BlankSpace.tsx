import styled from "@emotion/styled";

type ThemeSpacing =
  | "spacing1"
  | "spacing2"
  | "spacing3"
  | "spacing4"
  | "spacing5"
  | "spacing6";

interface BlankSpaceProps {
  spacing?: ThemeSpacing;
  backgroundColor?: string;
}

const BlankSpaceContainer = styled.div<BlankSpaceProps>(
  ({ theme, spacing = "spacing1" }) => {
    const paddingValue =
      typeof spacing === "string" && spacing.startsWith("spacing")
        ? theme[spacing as ThemeSpacing]
        : spacing;

    return {
      display: "flex",
      width: "100%",
      paddingTop: paddingValue,
      backgroundColor: theme.color.gray[200],
    };
  },
);

export const BlankSpace = ({ spacing = "spacing1" }: BlankSpaceProps) => {
  return <BlankSpaceContainer spacing={spacing} />;
};
