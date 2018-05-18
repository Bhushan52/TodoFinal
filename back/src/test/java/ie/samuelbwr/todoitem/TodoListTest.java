package ie.samuelbwr.todoitem;

import ie.samuelbwr.todoitem.exceptions.TodoItemAlreadyRegisteredException;
import ie.samuelbwr.todoitem.exceptions.TodoItemNotFoundException;
import ie.samuelbwr.user.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;

@RunWith( MockitoJUnitRunner.class )
@SpringBootTest
public class TodoListTest {

    private static final String USER = "test_user";
    private static final String PASS = "test_pass";

    @InjectMocks
    private TodoItemController controller;

    @Mock
    private TodoItemRepository repository;

    @Captor
    private ArgumentCaptor<TodoItem> itemArgumentCaptor;

    @Test
    public void shouldSetAuthenticatedUserToTodoItem() {
        controller.addItem( createSimpleUser(), createTodoItem( null, "Test", false ) );
        verify( repository ).save( itemArgumentCaptor.capture() );
        assertNotNull( itemArgumentCaptor.getValue().getUser() );
        assertEquals( USER, itemArgumentCaptor.getValue().getUser().getUsername() );
    }

    @Test
    public void shouldUpdateTodoItemValues() {
        String newText = "new text";
        String oldText = "old text";
        Long itemId = 1l;
        User user = createSimpleUser();

        doReturn( Optional.of( createTodoItem( itemId, oldText, true ) ) )
                .when( repository ).findByIdAndUser( itemId, user );
        controller.updateItem( itemId, user, createTodoItem( null, newText, false ) );
        verify( repository ).save( itemArgumentCaptor.capture() );

        assertEquals( newText, itemArgumentCaptor.getValue().getText() );
        assertEquals( false, itemArgumentCaptor.getValue().getCompleted() );
    }

    @Test(expected = TodoItemNotFoundException.class )
    public void shouldNotUpdateOtherUsersTodoItems() {
        controller.updateItem( 2l, createSimpleUser(), createTodoItem( null, "text", false ) );
    }

    @Test(expected = TodoItemAlreadyRegisteredException.class )
    public void shouldNotAddTodoItemsWithId() {
        controller.addItem( createSimpleUser(), createTodoItem( 1l, "text", false ) );
    }

    private TodoItem createTodoItem( Long id, String text, boolean completed ) {
        TodoItem item = new TodoItem();
        item.setId( id );
        item.setText( text );
        item.setCompleted( completed );
        return item;
    }

    private User createSimpleUser() {
        User user = new User();
        user.setUsername( USER );
        user.setPassword( PASS );
        return user;
    }
}
