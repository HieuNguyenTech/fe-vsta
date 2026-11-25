export type Role = {
  id: string;
  name: string;
  slug: string;
  permissions: string[];
  isSystem: boolean;
};

export type CreateRolePayload = Pick<Role, 'name' | 'slug' | 'permissions'>;

/** The slug cannot change after a role is created. */
export type UpdateRolePayload = Pick<Role, 'name' | 'permissions'>;
