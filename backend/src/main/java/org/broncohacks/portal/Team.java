package org.broncohacks.portal;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Team {
    Team(String t_teamName){
        teamName = t_teamName;
        teamID = idCounter;
        idCounter++;
    }

    static private int MAX_TEAM_SIZE = 4;
    private static int idCounter;

    private User captain;
    private ArrayList<User> members = new ArrayList<User>();
    private String teamName;
    private int teamID;


    public User getCaptain() {
        return captain;
    }

    public ArrayList<User> getMembers() {
        return members;
    }

    public String getTeamName() {
        return teamName;
    }

    public int getTeamID() {
        return teamID;
    }

    public int size(){
        return members.size();
    }

    // returns true if member is added successfully, false otherwise
    public boolean addMember(User newMember){
        if(members.size() < MAX_TEAM_SIZE){
            members.add(newMember);
            return true;
        }
        else{
            return false;
        }
    }

}
