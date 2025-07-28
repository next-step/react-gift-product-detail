import { Loading } from "@/components/Loading/Loading";
import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail, getProductWish } from "@/data/api";
import Layout from "@/layout";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import ErrorBoundary from "@/components/Error/ErrorBoundary/ErrorBoundary";
import { useNavigate, useParams } from "react-router-dom";
import LikeIconImage from "./assets/heart.png";
import LikeIconImageFill from "./assets/heart-fill.png";
import {
  ContentLayout,
  LikeCount,
  LikeIcon,
  LikeIconContainer,
  OrderButton,
  OrderButtonContainer,
} from "./ProductDetailPage.styles";
import { ROUTES } from "@/constants/routes";
import ProductHeader from "./components/ProductHeader/ProductHeader";
import { PRODUCT_DETAIL_LABELS } from "./constants/labels";
import ProductTabContents from "./components/ProductTabContents/ProductTabContents";
import { FallbackMessage } from "@/components/Error/FallbackMessage/FallbackMessage";
import type { Wish } from "@/types/Wish";

function ProductDetailPage() {
  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <FallbackMessage message={PRODUCT_DETAIL_LABELS.NO_PRODUCT_MESSAGE} />
        }
      >
        <Suspense fallback={<Loading />}>
          <ProductDetailQueryContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

function ProductDetailQueryContent() {
  const { id } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(id),
    queryFn: () => getProductDetail(id!),
  });

  if (!id) {
    throw new Error(PRODUCT_DETAIL_LABELS.NO_PRODUCT_MESSAGE);
  }

  return (
    <BottomNavigationWrapper productId={id}>
      <ProductHeader data={data} />
      <ProductTabContents productId={id} />
    </BottomNavigationWrapper>
  );
}

function BottomNavigationWrapper({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: QUERY_KEY.PRODUCT_WISH(productId),
    queryFn: () => getProductWish(productId),
  });

  const wishMutation = useMutation({
    mutationFn: () => {
      console.log("api post wish.isWished", !data?.isWished);
      return Promise.resolve();
      // const current = queryClient.getQueryData<Wish>(
      //   QUERY_KEY.PRODUCT_WISH(productId)
      // );
      // if (!current) throw new Error("좋아요 정보가 없습니다.");

      // const nextIsWished = !current.isWished;
      // const nextWishCount = current.wishCount + (nextIsWished ? 1 : -1);

      // return new Promise<Wish>((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       isWished: nextIsWished,
      //       wishCount: nextWishCount,
      //     });
      //   }, 500);
      // });
    },
    onMutate: async () => {
      // 캐시만 업데이트
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.PRODUCT_WISH(productId),
      });

      const previousData = queryClient.getQueryData(
        QUERY_KEY.PRODUCT_WISH(productId)
      );
      queryClient.setQueryData(
        QUERY_KEY.PRODUCT_WISH(productId),
        (old: Wish) => {
          return {
            isWished: !old.isWished,
            wishCount: old.wishCount + (old.isWished ? -1 : 1),
          };
        }
      );

      return { previousData };
    },
    onSettled: () => {
      // 캐시 리페치
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEY.PRODUCT_WISH(productId),
      // });
    },
    onError: (error, _, context) => {
      console.log("wish mutation error", error);
      queryClient.setQueryData(
        QUERY_KEY.PRODUCT_WISH(productId),
        context?.previousData
      );
    },
  });

  const handleLikeToggle = async () => {
    if (wishMutation.isPending) {
      return;
    }
    wishMutation.mutate();
  };

  const handleOrderButtonClick = () => {
    navigate(ROUTES.ORDER.replace(":id", productId));
  };

  return (
    <>
      <ProductDetailContentLayout>{children}</ProductDetailContentLayout>
      <OrderButtonContainer>
        <LikeIconContainer onClick={handleLikeToggle}>
          <LikeIcon
            src={data?.isWished ? LikeIconImageFill : LikeIconImage}
            alt=""
          />
          <LikeCount>{data?.wishCount}</LikeCount>
        </LikeIconContainer>
        <OrderButton onClick={handleOrderButtonClick}>
          {PRODUCT_DETAIL_LABELS.ORDER_BUTTON}
        </OrderButton>
      </OrderButtonContainer>
    </>
  );
}

function ProductDetailContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout>{children}</ContentLayout>;
}

export default ProductDetailPage;
