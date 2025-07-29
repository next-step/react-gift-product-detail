import { Typography } from "@/components/Typography/Typography";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Typography
      variant="label2Regular"
      as="p"
      color="status-critical"
      style={{
        marginLeft: "0.25rem",
        marginTop: "2px",
      }}
    >
      {children}
    </Typography>
  );
};
