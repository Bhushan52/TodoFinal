package ie.samuelbwr.todolist;

import ie.samuelbwr.user.User;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
public class TodoList {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    @OneToOne
    private User owner;

    private ZonedDateTime creationDate;
}
