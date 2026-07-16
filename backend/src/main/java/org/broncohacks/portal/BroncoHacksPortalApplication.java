package org.broncohacks.portal;

import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
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
    public static ArrayList<Team> databaseTeams = new ArrayList<Team>();
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

        private final TeamService teamService;

        public HomeController(TeamService teamService){this.teamService = teamService;}

        @GetMapping
        public ResponseEntity<TeamResponse> listTeams() {
            TeamResponse response = teamService.listTeams();
            return ResponseEntity.ok(response);
        }

        @PostMapping
        public ResponseEntity<TeamResponse> createTeam(@Valid @RequestBody CreateTeamRequest request) {
            TeamResponse response = teamService.createTeam(request);

            if(response.isSuccessful()) {
                return ResponseEntity.ok(response);
            }
            else{
                return ResponseEntity.badRequest().body(response);
            }
        }

        //Join request body consists of inviteCode and newMemberName (both strings)
        @PostMapping("/join")
        public ResponseEntity<TeamResponse> joinTeam(@Valid @RequestBody JoinTeamRequest request) {

                TeamResponse response = teamService.joinTeam(request);
                if(response.isSuccessful()) {
                    return ResponseEntity.ok(response);
                }
                else{
                    return ResponseEntity.badRequest().body(response);
                }
        }

        @PostMapping("/leave")
        public ResponseEntity<TeamResponse> leaveTeam(@Valid @RequestBody LeaveTeamRequest request) {
            TeamResponse response = teamService.leaveTeam(request);
            if(response.isSuccessful()) {
                return ResponseEntity.ok(response);
            }
            else{
                return ResponseEntity.badRequest().body(response);
            }
        }
    }

        
}