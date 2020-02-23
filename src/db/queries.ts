export const GET_USER_BY_EMAIL = "SELECT * FROM v_user_by_email WHERE email = ?";
export const GET_USER_SKILLS = "SELECT * FROM v_user_skills WHERE idUsers = ?";
export const SAVE_USER = "CALL sp_save_user(?,?,?,?,?,?,?);";
