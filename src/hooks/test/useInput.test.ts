import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useInput } from "@/hooks/useInput";

describe("useInput", () => {
  it("touched가 false일 때 validation이 실행되지 않아야 한다", () => {
    const mockValidation = vi.fn().mockReturnValue("에러 메시지");
    const { result } = renderHook(() =>
      useInput({ validation: mockValidation })
    );

    act(() => {
      result.current.handleInput("테스트 값");
    });

    expect(mockValidation).not.toHaveBeenCalled();
    expect(result.current.error).toBe("");
  });

  it("touched가 true일 때 handleInput에서 validation이 실행되어야 한다", () => {
    const mockValidation = vi.fn().mockReturnValue("에러 메시지");
    const { result } = renderHook(() =>
      useInput({ validation: mockValidation })
    );

    act(() => {
      result.current.handleBlur();
    });

    act(() => {
      result.current.handleInput("테스트 값");
    });

    expect(mockValidation).toHaveBeenCalledWith("테스트 값");
    expect(result.current.error).toBe("에러 메시지");
  });

  it("handleBlur가 touched를 true로 설정해야 한다", () => {
    const { result } = renderHook(() => useInput());

    expect(result.current.touched).toBe(false);

    act(() => {
      result.current.handleBlur();
    });

    expect(result.current.touched).toBe(true);
  });

  it("handleBlur에서 validation이 실행되어야 한다", () => {
    const mockValidation = vi.fn().mockReturnValue("에러 메시지");
    const { result } = renderHook(() =>
      useInput({ validation: mockValidation })
    );

    act(() => {
      result.current.handleInput("테스트 값");
    });

    act(() => {
      result.current.handleBlur();
    });

    expect(mockValidation).toHaveBeenCalledWith("테스트 값");
    expect(result.current.error).toBe("에러 메시지");
  });

  it("validation이 null을 반환할 때 error가 null이 되어야 한다", () => {
    const mockValidation = vi.fn().mockReturnValue(null);
    const { result } = renderHook(() =>
      useInput({ validation: mockValidation })
    );

    act(() => {
      result.current.handleBlur();
    });

    expect(result.current.error).toBe(null);
  });

  it("validation이 없을 때 error가 설정되지 않아야 한다", () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.handleBlur();
    });

    expect(result.current.error).toBe("");
  });
});
