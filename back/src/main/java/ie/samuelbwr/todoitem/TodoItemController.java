package ie.samuelbwr.todoitem;

import ie.samuelbwr.security.AuthenticatedUser;
import ie.samuelbwr.todoitem.exceptions.TodoItemAlreadyRegisteredException;
import ie.samuelbwr.todoitem.exceptions.TodoItemNotFoundException;
import ie.samuelbwr.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/api/todos" )
public class TodoItemController {

    @Autowired
    private TodoItemRepository repository;

    @GetMapping
    public List<TodoItem> getItems( @AuthenticatedUser User user ) {
        return repository.findAllByUser( user );
    }

    @PostMapping
    public TodoItem addItem( @AuthenticatedUser User user,
                             @RequestBody TodoItem todoItem ) {
        if ( todoItem.getId() != null )
            throw new TodoItemAlreadyRegisteredException();

        todoItem.setUser( user );
        return repository.save( todoItem );
    }

    @PutMapping( "{itemId}" )
    public TodoItem updateItem( @PathVariable( name = "itemId" ) Long itemId,
                                @AuthenticatedUser User user,
                                @RequestBody TodoItem todoItem ) {
        repository.existsByIdAndUser( itemId, user ).orElseThrow( TodoItemNotFoundException::new );
        todoItem.setId( itemId );
        return repository.save( todoItem );
    }

    @DeleteMapping( "{itemId}" )
    public void deleteItem( @AuthenticatedUser User user,
                            @PathVariable( name = "itemId" ) Long itemId ) {
        repository.deleteByIdAndUser( itemId, user );
    }
}
