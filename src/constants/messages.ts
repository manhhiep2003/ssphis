export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error', //để k ai chỉnh đc
  CREATE_SUCCESS: 'User created successfully.',
  CREATE_FAILURE: 'Error creating user.',
  LOGIN_SUCCESS: 'Login successful.',
  LOGIN_FAILURE: 'Invalid username or password.',
  MISSING_FIELDS: 'All fields are required.',
  MISSING_CREDENTIALS: 'Username and password are required.'
} as const;

export const ROLES_MESSAGES = {
  RETRIEVE_SUCCESS: 'Roles retrieved successfully',
  RETRIEVE_FAILURE: 'Failed to retrieve roles',
  RETRIEVE_SINGLE_SUCCESS: 'Role retrieved successfully',
  RETRIEVE_SINGLE_FAILURE: 'Failed to retrieve role',
  NOT_FOUND: 'Role not found',
  CREATE_SUCCESS: 'Role created successfully',
  CREATE_FAILURE: 'Failed to create role',
  UPDATE_SUCCESS: 'Role updated successfully',
  UPDATE_FAILURE: 'Failed to update role',
  DELETE_SUCCESS: 'Role deleted successfully',
  DELETE_FAILURE: 'Failed to delete role',
} as const;

export const JWT_MESSAGES = {
  NO_TOKEN_PROVIDED: 'No token provided',
  INVALID_TOKEN_FORMAT: 'Invalid token format',
  FAILED_TO_AUTHENTICATE_TOKEN: 'Failed to authenticate token',
} as const;