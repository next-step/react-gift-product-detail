import styled from '@emotion/styled';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

const SegmentedControl = <T extends string>({
  options,
  selectedValue,
  onSelect,
}: SegmentedControlProps<T>) => {
  return (
    <Wrapper>
      {options.map(({ label, value }) => {
        const isSelected = selectedValue === value;
        return (
          <Button
            key={value}
            isSelected={isSelected}
            onClick={() => onSelect(value)}
          >
            {label}
          </Button>
        );
      })}
    </Wrapper>
  );
};

export default SegmentedControl;

const Wrapper = styled.div`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.gray[200]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Button = styled.button<{ isSelected: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]};
  ${({ theme, isSelected }) =>
    isSelected
      ? theme.typography.subtitle.subtitle2Bold
      : theme.typography.subtitle.subtitle2Regular};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.blue[600] : theme.color.blue[400]};
  background-color: ${({ theme }) => theme.color.blue[100]};
  border: none;
  cursor: pointer;
`;
