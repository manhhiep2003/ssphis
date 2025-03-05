export const USERS_MESSAGES = {
  VALIDATION_ERROR: "Validation error", //để k ai chỉnh đc
  CREATE_SUCCESS: "User created successfully.",
  CREATE_FAILURE: "Error creating user.",
  LOGIN_SUCCESS: "Login successful.",
  LOGIN_FAILURE: "Invalid username or password.",
  MISSING_FIELDS: "All fields are required.",
  MISSING_CREDENTIALS: "Username and password are required.",
  RETRIEVE_SUCCESS: "Users retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve users",
  ROLE_CODE_REQUIRED: "Role code is required",
  NO_USERS_FOUND: "No users found for this role",
  UPDATE_SUCCESS: "User profile updated successfully",
  UPDATE_FAILURE: "Failed to update user profile",
  RETRIEVE_SINGLE_SUCCESS: "User retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve user",
  NOT_FOUND: "User not found",
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
  RETRIEVE_SUCCESS: "Lấy danh sách cuộc hẹn thành công",
  RETRIEVE_FAILURE: "Lấy danh sách cuộc hẹn thất bại",
  CREATE_SUCCESS: "Tạo cuộc hẹn thành công",
  CREATE_FAILURE: "Tạo cuộc hẹn thất bại",
  UPDATE_SUCCESS: "Cập nhật cuộc hẹn thành công",
  UPDATE_FAILURE: "Cập nhật cuộc hẹn thất bại",
  DELETE_SUCCESS: "Xóa cuộc hẹn thành công",
  DELETE_FAILURE: "Xóa cuộc hẹn thất bại",
  RETRIEVE_SINGLE_SUCCESS: "Lấy thông tin cuộc hẹn thành công",
  RETRIEVE_SINGLE_FAILURE: "Lấy thông tin cuộc hẹn thất bại",
  NOT_FOUND: "Không tìm thấy cuộc hẹn",
  VALIDATION: {
    EMPTY_APPOINTMENTS: "Danh sách cuộc hẹn không được để trống",
    REQUIRED_FIELDS: "user_id, time_slot_id và ngày hẹn là bắt buộc",
    PAST_DATE: "Không thể đặt lịch hẹn cho ngày trong quá khứ",
    TIME_SLOT_NOT_FOUND: "Không tìm thấy khung giờ với id {id}",
    TIME_SLOT_BOOKED:
      "Khung giờ từ {startTime} đến {endTime} đã có lịch hẹn {status} cho ngày {date}",
  },
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

export const SURVEY_MESSAGES = {
  RETRIEVE_SUCCESS: "Surveys retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve Surveys",
  RETRIEVE_SINGLE_SUCCESS: "Survey retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Survey",
  NOT_FOUND: "Survey not found",
  CREATE_SUCCESS: "Survey created successfully",
  CREATE_FAILURE: "Failed to create Survey",
  UPDATE_SUCCESS: "Survey updated successfully",
  UPDATE_FAILURE: "Failed to update Survey",
  DELETE_SUCCESS: "Survey deleted successfully",
  DELETE_FAILURE: "Failed to delete Survey",
} as const;

export const PROGRAM_MESSAGES = {
  RETRIEVE_SUCCESS: "Programs retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve Programs",
  RETRIEVE_SINGLE_SUCCESS: "Program retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Program",
  NOT_FOUND: "Program not found",
  CREATE_SUCCESS: "Program created successfully",
  CREATE_FAILURE: "Failed to create Program",
  UPDATE_SUCCESS: "Program updated successfully",
  UPDATE_FAILURE: "Failed to update Program",
  DELETE_SUCCESS: "Program deleted successfully",
  DELETE_FAILURE: "Failed to delete Program",
} as const;

export const QUESTION_MESSAGES = {
  RETRIEVE_SUCCESS: "Questions retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve Questions",
  RETRIEVE_SINGLE_SUCCESS: "Question retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Question",
  NOT_FOUND: "Question not found",
  CREATE_SUCCESS: "Question created successfully",
  CREATE_FAILURE: "Failed to create Question",
  UPDATE_SUCCESS: "Question updated successfully",
  UPDATE_FAILURE: "Failed to update Question",
  DELETE_SUCCESS: "Question deleted successfully",
  DELETE_FAILURE: "Failed to delete Question",
} as const;

export const QUESTION_OPTION_MESSAGES = {
  RETRIEVE_SUCCESS: "Question options retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve Question options",
  RETRIEVE_SINGLE_SUCCESS: "Question option retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Question option",
  NOT_FOUND: "Question option not found",
  CREATE_SUCCESS: "Question option created successfully",
  CREATE_FAILURE: "Failed to create Question option",
  UPDATE_SUCCESS: "Question option updated successfully",
  UPDATE_FAILURE: "Failed to update Question option",
  DELETE_SUCCESS: "Question option deleted successfully",
  DELETE_FAILURE: "Failed to delete Question option",
} as const;

export const SURVEY_RESULT_MESSAGES = {
  RETRIEVE_SUCCESS: "Survey results retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve Survey results",
  RETRIEVE_SINGLE_SUCCESS: "Survey result retrieved successfully",
  RETRIEVE_SINGLE_FAILURE: "Failed to retrieve Survey result",
  NOT_FOUND: "Survey result not found",
  CREATE_SUCCESS: "Survey result created successfully",
  CREATE_FAILURE: "Failed to create Survey result",
  UPDATE_SUCCESS: "Survey result updated successfully",
  UPDATE_FAILURE: "Failed to update Survey result",
  DELETE_SUCCESS: "Survey result deleted successfully",
  DELETE_FAILURE: "Failed to delete Survey result",
} as const;

export const REPORT_MESSAGES = {
  CREATE_SUCCESS: "Report created successfully",
  CREATE_FAILURE: "Failed to create report",
  RETRIEVE_SUCCESS: "Report retrieved successfully",
  RETRIEVE_FAILURE: "Failed to retrieve report",
  NOT_FOUND: "Report not found",
  ALREADY_EXISTS: "Report already exists for this appointment"
} as const;
