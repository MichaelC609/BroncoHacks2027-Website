package org.broncohacks.portal.auth;

public class PasswordPolicies {

    //Returns an error message if password is invalid, null otherwise
    public static String validate(String password) {
        if (password.length() < 8) {
            return "Password must be at least 8 characters";
        }
        if (!password.matches(".*[A-Z].*")) {
            return "Password must contain at least one uppercase letter";
        }
        if (!password.matches(".*[0-9].*")) {
            return "Password must contain at least one number";
        }
        if (!password.matches(".*[!@#$%^&*].*")) {
            return "Password must contain at least one special character";
        }
        return null; // null means it passed
    }
}