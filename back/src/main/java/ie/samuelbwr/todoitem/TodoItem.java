package ie.samuelbwr.todoitem;

import ie.samuelbwr.todolist.TodoList;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
public class TodoItem {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    private String text;

    private Boolean done;

    private ZonedDateTime lastUpdate;

    private ZonedDateTime creationDate;

    @ManyToOne
    private TodoList todoList;
}
