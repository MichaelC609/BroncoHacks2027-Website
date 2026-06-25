package org.broncohacks.portal.auth.test;

import org.broncohacks.portal.auth.PasswordPolicies;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PasswordPoliciesTest {

    @Test
    void rejectsPasswordShorterThanEightCharacters() {
        String result = PasswordPolicies.validate("Ab1!");
        assertEquals("Password must be at least 8 characters", result);
    }

    @Test
    void rejectsPasswordWithoutUppercase() {
        String result = PasswordPolicies.validate("abcdefg1!");
        assertEquals("Password must contain at least one uppercase letter", result);
    }

    @Test
    void rejectsPasswordWithoutNumber() {
        String result = PasswordPolicies.validate("Abcdefgh!");
        assertEquals("Password must contain at least one number", result);
    }

    @Test
    void acceptsValidPassword() {
        String result = PasswordPolicies.validate("Abcdefg1!");
        assertNull(result);
    }
}