package org.broncohacks.portal.signupsigninendpoints;

public class SignInRequest {
    private String email;
    private String password;
    private String newPassword;

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    //DTO portion for requestPasswordReset
    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

}
