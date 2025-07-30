import { useParams } from "react-router-dom";

export const useParamsIndex = () => {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  return index;
};
