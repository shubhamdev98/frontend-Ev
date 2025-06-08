const baseUrl = "/api/v1";
export const API_URL = {
  REGISTER: `${baseUrl}/signup`,
  LOGIN: `${baseUrl}/login`,
  VERIFY_OTP: `${baseUrl}/verify-otp`,
  FORGOT_PASSWORD: `${baseUrl}/password-reset/otp/resend`,
  PASSWORD_RESET: `${baseUrl}/password-reset`,
};
