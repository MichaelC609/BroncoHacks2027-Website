package org.broncohacks.portal.auth;

import org.broncohacks.portal.User;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public AuthResponse signUp(SignUpRequest request) {
        // check username isn't taken, hash request.getPassword(),
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            return new AuthResponse(false, "Username already taken", null);
        }
        String passwordValidation = PasswordPolicies.validate(request.getPassword());
        if(passwordValidation != null){
            return new AuthResponse(false, passwordValidation, null);
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // save a new User, return a success/failure AuthResponse
        User newUser = new User(request.getUsername(), hashedPassword, request.getEmail());
        userRepository.create(newUser);
        return new AuthResponse(true, "Account created successfully", null);
    }

    @Override
    public AuthResponse signIn(SignInRequest request) {
        Optional<User> user = userRepository.findByUsername(request.getUsername());
        // If user is empty, reject.
        if (user.isEmpty()){
            return new AuthResponse(false, "Username Empty", null);
        }
        //Success!
        if(passwordEncoder.matches(request.getPassword(), user.get().getPwHash())){
            return new AuthResponse(true, "Signed in successfully", null);
        }
        //If password doesn't match user's hashedPW, reject.
        return new AuthResponse(false, "Username or password incorrect", null);

    }


}
