package org.broncohacks.portal;

import jakarta.validation.constraints.NotBlank;

public class JoinTeamRequest {
    @NotBlank
    private String inviteCode;
    @NotBlank
    private String newMemberName;

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public void setNewMemberName(String newMemberName) {
        this.newMemberName = newMemberName;
    }



    public String getInviteCode() {
        return inviteCode;
    }

    public String getNewMemberName() {
        return newMemberName;
    }


}
