import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import {
  TrendingGiftsSection,
  TitleWarpper,
  SectionTitle,
  TabsWrapper,
  MainTabButton,
  TabIconContainer,
  TabLabel,
  ErrorContainer,
  ErrorMessage,
} from "./TrendingGifts.styles";
import { LocalStorageProvider } from "@/pages/HomePage/context/TabStorageContext";
import { useMainTab, useSubTab } from "@/pages/HomePage/hooks/useTabStorage";
import { Loading } from "@/components/Loading/Loading";
import { RANK_TYPE, TARGET_TYPE, TRENDING_GIFTS_TABS } from "./constants/tabs";
import {
  TRENDING_GIFTS_ERROR_MESSAGES,
  TRENDING_GIFTS_LABELS,
} from "./constants/labels";
import { getTrendingGifts } from "@/data/api";
import TrendingGiftsProductsGrid from "./TrendingGiftsProductsGrid";
import TabContentWrapper from "./TabContentWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

function TrendingGiftsContent() {
  const [mainTabIdx, setMainTabIdx] = useMainTab();
  const [subTabIdx, setSubTabIdx] = useSubTab();

  const { data } = useSuspenseQuery<TrendingGiftsType[]>({
    queryKey: ["trendingGifts", mainTabIdx, subTabIdx],
    queryFn: () =>
      getTrendingGifts(TARGET_TYPE[mainTabIdx], RANK_TYPE[subTabIdx]),
  });

  return (
    <>
      <TabsWrapper>
        {TRENDING_GIFTS_TABS.map((el, idx) => (
          <MainTabButton key={idx} onClick={() => setMainTabIdx(idx)}>
            <TabIconContainer isSelected={idx === mainTabIdx}>
              {el.ICON}
            </TabIconContainer>
            <TabLabel isSelected={idx === mainTabIdx}>{el.NAME}</TabLabel>
          </MainTabButton>
        ))}
      </TabsWrapper>
      <TabContentWrapper subTabIdx={subTabIdx} onClick={setSubTabIdx}>
        <ErrorBoundary
          fallback={
            <ErrorContainer>
              <ErrorMessage>
                {TRENDING_GIFTS_ERROR_MESSAGES.FETCH_ERROR}
              </ErrorMessage>
            </ErrorContainer>
          }
        >
          <Suspense fallback={<Loading />}>
            <TrendingGiftsProductsGrid products={data} />
          </Suspense>
        </ErrorBoundary>
      </TabContentWrapper>
    </>
  );
}

function TrendingGifts() {
  return (
    <LocalStorageProvider>
      <TrendingGiftsSection>
        <TitleWarpper>
          <SectionTitle>{TRENDING_GIFTS_LABELS.SECTION_TITLE}</SectionTitle>
        </TitleWarpper>
        <TrendingGiftsContent />
      </TrendingGiftsSection>
    </LocalStorageProvider>
  );
}

export default TrendingGifts;
