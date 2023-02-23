import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onSave,
  onDelete,
  onToggleDone,
  onChangeMode,
}) => {
  return (
    <div>
      TodoCollection
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={({ id, isDone }) => onToggleDone?.({ id, isDone })}
            onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
            onSave={({ id, title }) => onSave?.({ id, title })}
            onDelete={({ id, isDone }) => onDelete?.({ id, isDone })}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
