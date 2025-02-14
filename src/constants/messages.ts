export const USERS_MESSAGES = {
  VALIDATION_ERROR: "Validation error", //để k ai chỉnh đc
  CREATE_SUCCESS: "User created successfully.",
  CREATE_FAILURE: "Error creating user.",
  LOGIN_SUCCESS: "Login successful.",
  LOGIN_FAILURE: "Invalid username or password.",
  MISSING_FIELDS: "All fields are required.",
  MISSING_CREDENTIALS: "Username and password are required.",
} as const;

export const ROLES_MESSAGES = {
  RETRIEVE_SUCCESS: "Roles retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve roles",
  RETRIEVE_SINGLE_SUCCESS: "Role retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve role",
  NOT_FOUND: "Role not found",
  CREATE_SUCCESS: "Role created successfully",
  CREATE_FAILURE: "Failed to create role",
  UPDATE_SUCCESS: "Role updated successfully",
  UPDATE_FAILURE: "Failed to update role",
  DELETE_SUCCESS: "Role deleted successfully",
  DELETE_FAILURE: "Failed to delete role",
} as const;

export const JWT_MESSAGES = {
  NO_TOKEN_PROVIDED: "No token provided",
  INVALID_TOKEN_FORMAT: "Invalid token format",
  FAILED_TO_AUTHENTICATE_TOKEN: "Failed to authenticate token",
} as const;
export const TIMESLOT_MESSAGES = {
  RETRIEVE_SUCCESS: "Time slots retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve time slots",
  CREATE_SUCCESS: "Time slot created successfully",
  CREATE_FAILURE: "Failed to create time slot",
  UPDATE_SUCCESS: "Time slot updated successfully",
  UPDATE_FAILURE: "Failed to update time slot",
  DELETE_SUCCESS: "Time slot deleted successfully",
  DELETE_FAILURE: "Failed to delete time slot",
  RETRIEVE_SINGLE_SUCCESS: "Time Slot retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Time Slot",
  NOT_FOUND: "Time Slot not found",
} as const;
export const APPOINTMENTS_MESSAGES = {
  RETRIEVE_SUCCESS: "Time slots retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve time slots",
  CREATE_SUCCESS: "Time slot created successfully",
  CREATE_FAILURE: "Failed to create time slot",
  UPDATE_SUCCESS: "Time slot updated successfully",
  UPDATE_FAILURE: "Failed to update time slot",
  DELETE_SUCCESS: "Time slot deleted successfully",
  DELETE_FAILURE: "Failed to delete time slot",
  RETRIEVE_SINGLE_SUCCESS: "Time Slot retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Time Slot",
  NOT_FOUND: "Time Slot not found",
} as const;

export const MARKDOWN_MESSAGES = {
  RETRIEVE_SUCCESS: "Markdowns retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve markdowns",
  RETRIEVE_SINGLE_SUCCESS: "Markdown retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve markdown",
  NOT_FOUND: "Markdown not found",
  CREATE_SUCCESS: "Markdown created successfully",
  CREATE_FAILURE: "Failed to create markdown",
  UPDATE_SUCCESS: "Markdown updated successfully",
  UPDATE_FAILURE: "Failed to update markdown",
  DELETE_SUCCESS: "Markdown deleted successfully",
  DELETE_FAILURE: "Failed to delete markdown",
} as const;

export const CATEGORY_MESSAGES = {
  RETRIEVE_SUCCESS: "Categories retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve Categories",
  RETRIEVE_SINGLE_SUCCESS: "Category retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Category",
  NOT_FOUND: "Category not found",
  CREATE_SUCCESS: "Category created successfully",
  CREATE_FAILURE: "Failed to create Category",
  UPDATE_SUCCESS: "Category updated successfully",
  UPDATE_FAILURE: "Failed to update Category",
  DELETE_SUCCESS: "Category deleted successfully",
  DELETE_FAILURE: "Failed to delete Category",
} as const;