package org.broncohacks.portal;

import org.broncohacks.portal.auth.UserRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class TeamRepositoryImpl implements TeamRepository {

    @Override
    public List<Team> findAll() {
        return BroncoHacksPortalApplication.databaseTeams;
    }

    @Override
    public Optional<Team> findByInviteCode(String inviteCode) {
        return BroncoHacksPortalApplication.databaseTeams.stream()
                .filter(t -> t.getInviteCode().equals(inviteCode))
                .findFirst();
    }

    @Override
    public Optional<Team> findByName(String teamName) {
        return BroncoHacksPortalApplication.databaseTeams.stream()
                .filter(t -> t.getTeamName().equals(teamName))
                .findFirst();
    }

    @Override
    public void save(Team team) {
        BroncoHacksPortalApplication.databaseTeams.add(team);
    }
}