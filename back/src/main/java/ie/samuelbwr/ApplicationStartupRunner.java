package ie.samuelbwr;

import ie.samuelbwr.user.User;
import ie.samuelbwr.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartupRunner implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run( ApplicationArguments args ) throws Exception {
        createStartupEntitiesOnDatabase();
    }

    private void createStartupEntitiesOnDatabase() {
        User startupUser = createStartupUser();
        userRepository.save( startupUser );
    }

    private User createStartupUser() {
        User user = new User();
        user.setPassword( "admin" );
        user.setUsername( "admin" );

        return user;
    }
}
