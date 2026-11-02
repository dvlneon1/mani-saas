import tokens from '../tokens.json';

export const colors = tokens.colors;
export const typography = tokens.typography;
export const spacing = tokens.spacing;
export const borderRadius = tokens.borderRadius;
export const shadows = tokens.shadows;

export type ColorToken = keyof typeof colors.light;
export type TypographyToken = keyof typeof typography;
export type SpacingToken = keyof typeof spacing;
export type BorderRadiusToken = keyof typeof borderRadius;
export type ShadowToken = keyof typeof shadows;

export default tokens;
