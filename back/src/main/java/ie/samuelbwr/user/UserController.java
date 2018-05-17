package ie.samuelbwr.user;

import ie.samuelbwr.security.AuthenticatedUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/api/user" )
public class UserController {

    @GetMapping
    public User getAuthenticatedUser( @AuthenticatedUser User user ){
        return user;
    }
}
