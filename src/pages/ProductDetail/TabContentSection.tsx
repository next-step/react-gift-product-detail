import React from 'react';
import {
  TabContent,
  ProductDescription,
  ReviewList,
  ReviewItem,
  ReviewAuthor,
  ReviewContent,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementName,
  AnnouncementValue,
  LoadingSpinner,
  ErrorMessage,
} from './ProductDetail.styles';
import type { ProductDetail, ProductReview } from '@/types/product';

type TabType = 'description' | 'reviews' | 'detail';

interface TabContentSectionProps {
  activeTab: TabType;
  productDetail?: ProductDetail;
  productReviews?: ProductReview;
  isLoadingReviews: boolean;
  errorReviews: Error | null;
  isLoadingDetail: boolean;
  errorDetail: Error | null;
}

const TabContentSection: React.FC<TabContentSectionProps> = ({
  activeTab,
  productDetail,
  productReviews,
  isLoadingReviews,
  errorReviews,
  isLoadingDetail,
  errorDetail,
}) => {
  return (
    <TabContent>
      {activeTab === 'description' && (
        <ProductDescription>
          {productDetail?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: productDetail.description,
              }}
            />
          ) : (
            '상품 설명을 불러오는 중...'
          )}
        </ProductDescription>
      )}

      {activeTab === 'reviews' && (
        <ReviewList>
          {isLoadingReviews ? (
            <LoadingSpinner>리뷰를 불러오는 중...</LoadingSpinner>
          ) : errorReviews ? (
            <ErrorMessage>리뷰를 불러올 수 없습니다.</ErrorMessage>
          ) : productReviews?.reviews && productReviews.reviews.length > 0 ? (
            productReviews.reviews.map((review) => (
              <ReviewItem key={review.id}>
                <ReviewAuthor>{review.authorName}</ReviewAuthor>
                <ReviewContent>{review.content}</ReviewContent>
              </ReviewItem>
            ))
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: '#666',
                padding: '40px 0',
              }}
            >
              아직 리뷰가 없습니다.
            </div>
          )}
        </ReviewList>
      )}

      {activeTab === 'detail' && (
        <AnnouncementList>
          {isLoadingDetail ? (
            <LoadingSpinner>상세 정보를 불러오는 중...</LoadingSpinner>
          ) : errorDetail ? (
            <ErrorMessage>상세 정보를 불러올 수 없습니다.</ErrorMessage>
          ) : productDetail?.announcements &&
            productDetail.announcements.length > 0 ? (
            <>
              {productDetail.announcements.map((item, index) => (
                <AnnouncementItem key={index}>
                  <AnnouncementName>{item.name}</AnnouncementName>
                  <AnnouncementValue>{item.value}</AnnouncementValue>
                </AnnouncementItem>
              ))}
            </>
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: '#666',
                padding: '40px 0',
              }}
            >
              상세 정보가 없습니다.
            </div>
          )}
        </AnnouncementList>
      )}
    </TabContent>
  );
};

export default TabContentSection;
