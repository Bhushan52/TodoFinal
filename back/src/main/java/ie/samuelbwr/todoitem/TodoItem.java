package ie.samuelbwr.todoitem;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ie.samuelbwr.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Getter
public class TodoItem {

    @Id
    @GeneratedValue
    private Long id;

    @Setter
    private String text;

    @Setter
    private Boolean completed = false;

    @Setter
    private ZonedDateTime lastUpdate = Instant.now().atZone( ZoneId.systemDefault() );

    private ZonedDateTime creationDate = Instant.now().atZone( ZoneId.systemDefault() );

    @ManyToOne
    @Setter
    @JsonIgnore
    private User user;
}
