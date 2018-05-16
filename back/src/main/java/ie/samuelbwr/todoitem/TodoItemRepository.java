package ie.samuelbwr.todoitem;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TodoItemRepository extends CrudRepository<TodoItem, Long> {

    List<TodoItem> findAllByUser_Id(Long userId);

}
