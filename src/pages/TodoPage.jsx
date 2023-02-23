import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleAddtodo = () => {
    console.log('add function');
    if (inputValue.length === 0) {
      return;
    }
    setTodos((prevTodo) => {
      return [
        ...prevTodo,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    setInputValue('');
  };

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleInputChange}
        onAddTodo={handleAddtodo}
        onKeyDone={handleAddtodo}
      />
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
