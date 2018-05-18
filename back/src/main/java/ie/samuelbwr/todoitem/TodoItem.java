package ie.samuelbwr.todoitem;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ie.samuelbwr.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
public class TodoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private Boolean completed = false;

    private ZonedDateTime lastUpdate;

    @ManyToOne( fetch = FetchType.LAZY )
    @JsonIgnore
    @JoinColumn(updatable = false)
    private User user;

    @PreUpdate
    @PrePersist
    public void preUpdate() {
        lastUpdate = Instant.now().atZone( ZoneId.systemDefault() );
    }
}
