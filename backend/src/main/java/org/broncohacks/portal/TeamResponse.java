package org.broncohacks.portal;

import java.util.List;

public class TeamResponse {

    public TeamResponse(boolean successful, String message, List<Team> t_data) {
        this.successful = successful;
        this.message = message;
        this.data = t_data;
    }

    private boolean successful;
    private String message;
    private List<Team> data;

    public boolean isSuccessful() {
        return successful;
    }

    public String getMessage() {
        return message;
    }

    public List<Team> getData() {
        return data;
    }
}
