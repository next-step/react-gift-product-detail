import { describe, it, expect } from 'vitest';
import { typography } from '@/styles/Typography';

describe('Typography', () => {
  describe('title1Bold', () => {
    it('should have correct font size', () => {
      expect(typography.title1Bold.fontSize).toBe('1.25rem');
    });

    it('should have correct font weight', () => {
      expect(typography.title1Bold.fontWeight).toBe(700);
    });

    it('should have correct line height', () => {
      expect(typography.title1Bold.lineHeight).toBe('1.6875rem');
    });
  });

  describe('title1Regular', () => {
    it('should have correct font size', () => {
      expect(typography.title1Regular.fontSize).toBe('1.25rem');
    });

    it('should have correct font weight', () => {
      expect(typography.title1Regular.fontWeight).toBe(400);
    });

    it('should have correct line height', () => {
      expect(typography.title1Regular.lineHeight).toBe('1.6875rem');
    });
  });

  describe('title2Bold', () => {
    it('should have correct font size', () => {
      expect(typography.title2Bold.fontSize).toBe('1rem');
    });

    it('should have correct font weight', () => {
      expect(typography.title2Bold.fontWeight).toBe(700);
    });

    it('should have correct line height', () => {
      expect(typography.title2Bold.lineHeight).toBe('1.5rem');
    });
  });

  describe('body1Regular', () => {
    it('should have correct font size', () => {
      expect(typography.body1Regular.fontSize).toBe('1rem');
    });

    it('should have correct font weight', () => {
      expect(typography.body1Regular.fontWeight).toBe(400);
    });

    it('should have correct line height', () => {
      expect(typography.body1Regular.lineHeight).toBe('1.375rem');
    });
  });

  describe('label1Bold', () => {
    it('should have correct font size', () => {
      expect(typography.label1Bold.fontSize).toBe('0.875rem');
    });

    it('should have correct font weight', () => {
      expect(typography.label1Bold.fontWeight).toBe(700);
    });

    it('should have correct line height', () => {
      expect(typography.label1Bold.lineHeight).toBe('1.1875rem');
    });
  });

  describe('label2Regular', () => {
    it('should have correct font size', () => {
      expect(typography.label2Regular.fontSize).toBe('0.75rem');
    });

    it('should have correct font weight', () => {
      expect(typography.label2Regular.fontWeight).toBe(400);
    });

    it('should have correct line height', () => {
      expect(typography.label2Regular.lineHeight).toBe('1rem');
    });
  });

  describe('Typography consistency', () => {
    it('should have consistent structure for all typography variants', () => {
      const typographyKeys = Object.keys(typography);
      
      typographyKeys.forEach(key => {
        const variant = typography[key as keyof typeof typography];
        expect(variant).toHaveProperty('fontSize');
        expect(variant).toHaveProperty('fontWeight');
        expect(variant).toHaveProperty('lineHeight');
        expect(typeof variant.fontSize).toBe('string');
        expect(typeof variant.fontWeight).toBe('number');
        expect(typeof variant.lineHeight).toBe('string');
      });
    });

    it('should have all required typography variants', () => {
      const expectedVariants = [
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
        'label2Regular'
      ];

      expectedVariants.forEach(variant => {
        expect(typography).toHaveProperty(variant);
      });
    });
  });
}); 