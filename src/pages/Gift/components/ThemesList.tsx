import styled from "@emotion/styled";
import getThemes from "@/apis/themes/getThemes";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { generatePath, Link } from "react-router-dom";
import { ROUTE_PATH } from "@/components/routes/routePath";

const ThemesList = () => {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.THEMES,
    queryFn: getThemes,
  });

  return (
    <List>
      {data.map((category) => (
        <Item key={category.themeId} to={generatePath(ROUTE_PATH.THEMES, { themeId: String(category.themeId) })}>
          <Img src={category.image} alt={category.name} />
          <Name>{category.name}</Name>
        </Item>
      ))}
    </List>
  );
};

export default ThemesList;

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing2};
`;
const Item = styled(Link)`
  width: 100%;
  height: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  text-decoration: none;
`;
const Img = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;
const Name = styled.p`
  font: ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.textColor.default};
`;
