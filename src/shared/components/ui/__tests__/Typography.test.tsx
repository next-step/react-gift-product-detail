import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { theme } from '@/shared/styles/theme'
import Typography, { getTypographyStyle, typographyMixin } from '../Typography'

describe('Typography 컴포넌트', () => {
  describe('기본 렌더링', () => {
    /**
     * 시나리오: Typography가 기본 props로 올바르게 렌더링된다.
     * - Given: Typography 컴포넌트의 기본 props가 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: 텍스트가 화면에 표시되고 span 태그로 렌더링된다.
     */
    it('Typography가 기본 props로 올바르게 렌더링되는지 테스트', () => {
      // Given
      const variant = 'body1Regular'
      const children = '테스트 텍스트'

      // When
      render(<Typography variant={variant}>{children}</Typography>)

      // Then
      const element = screen.getByText(children)
      expect(element).toBeInTheDocument()
      expect(element.tagName).toBe('SPAN')
    })

    /**
     * 시나리오: Typography가 as prop으로 다른 HTML 요소를 렌더링한다.
     * - Given: Typography 컴포넌트에 as prop이 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: 지정된 HTML 요소로 렌더링된다.
     */
    it('Typography가 as prop으로 다른 HTML 요소를 렌더링하는지 테스트', () => {
      // Given
      const variant = 'title1Bold'
      const as = 'h1'
      const children = '제목 텍스트'

      // When
      render(
        <Typography variant={variant} as={as}>
          {children}
        </Typography>,
      )

      // Then
      const element = screen.getByText(children)
      expect(element.tagName).toBe('H1')
    })

    /**
     * 시나리오: Typography가 className prop을 올바르게 적용한다.
     * - Given: Typography 컴포넌트에 className이 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: className이 적용된다.
     */
    it('Typography가 className prop을 올바르게 적용하는지 테스트', () => {
      // Given
      const variant = 'body1Regular'
      const className = 'custom-class'
      const children = '테스트 텍스트'

      // When
      render(
        <Typography variant={variant} className={className}>
          {children}
        </Typography>,
      )

      // Then
      const element = screen.getByText(children)
      expect(element).toHaveClass(className)
    })
  })

  describe('Typography variants', () => {
    const variants = [
      'title1Bold',
      'title1Regular',
      'title2Bold',
      'title2Regular',
      'subtitle1Bold',
      'subtitle1Regular',
      'subtitle2Bold',
      'subtitle2Regular',
      'body1Bold',
      'body1Regular',
      'body2Bold',
      'body2Regular',
      'label1Bold',
      'label1Regular',
      'label2Bold',
      'label2Regular',
    ] as const

    variants.forEach((variant) => {
      /**
       * 시나리오: Typography가 각 variant로 올바르게 렌더링된다.
       * - Given: 특정 variant가 주어졌을 때
       * - When: Typography 컴포넌트를 해당 variant로 렌더링하면
       * - Then: 텍스트가 화면에 표시된다.
       */
      it(`Typography가 ${variant} variant로 올바르게 렌더링되는지 테스트`, () => {
        // Given
        const children = `${variant} 텍스트`

        // When
        render(<Typography variant={variant}>{children}</Typography>)

        // Then
        const element = screen.getByText(children)
        expect(element).toBeInTheDocument()
      })
    })
  })

  describe('스타일 적용', () => {
    /**
     * 시나리오: Typography가 variant에 따른 스타일을 올바르게 적용한다.
     * - Given: 특정 variant와 예상 스타일이 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: 해당 variant의 스타일이 정확히 적용된다.
     */
    it('Typography가 variant에 따른 스타일을 올바르게 적용하는지 테스트', () => {
      // Given
      const variant = 'title1Bold'
      const children = '제목 텍스트'
      const expectedStyle = theme.typography.title.title1Bold

      // When
      render(<Typography variant={variant}>{children}</Typography>)

      // Then
      const element = screen.getByText(children)
      const computedStyle = window.getComputedStyle(element)

      expect(computedStyle.fontSize).toBe(expectedStyle.fontSize)
      expect(computedStyle.fontWeight).toBe(expectedStyle.fontWeight.toString())
      expect(computedStyle.lineHeight).toBe(expectedStyle.lineHeight)
    })
  })

  describe('children 렌더링', () => {
    /**
     * 시나리오: Typography가 문자열 children을 올바르게 렌더링한다.
     * - Given: 문자열 children이 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: 문자열이 화면에 표시된다.
     */
    it('Typography가 문자열 children을 올바르게 렌더링하는지 테스트', () => {
      // Given
      const variant = 'body1Regular'
      const children = '일반 텍스트'

      // When
      render(<Typography variant={variant}>{children}</Typography>)

      // Then
      expect(screen.getByText(children)).toBeInTheDocument()
    })

    /**
     * 시나리오: Typography가 JSX children을 올바르게 렌더링한다.
     * - Given: JSX children이 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: JSX 요소들이 화면에 표시된다.
     */
    it('Typography가 JSX children을 올바르게 렌더링하는지 테스트', () => {
      // Given
      const variant = 'body1Regular'
      const children = (
        <>
          <span>JSX</span> 텍스트
        </>
      )

      // When
      render(<Typography variant={variant}>{children}</Typography>)

      // Then
      expect(screen.getByText('JSX')).toBeInTheDocument()
      expect(screen.getByText('텍스트')).toBeInTheDocument()
    })

    /**
     * 시나리오: Typography가 숫자 children을 올바르게 렌더링한다.
     * - Given: 숫자 children이 주어졌을 때
     * - When: Typography 컴포넌트를 렌더링하면
     * - Then: 숫자가 문자열로 변환되어 화면에 표시된다.
     */
    it('Typography가 숫자 children을 올바르게 렌더링하는지 테스트', () => {
      // Given
      const variant = 'body1Regular'
      const children = 123

      // When
      render(<Typography variant={variant}>{children}</Typography>)

      // Then
      expect(screen.getByText('123')).toBeInTheDocument()
    })
  })
})

describe('Typography 유틸리티 함수들', () => {
  describe('getTypographyStyle', () => {
    /**
     * 시나리오: getTypographyStyle이 올바른 variant에 대한 스타일을 반환한다.
     * - Given: 특정 variant가 주어졌을 때
     * - When: getTypographyStyle 함수를 호출하면
     * - Then: 해당 variant의 스타일이 반환된다.
     */
    it('getTypographyStyle이 올바른 variant에 대한 스타일을 반환하는지 테스트', () => {
      // Given
      const variant = 'title1Bold'
      const expectedStyle = theme.typography.title.title1Bold

      // When
      const style = getTypographyStyle(variant)

      // Then
      expect(style).toEqual(expectedStyle)
    })

    /**
     * 시나리오: getTypographyStyle이 모든 variant에 대해 스타일을 반환한다.
     * - Given: 모든 variant 목록이 주어졌을 때
     * - When: 각 variant에 대해 getTypographyStyle을 호출하면
     * - Then: 모든 스타일 속성이 정의된다.
     */
    it('getTypographyStyle이 모든 variant에 대해 스타일을 반환하는지 테스트', () => {
      // Given
      const variants = [
        'title1Bold',
        'title1Regular',
        'title2Bold',
        'title2Regular',
        'subtitle1Bold',
        'subtitle1Regular',
        'subtitle2Bold',
        'subtitle2Regular',
        'body1Bold',
        'body1Regular',
        'body2Bold',
        'body2Regular',
        'label1Bold',
        'label1Regular',
        'label2Bold',
        'label2Regular',
      ] as const

      // When & Then
      variants.forEach((variant) => {
        const style = getTypographyStyle(variant)

        expect(style).toBeDefined()
        expect(style.fontSize).toBeDefined()
        expect(style.fontWeight).toBeDefined()
        expect(style.lineHeight).toBeDefined()
      })
    })
  })

  describe('typographyMixin', () => {
    /**
     * 시나리오: typographyMixin이 올바른 CSS 문자열을 반환한다.
     * - Given: 특정 variant와 예상 스타일이 주어졌을 때
     * - When: typographyMixin 함수를 호출하면
     * - Then: 해당 스타일의 CSS 문자열이 반환된다.
     */
    it('typographyMixin이 올바른 CSS 문자열을 반환하는지 테스트', () => {
      // Given
      const variant = 'title1Bold'
      const expectedStyle = theme.typography.title.title1Bold

      // When
      const mixin = typographyMixin(variant)

      // Then
      expect(mixin).toContain(`font-size: ${expectedStyle.fontSize}`)
      expect(mixin).toContain(`font-weight: ${expectedStyle.fontWeight}`)
      expect(mixin).toContain(`line-height: ${expectedStyle.lineHeight}`)
    })

    /**
     * 시나리오: typographyMixin이 모든 variant에 대해 CSS 문자열을 반환한다.
     * - Given: 여러 variant가 주어졌을 때
     * - When: 각 variant에 대해 typographyMixin을 호출하면
     * - Then: CSS 속성들이 포함된 문자열이 반환된다.
     */
    it('typographyMixin이 모든 variant에 대해 CSS 문자열을 반환하는지 테스트', () => {
      // Given
      const variants = ['title1Bold', 'body1Regular', 'label2Bold'] as const

      // When & Then
      variants.forEach((variant) => {
        const mixin = typographyMixin(variant)

        expect(typeof mixin).toBe('string')
        expect(mixin).toContain('font-size:')
        expect(mixin).toContain('font-weight:')
        expect(mixin).toContain('line-height:')
      })
    })
  })
})

describe('Typography 접근성', () => {
  /**
   * 시나리오: Typography가 스크린 리더에서 읽을 수 있도록 렌더링된다.
   * - Given: 접근성을 위한 텍스트가 주어졌을 때
   * - When: Typography 컴포넌트를 렌더링하면
   * - Then: 스크린 리더가 텍스트를 읽을 수 있다.
   */
  it('Typography가 스크린 리더에서 읽을 수 있도록 렌더링되는지 테스트', () => {
    // Given
    const variant = 'body1Regular'
    const children = '접근성 테스트 텍스트'

    // When
    render(<Typography variant={variant}>{children}</Typography>)

    // Then
    const element = screen.getByText(children)
    expect(element).toBeInTheDocument()
  })

  /**
   * 시나리오: Typography가 제목 요소로 렌더링될 때 적절한 heading 레벨을 가진다.
   * - Given: 제목용 Typography 컴포넌트가 주어졌을 때
   * - When: Typography 컴포넌트를 제목 요소로 렌더링하면
   * - Then: 적절한 heading 레벨을 가진다.
   */
  it('Typography가 제목 요소로 렌더링될 때 적절한 heading 레벨을 가지는지 테스트', () => {
    // Given
    const variant = 'title1Bold'
    const as = 'h1'
    const children = '메인 제목'

    // When
    render(
      <Typography variant={variant} as={as}>
        {children}
      </Typography>,
    )

    // Then
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(children)
  })
})

describe('Typography 에러 케이스', () => {
  /**
   * 시나리오: Typography가 null children을 렌더링할 수 있다.
   * - Given: null children이 주어졌을 때
   * - When: Typography 컴포넌트를 렌더링하면
   * - Then: 컴포넌트가 렌더링된다 (에러가 발생하지 않음).
   */
  it('Typography가 null children을 렌더링할 수 있는지 테스트', () => {
    // Given
    const variant = 'body1Regular'
    const children = null

    // When
    render(<Typography variant={variant}>{children}</Typography>)

    // Then
    expect(document.querySelector('span')).toBeInTheDocument()
  })
})
