import theme from '../../src/theme';

describe('Theme', () => {
  it('should have all required color tokens', () => {
    expect(theme.COLORS).toHaveProperty('BACKGROUND');
    expect(theme.COLORS).toHaveProperty('PRIMARY_900');
    expect(theme.COLORS).toHaveProperty('PRIMARY_800');
    expect(theme.COLORS).toHaveProperty('PRIMARY_100');
    expect(theme.COLORS).toHaveProperty('PRIMARY_50');
    expect(theme.COLORS).toHaveProperty('SECONDARY_900');
    expect(theme.COLORS).toHaveProperty('SECONDARY_500');
    expect(theme.COLORS).toHaveProperty('SECONDARY_400');
    expect(theme.COLORS).toHaveProperty('SUCCESS_900');
    expect(theme.COLORS).toHaveProperty('SUCCESS_50');
    expect(theme.COLORS).toHaveProperty('ALERT_900');
    expect(theme.COLORS).toHaveProperty('ALERT_800');
    expect(theme.COLORS).toHaveProperty('ALERT_50');
    expect(theme.COLORS).toHaveProperty('SHAPE');
    expect(theme.COLORS).toHaveProperty('TITLE');
    expect(theme.COLORS).toHaveProperty('GRADIENT');
  });

  it('should have all required font tokens', () => {
    expect(theme.FONTS).toHaveProperty('TITLE');
    expect(theme.FONTS).toHaveProperty('TEXT');
  });

  it('should have valid color hex values', () => {
    const hexRegex = /^#[0-9A-Fa-f]{3,8}$/;

    Object.entries(theme.COLORS).forEach(([key, value]) => {
      if (key === 'GRADIENT') {
        expect(Array.isArray(value)).toBe(true);
        (value as readonly string[]).forEach((color) => {
          expect(color).toMatch(hexRegex);
        });
      } else {
        expect(value).toMatch(hexRegex);
      }
    });
  });

  it('should have GRADIENT with exactly 2 colors', () => {
    expect(theme.COLORS.GRADIENT).toHaveLength(2);
  });

  it('should have valid font family names', () => {
    expect(theme.FONTS.TITLE).toBe('DMSerifDisplay_400Regular');
    expect(theme.FONTS.TEXT).toBe('DMSans_400Regular');
  });
});
