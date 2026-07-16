package org.broncohacks.portal.auth;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class SignInController {

    private final AuthService authService;

    public SignInController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@Valid @RequestBody SignInRequest request){
        AuthResponse response = authService.signIn(request);
        return ResponseEntity.ok(response);
    }
}
