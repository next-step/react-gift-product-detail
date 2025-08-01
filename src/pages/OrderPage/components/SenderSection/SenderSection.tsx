import Input from "@/components/Input/Input";
import styled from "@emotion/styled";
import SENDER_SECTION_CONSTANTS from "@/pages/OrderPage/constants/senderSection";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { FORM_FIELD } from "../../constants/formField";
import type { SenderFormData } from "../../schemas";
import { Typography } from "@/components/Typography/Typography";

interface SenderProps {
  control: Control<SenderFormData>;
  errors: FieldErrors<SenderFormData>;
}

const SendSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const SendForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

function SenderSectionComponent({ control, errors }: SenderProps) {
  return (
    <SendSection>
      <Typography variant="title2Bold" as="h2" color="default">
        {SENDER_SECTION_CONSTANTS.TITLE}
      </Typography>
      <SendForm>
        <Controller
          control={control}
          name={FORM_FIELD.SENDER_NAME}
          render={({ field }) => (
            <Input
              {...field}
              errorMessage={errors.senderName?.message}
              type="text"
              placeholder={SENDER_SECTION_CONSTANTS.NAME_PLACEHOLDER}
            />
          )}
        />
      </SendForm>
    </SendSection>
  );
}

export default SenderSectionComponent;
