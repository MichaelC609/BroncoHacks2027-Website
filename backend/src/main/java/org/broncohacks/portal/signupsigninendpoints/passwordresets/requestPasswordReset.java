package org.broncohacks.portal.signupsigninendpoints.passwordresets;

import org.broncohacks.portal.signupsigninendpoints.SignInRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class requestPasswordReset {



    @PostMapping("/requestpassreset")
    public String passwordReset(@RequestBody SignInRequest request){

        //Validating if new password is strong
        //NOTE: Yes there a lot of branches. Will check and see if I can make this cleaner later

        if(request.getNewPassword() == null || request.getNewPassword().length() < 8){

            return "Password must be at least 8 characters long";
        }
        else if (!request.getNewPassword().matches(".*[A-Z].*")) {

            return "Password must contain at least 1 capital letter";
        }
        else if (!request.getNewPassword().matches(".*[a-z].*")){

            return "Password must contain at least 1 lowercase letter";
        }
        else if (!request.getNewPassword().matches(".*[0-9].*")){

            return "Password must contains at least 1 number";
        }
        else if (!request.getNewPassword().matches(".*[^a-zA-Z0-9].*")){
            return "Password must contain at least 1 special character";
        }

        //Returns only if all prior branches are skipped
        return "Password is strong";
    }


}
