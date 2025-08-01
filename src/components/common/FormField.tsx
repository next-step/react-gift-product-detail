import styled from '@emotion/styled';
import React from 'react';

const FieldWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ label, error, children }: FormFieldProps) => (
  <FieldWrapper>
    <Label>{label}</Label>
    {children}
    {error && <Error role="alert">{error}</Error>}
  </FieldWrapper>
);

export default FormField;
