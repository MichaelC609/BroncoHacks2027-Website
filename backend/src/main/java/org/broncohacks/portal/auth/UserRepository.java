package org.broncohacks.portal.auth;

import org.broncohacks.portal.BroncoHacksPortalApplication;
import org.broncohacks.portal.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository {

    public Optional<User> findByUsername(String username) {
        return BroncoHacksPortalApplication.databaseUsers.stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst();
    }

    public void create(User user) {
        BroncoHacksPortalApplication.databaseUsers.add(user);
    }
}