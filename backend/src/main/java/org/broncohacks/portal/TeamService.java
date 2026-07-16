package org.broncohacks.portal;

public interface TeamService {
    TeamResponse listTeams();
    TeamResponse createTeam(CreateTeamRequest request);
    TeamResponse joinTeam(JoinTeamRequest request);
    TeamResponse leaveTeam(LeaveTeamRequest request);
}
