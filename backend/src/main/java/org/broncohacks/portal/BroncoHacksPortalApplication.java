package org.broncohacks.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


// TODO:
// Implement DTOs for standardized JSON response for team requests 
//
@SpringBootApplication
public class BroncoHacksPortalApplication {
    //Some placeholder database structure. Replace with PostgreSQL when necessary.
    public static ArrayList<User> databaseUsers = new ArrayList<User>();
    static ArrayList<Team> databaseTeams = new ArrayList<Team>();
    static User testUser = new User("testUser", "abc", "test@gmail.com");
    static Team testTeam = new Team("testTeam");

    public static void main(String[] args) {
        //adds testUser to the database
        databaseUsers.add(testUser);
        ApplicationContext context = SpringApplication.run(BroncoHacksPortalApplication.class, args);
    }

    @RestController
    @RequestMapping("/api/teams")
    public class HomeController {


        @GetMapping
        public ResponseEntity<TeamResponse> listTeams() {

            boolean successful = true;
            String message = "Teams listed successfully";
            List<Team> teamList = databaseTeams;
            TeamResponse response = new TeamResponse(successful, message, teamList);
            return ResponseEntity.ok(response);
        }

        @PostMapping
        public ResponseEntity<TeamResponse> createTeam(@RequestBody String newTeamName) {

            if (newTeamName.isBlank()) {
                TeamResponse error = new TeamResponse(false, "Team name cannot be blank", null);
                return ResponseEntity.badRequest().body(error);
            }

            for (Team team : databaseTeams) {
                if (team.getTeamName().equals(newTeamName)) {
                    TeamResponse error = new TeamResponse(false, "Team name already in use", null);
                    return ResponseEntity.badRequest().body(error);
                }
            }

            Team newTeam = new Team(newTeamName);
            databaseTeams.add(newTeam);
            List<Team> responseData = List.of(newTeam);
            TeamResponse response = new TeamResponse(true, "New team created successfully", responseData);
            return ResponseEntity.ok(response);
        }

        //Join request body consists of inviteCode and newMemberName (both strings)
        @PostMapping("/join")
        public ResponseEntity<TeamResponse> joinTeam(@RequestBody JoinTeamRequest request) {
            Team teamToJoin = null;
            User userToJoin = null;

            //Search teams
            for (Team team : databaseTeams) {
                if (team.getInviteCode().equals(request.getInviteCode())) {
                    teamToJoin = team;
                    break;
                }
            }

            //Search users
            for (User user : databaseUsers) {
                if (user.getUsername().equals(request.getNewMemberName())) {
                    userToJoin = user;
                    break;
                }
            }

            //Invalid invite code
            if (teamToJoin == null) {
                TeamResponse error = new TeamResponse(false, "Invalid invite code", null);
                return ResponseEntity.badRequest().body(error);
            }
            //User doesn't exist
            if (userToJoin == null) {
                TeamResponse error = new TeamResponse(false, "User specified does not exist.", null);
                return ResponseEntity.badRequest().body(error);
            }

            //Successful!
            if (teamToJoin.addMember(userToJoin)) {
                TeamResponse response = new TeamResponse(true, "User added to team successfully", List.of(teamToJoin));
                return ResponseEntity.ok(response);
            }
            //Team is full
            else {
                TeamResponse error = new TeamResponse(false, "The requested team is full.", null);
                return ResponseEntity.badRequest().body(error);
            }
        }

        @PostMapping("/leave")
        public ResponseEntity<TeamResponse> leaveTeam(@RequestBody LeaveTeamRequest request) {
            Team teamToLeave = null;
            User userToLeave = null;

            for (Team team : databaseTeams) {
                if (team.getTeamName().equals(request.getTeamName())) {
                    teamToLeave = team;
                    break;
                }
            }

            for (User user : databaseUsers) {
                if (user.getUsername().equals(request.getUserName())) {
                    userToLeave = user;
                    break;
                }
            }

            if (teamToLeave == null) {
                TeamResponse error = new TeamResponse(false, "Team not found", null);
                return ResponseEntity.badRequest().body(error);
            }
            if (userToLeave == null) {
                TeamResponse error = new TeamResponse(false, "User not found", null);
                return ResponseEntity.badRequest().body(error);
            }

            teamToLeave.removeMember(userToLeave.getUsername());
            List<Team> responseData = List.of(teamToLeave);
            TeamResponse response = new TeamResponse(true, "Left team successfully", responseData);
            return ResponseEntity.ok(response);
        }

        // The team to be joined's ID is stored in the URL and inserted as a parameter
        // using @PathVariable
        @PostMapping("/{id}/join")
        public ResponseEntity<TeamResponse> joinTeamById(@PathVariable("id") int joinedTeamID, @RequestBody String newMemberName) {
            Team teamToJoin = null;
            User userToJoin = null;
            for (Team team : databaseTeams) {
                if (team.getTeamID() == joinedTeamID) {
                    teamToJoin = team;
                    break;
                }
            }

            for (User user : databaseUsers) {
                if (user.getUsername().equals(newMemberName)) {
                    userToJoin = user;
                    break;
                }
            }

            if (teamToJoin == null) {
                TeamResponse error = new TeamResponse(false, "Team specified does not exist.", null);
                return ResponseEntity.badRequest().body(error);
            }

            if (userToJoin == null) {
                TeamResponse error = new TeamResponse(false, "User specified does not exist.", null);
                return ResponseEntity.badRequest().body(error);
            }

            if (teamToJoin.addMember(userToJoin)) {
                TeamResponse response = new TeamResponse(true, "User added to team successfully", List.of(teamToJoin));
                return ResponseEntity.ok(response);
            } else {
                TeamResponse error = new TeamResponse(false, "The requested team is full.", null);
                return ResponseEntity.badRequest().body(error);
            }
        }
    }

}
