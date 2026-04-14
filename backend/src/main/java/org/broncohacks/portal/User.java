package org.broncohacks.portal;

import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

public class User {
    User(String t_username, String t_pwHash, String t_email){
    username = t_username;
    pwHash = t_pwHash;
    email = t_email;
    }

    private String username;
    private String pwHash;
    private String email;

    public String getUsername() {
        return username;
    }

    public String getPwHash() {
        return pwHash;
    }

    public String getEmail() {
        return email;
    }


}
