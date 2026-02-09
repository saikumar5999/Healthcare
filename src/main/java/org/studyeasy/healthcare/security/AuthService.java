package org.studyeasy.healthcare.security;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    private final Map<String, UserAccount> users = new HashMap<>();

    public AuthService() {
        users.put("office@careflow.com",
                new UserAccount("office@careflow.com", "office123", "Office Admin", "OFFICE"));
        users.put("customer@careflow.com",
                new UserAccount("customer@careflow.com", "customer123", "Customer User", "CUSTOMER"));
    }

    public Optional<UserAccount> authenticate(String email, String password) {
        UserAccount user = users.get(email);
        if (user == null) {
            return Optional.empty();
        }
        if (!user.getPassword().equals(password)) {
            return Optional.empty();
        }
        return Optional.of(user);
    }
}
