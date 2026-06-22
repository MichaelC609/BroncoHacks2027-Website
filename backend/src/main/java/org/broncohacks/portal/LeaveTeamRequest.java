package org.broncohacks.portal;

import jakarta.validation.constraints.NotBlank;

public class LeaveTeamRequest {
    @NotBlank
    private String teamName;
    @NotBlank
    private String userName;
    
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }



    public String getUserName() {
        return userName;
    }

    public String getTeamName() {
        return teamName;
    }


}
