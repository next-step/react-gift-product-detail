import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Typography } from '../Typography';

// Context for managing tab state
type TabsContextType = {
  activeValue: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs.Root');
  }
  return context;
};

// Root component
type TabsRootProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

const TabsRoot = ({ defaultValue = '', value, onValueChange, children }: TabsRootProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const activeValue = value !== undefined ? value : internalValue;
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange }}>
      <TabsWrapper>{children}</TabsWrapper>
    </TabsContext.Provider>
  );
};

// List component
type TabsListProps = {
  children: ReactNode;
};

const TabsList = ({ children }: TabsListProps) => {
  return <TabsListWrapper>{children}</TabsListWrapper>;
};

// Trigger component
type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

const TabsTrigger = ({ value, children, disabled = false }: TabsTriggerProps) => {
  const { activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  return (
    <TabsTriggerWrapper
      onClick={handleClick}
      isActive={isActive}
      disabled={disabled}
      role='tab'
      aria-selected={isActive}
      tabIndex={disabled ? -1 : 0}
    >
      <Typography variant='body1Regular' color={isActive ? 'default' : 'sub'}>
        {children}
      </Typography>
      {isActive && <ActiveIndicator />}
    </TabsTriggerWrapper>
  );
};

// Content component
type TabsContentProps = {
  value: string;
  children: ReactNode;
};

const TabsContent = ({ value, children }: TabsContentProps) => {
  const { activeValue } = useTabsContext();

  if (activeValue !== value) {
    return null;
  }

  return <TabsContentWrapper>{children}</TabsContentWrapper>;
};

// Styled components
const TabsWrapper = styled.div`
  width: 100%;
`;

const TabsListWrapper = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.scale.gray300};
`;

const TabsTriggerWrapper = styled.button<{ isActive: boolean; disabled: boolean }>`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.spacing4} ${theme.spacing.spacing5}`};
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  &:hover:not(:disabled) {
    background-color: ${({ theme, isActive }) =>
      isActive ? 'transparent' : theme.colors.scale.gray100};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.semantic.brand.kakaoYellow};
    outline-offset: -2px;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const TabsContentWrapper = styled.div`
  width: 100%;
`;

// Export as compound component
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
