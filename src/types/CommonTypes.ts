// 공통 API 응답 타입 제네릭
// res.data.data 사용 없이 타입 단언 제거 가능

export type Result<T> = {
  data: T;
};
