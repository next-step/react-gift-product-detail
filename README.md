## 0단계 - 기본 코드 준비 및 미션 3 피드백 반영

# src/api/themes.ts
- API 관련 부분은 언제든지 수정 될 수 있으니 가급적이면 type 분리 이후에 적용

# src/pages/ThemeProductsPage.tsx
- load 함수와 useEffect 내부 로직이 동일한 흐름이므로 이 부분을 훅으로 처리