package org.broncohacks.portal;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    //makes sure that the user's password hash does NOT get revealed in the JSON sent to frontend :skull:
    @JsonIgnore
    public String getPwHash() {
        return pwHash;
    }

    public String getEmail() {
        return email;
    }


}
