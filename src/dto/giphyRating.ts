export const GiphyRating = {
  G: 'g',
  PG: 'pg',
  PG13: 'pg-13',
  R: 'r',
  Unrated: 'unrated',
  Y: 'y',
} as const

export type GiphyRating = (typeof GiphyRating)[keyof typeof GiphyRating]
