package org.broncohacks.portal;

import jakarta.validation.constraints.NotBlank;

public class CreateTeamRequest {
    @NotBlank(message = "Team name cannot be blank")
    private String teamName;

    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }
}
