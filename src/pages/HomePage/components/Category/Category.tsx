import ThemeCard from "./ThemeCard";
import { CATEGORY_ERROR_MESSAGE, CATEGORY_LABELS } from "./constants/labels";
import {
  ErrorContainer,
  ErrorMessage,
  GiftThemeSection,
  SectionHeader,
  SectionTitle,
  ThemeGrid,
} from "./Category.styles";
import { Loading } from "@/components/Loading/Loading";
import { getThemes } from "@/data/api";
import type { GiftThemeType } from "@/types/GiftThemeType";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function CategoryContent() {
  const { data } = useSuspenseQuery<GiftThemeType[]>({
    queryKey: ["themes"],
    queryFn: getThemes,
    select: (data: GiftThemeType[]) => {
      if (data.length === 0) {
        throw new Error(CATEGORY_ERROR_MESSAGE.EMPTY_DATA_ERROR);
      }

      return data;
    },
  });

  return (
    <ThemeGrid>
      {data?.map((theme) => (
        <ThemeCard
          key={theme.themeId}
          themeId={theme.themeId}
          name={theme.name}
          image={theme.image}
        />
      ))}
    </ThemeGrid>
  );
}

function Category() {
  return (
    <GiftThemeSection>
      <SectionHeader>
        <SectionTitle>{CATEGORY_LABELS.SECTION_TITLE}</SectionTitle>
      </SectionHeader>
      <ErrorBoundary
        fallback={
          <ErrorContainer>
            <ErrorMessage>
              {CATEGORY_ERROR_MESSAGE.DATA_LOADING_ERROR}
            </ErrorMessage>
          </ErrorContainer>
        }
      >
        <Suspense fallback={<Loading />}>
          <CategoryContent />
        </Suspense>
      </ErrorBoundary>
    </GiftThemeSection>
  );
}

export default Category;
