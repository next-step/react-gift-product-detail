import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Box = styled.div`
  background-color: white;
  height: 350px;
`;

const List = styled.ul`
  display: flex;
  gap: 17px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 20px;

  margin: 20px 10px;
  padding: 10px 0px 0px 10px;
`;

const Item = styled.li`
  width: 20%;
  text-align: center;

  cursor: pointer;

  margin: 5px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin-bottom: 3px;
`;

const Name = styled.div`
  font-size: 12px;
`;

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

type BaseResponse<T> = { data: T };

function CategoryList({ onHide }: { onHide?: () => void }) {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<Theme[], Error>({
    queryKey: ['themes'],
    queryFn: async () => {
      const res = await axios.get<BaseResponse<Theme[]>>('/api/themes');
      return res.data.data;
    },
  });

  const themes: Theme[] = data || [];

  if (isLoading)
    return (
      <Box>
        <Title>선물 테마</Title>
        <div>로딩 중 ... </div>
      </Box>
    );
  if (isError)
    return (
      <Box>
        <Title>선물 테마</Title>
        <div>{error?.message}</div>
      </Box>
    );
  if (themes.length === 0)
    return (
      <Box>
        <Title>선물 테마</Title>
      </Box>
    );

  return (
    <Box>
      <Title>선물 테마</Title>
      <List>
        {themes.map((theme) => (
          <Item
            key={theme.themeId}
            onClick={() => {
              navigate(`/themes/${theme.themeId}`);
              if (onHide) onHide();
            }}
          >
            <Img src={theme.image} alt={theme.name} />
            <Name>{theme.name}</Name>
          </Item>
        ))}
      </List>
    </Box>
  );
}

export default CategoryList;
