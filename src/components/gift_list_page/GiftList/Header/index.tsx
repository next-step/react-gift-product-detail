import styled from '@emotion/styled';
import React, { useCallback, useEffect } from 'react';
import { TargetButton } from './TargetButton';
import { TopicButton } from './TopicButton';

interface Header {
  targetType: string;
  setTargetType: React.Dispatch<React.SetStateAction<string>>;
  rankType: string;
  setRankType: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
  background-color: white;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.title1Bold};
  margin-top: ${({ theme }) => theme.spacing.spacing10};
  margin-left: ${({ theme }) => theme.spacing.spacing4};
  color: black;
`;

const TargetBtnContainer = styled.div`
  width: calc(100% - ${({ theme }) => theme.spacing.spacing10});
  height: 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  margin-left: ${({ theme }) => theme.spacing.spacing5};
  margin-right: ${({ theme }) => theme.spacing.spacing5};
`;

const TopicBtnContainer = styled.div`
  width: 100%;
  height: 3.7rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(100% - ${({ theme }) => theme.spacing.spacing8});
  height: calc(100% - ${({ theme }) => theme.spacing.spacing4});
  background-color: white;
  margin-left: ${({ theme }) => theme.spacing.spacing4};
  margin-right: ${({ theme }) => theme.spacing.spacing4};
  overflow: hidden;
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.blue300};
`;

export const Header = ({ targetType, setTargetType, rankType, setRankType }: Header) => {
  const handleTargetClick = useCallback(() => {
    localStorage.setItem('currentTarget', targetType);
  }, [targetType]);

  useEffect(() => {
    handleTargetClick();
  }, [handleTargetClick]);

  const handleTopicClick = useCallback(() => {
    localStorage.setItem('currentTopic', rankType);
  }, [rankType]);

  useEffect(() => {
    handleTopicClick();
  }, [handleTopicClick]);

  return (
    <Container>
      <Title>실시간 급상승 선물랭킹</Title>
      <TargetBtnContainer>
        <TargetButton
          targetType="ALL"
          isClicked={targetType === 'ALL'}
          setTargetType={setTargetType}
          aria-pressed={targetType === 'ALL'}
        />
        <TargetButton
          targetType="FEMALE"
          isClicked={targetType === 'FEMALE'}
          setTargetType={setTargetType}
          aria-pressed={targetType === 'FEMALE'}
        />
        <TargetButton
          targetType="MALE"
          isClicked={targetType === 'MALE'}
          setTargetType={setTargetType}
          aria-pressed={targetType === 'MALE'}
        />
        <TargetButton
          targetType="TEEN"
          isClicked={targetType === 'TEEN'}
          setTargetType={setTargetType}
          aria-pressed={targetType === 'TEEN'}
        />
      </TargetBtnContainer>
      <TopicBtnContainer>
        <Wrapper>
          <TopicButton
            topicType="MANY_WISH"
            isClicked={rankType === 'MANY_WISH'}
            setRankType={setRankType}
            aria-pressed={rankType === 'MANY_WISH'}
          />
          <TopicButton
            topicType="MANY_RECEIVE"
            isClicked={rankType === 'MANY_RECEIVE'}
            setRankType={setRankType}
            aria-pressed={rankType === 'MANY_RECEIVE'}
          />
          <TopicButton
            topicType="MANY_WISH_RECEIVE"
            isClicked={rankType === 'MANY_WISH_RECEIVE'}
            setRankType={setRankType}
            aria-pressed={rankType === 'MANY_WISH_RECEIVE'}
          />
        </Wrapper>
      </TopicBtnContainer>
    </Container>
  );
};
