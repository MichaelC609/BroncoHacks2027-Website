package org.broncohacks.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@SpringBootApplication
public class BroncoHacksPortalApplication {
  // Some placeholder database structure. Replace with PostgreSQL when necessary.
  static ArrayList<User> databaseUsers = new ArrayList<User>();
  static ArrayList<Team> databaseTeams = new ArrayList<Team>();
  static User testUser = new User("testUser", "abc", "test@gmail.com");
  static Team testTeam = new Team("testTeam");

  public static void main(String[] args) {
    databaseUsers.add(testUser);
    SpringApplication.run(BroncoHacksPortalApplication.class, args);
  }

  @RestController
  @RequestMapping("/api/teams")
  public class HomeController {
    ArrayList<Team> teamList = new ArrayList<>();
    int idCounter = 0;

    @GetMapping
    public ResponseEntity<ArrayList<Team>> listTeams() {
      return ResponseEntity.ok(databaseTeams);
    }

    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody String newTeamName) {
      for (Team team : databaseTeams) {
        if (team.getTeamName().equals(newTeamName)) {
          return ResponseEntity.badRequest().body("Team name already in use.");
        }
      }

      Team newTeam = new Team(newTeamName);
      databaseTeams.add(newTeam);
      return ResponseEntity.ok(databaseTeams.get(databaseTeams.size() - 1));
    }

    // The team to be joined's ID is stored in the URL and inserted as a parameter
    // using @PathVariable
    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinTeam(@PathVariable("id") int joinedTeamID, @RequestBody String newMemberName) {
      Team teamToJoin = null;
      User userToJoin = null;
      for (Team team : databaseTeams) {
        if (team.getTeamID() == joinedTeamID) {
          teamToJoin = team;
        }
      }

      for (User user : databaseUsers) {
        if (user.getUsername().equals(newMemberName)) {
          userToJoin = user;
        }
      }

      if (teamToJoin == null || userToJoin == null) {
        System.out.println(teamToJoin);
        System.out.println(userToJoin);
        return ResponseEntity.notFound().build();
      }

      if (teamToJoin.addMember(userToJoin)) {
        return ResponseEntity.ok(teamToJoin);
      } else {
        return ResponseEntity.badRequest().body("The requested team is full.");
      }

    }

  }

}
