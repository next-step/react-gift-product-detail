import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Typography from '../Typography';

describe('Typography 컴포넌트', () => {
  it('variant가 p일 때 <p> 태그로 렌더링된다', () => {
    render(<Typography variant="p">본문 내용</Typography>);
    const element = screen.getByText('본문 내용');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('variant가 h1일 때 <h1> 태그로 렌더링된다', () => {
    render(<Typography variant="h1">제목</Typography>);
    const element = screen.getByText('제목');
    expect(element.tagName.toLowerCase()).toBe('h1');
  });

  it('children 텍스트를 렌더링한다', () => {
    render(<Typography variant="p">Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
