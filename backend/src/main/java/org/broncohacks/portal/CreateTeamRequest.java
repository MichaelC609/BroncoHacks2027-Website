package org.broncohacks.portal;

import jakarta.validation.constraints.NotBlank;

public class CreateTeamRequest {

    public CreateTeamRequest(boolean successful, String message, String teamName) {
        this.successful = successful;
        this.message = message;
        this.teamName = teamName;
    }

    private boolean successful;
    private String message;
    @NotBlank(message = "Team name cannot be blank")
    private String teamName;

    public boolean isSuccessful() {
        return successful;
    }

    public String getMessage() {
        return message;
    }

    public String getTeamName() {
        return teamName;
    }
}
