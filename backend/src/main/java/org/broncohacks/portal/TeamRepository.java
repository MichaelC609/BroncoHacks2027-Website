package org.broncohacks.portal;

import java.util.List;
import java.util.Optional;

public interface TeamRepository {
    List<Team> findAll();
    Optional<Team> findByInviteCode(String inviteCode);
    Optional<Team> findByName(String teamName);
    void save(Team team);
}