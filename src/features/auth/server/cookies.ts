// Server only: where the tokens are kept. httpOnly, so page scripts cannot read them.
export const ACCESS_COOKIE = 'cms_access';
export const REFRESH_COOKIE = 'cms_refresh';

/** Matches the backend's default REFRESH_TOKEN_TTL. */
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60;
/** The access cookie expires a little early, so it is renewed before the token is rejected. */
const EXPIRY_MARGIN = 30;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  /** Access token lifetime in seconds. */
  expiresIn: number;
};

const baseOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/'
} as const;

export function tokenCookies({ accessToken, refreshToken, expiresIn }: Tokens) {
  return [
    {
      ...baseOptions,
      name: ACCESS_COOKIE,
      value: accessToken,
      maxAge: Math.max(expiresIn - EXPIRY_MARGIN, 1)
    },
    { ...baseOptions, name: REFRESH_COOKIE, value: refreshToken, maxAge: REFRESH_MAX_AGE }
  ];
}
