package ie.samuelbwr.todoitem;

import ie.samuelbwr.todoitem.exceptions.TodoItemAlreadyRegisteredException;
import ie.samuelbwr.todoitem.exceptions.TodoItemNotFoundException;
import ie.samuelbwr.todoitem.exceptions.TodoListNotFoundException;
import ie.samuelbwr.user.User;
import ie.samuelbwr.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping( "/api/todo" )
public class TodoItemController {

    @Autowired
    private TodoItemRepository repository;

    @Autowired
    private UserRepository todoListRepository;

    @GetMapping
    public List<TodoItem> getItems() {
        //TODO: Change to Session user id
        return repository.findAllByUser_Id( 1L );
    }

    @PostMapping
    public TodoItem addItem( @PathVariable( name = "userId" ) Long userId,
                             @RequestBody TodoItem todoItem ) {
        if ( todoItem.getId() != null )
            throw new TodoItemAlreadyRegisteredException();

        //TODO: Change to Session user
        User user = todoListRepository.findById( userId ).orElseThrow( TodoListNotFoundException::new );
        todoItem.setUser( user );
        return repository.save( todoItem );
    }

    @PatchMapping( "{ItemId}" )
    public TodoItem updateItem( @PathVariable( name = "ItemId" ) Long itemId,
                                @RequestBody TodoItem todoItem ) {
        TodoItem itemToUpdate = repository.findById( itemId ).orElseThrow( TodoItemNotFoundException::new );

        itemToUpdate.setText( todoItem.getText() );
        itemToUpdate.setLastUpdate( Instant.now().atZone( ZoneId.systemDefault() ) );
        return repository.save( itemToUpdate );
    }

    @GetMapping( "{itemId}/toggle" )
    public TodoItem toggleItemCompleteness( @PathVariable( name = "ItemId" ) Long itemId ) {
        TodoItem itemToUpdate = repository.findById( itemId ).orElseThrow( TodoItemNotFoundException::new );

        itemToUpdate.setCompleted( !itemToUpdate.getCompleted() );
        itemToUpdate.setLastUpdate( Instant.now().atZone( ZoneId.systemDefault() ) );
        return repository.save( itemToUpdate );
    }

}
