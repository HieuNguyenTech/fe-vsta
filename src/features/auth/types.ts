/** Shape returned by the backend's `GET /auth/me`. */
export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  isSuperAdmin: boolean;
  permissions: string[];
};
