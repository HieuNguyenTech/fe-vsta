export type User = {
  id: string;
  email: string;
  name: string;
  roleIds: string[];
  disabled: boolean;
};

/** The backend list only accepts paging. */
export type UserFilters = {
  page: number;
  limit: number;
};

export type CreateUserPayload = {
  email: string;
  name: string;
  password: string;
  roleIds: string[];
};

export type UpdateUserPayload = {
  name?: string;
  password?: string;
  disabled?: boolean;
};

/** Only the parts that changed. Details and roles are separate backend calls. */
export type UserChanges = {
  details?: UpdateUserPayload;
  roleIds?: string[];
};
