package ie.samuelbwr.todoitem;

import ie.samuelbwr.security.AuthenticatedUser;
import ie.samuelbwr.todoitem.exceptions.TodoItemAlreadyRegisteredException;
import ie.samuelbwr.todoitem.exceptions.TodoItemNotFoundException;
import ie.samuelbwr.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping( "/api/todos" )
public class TodoItemController {

    @Autowired
    private TodoItemRepository repository;

    @GetMapping
    public List<TodoItem> getItems( @AuthenticatedUser User user ) {
        return repository.findAllByUser_Id( user.getId() );
    }

    @PostMapping
    public TodoItem addItem( @AuthenticatedUser User user,
                             @RequestBody TodoItem todoItem ) {
        if ( todoItem.getId() != null )
            throw new TodoItemAlreadyRegisteredException();

        todoItem.setUser( user );
        return repository.save( todoItem );
    }

    @PatchMapping( "{itemId}" )
    public TodoItem updateItem( @PathVariable( name = "itemId" ) Long itemId,
                                @RequestBody TodoItem todoItem ) {
        TodoItem itemToUpdate = repository.findById( itemId ).orElseThrow( TodoItemNotFoundException::new );

        itemToUpdate.setText( todoItem.getText() );
        itemToUpdate.setLastUpdate( Instant.now().atZone( ZoneId.systemDefault() ) );
        return repository.save( itemToUpdate );
    }

    @GetMapping( "{itemId}/toggle" )
    public TodoItem toggleItemCompleteness( @PathVariable( name = "itemId" ) Long itemId ) {
        TodoItem itemToUpdate = repository.findById( itemId ).orElseThrow( TodoItemNotFoundException::new );

        itemToUpdate.setCompleted( !itemToUpdate.getCompleted() );
        itemToUpdate.setLastUpdate( Instant.now().atZone( ZoneId.systemDefault() ) );
        return repository.save( itemToUpdate );
    }

    @DeleteMapping( "{itemId}" )
    public void deleteItem( @PathVariable( name = "itemId" ) Long itemId) {
        repository.deleteById( itemId );
    }
}
