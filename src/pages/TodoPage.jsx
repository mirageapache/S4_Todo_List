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
  // input的value
  const [inputValue, setInputValue] = useState('');
  // todo list 的資料
  const [todos, setTodos] = useState(dummyTodos);

  let counts = 0; //計算剩餘項目數
  todos.map((todo) => {
    return todo.isDone === false && counts++;
  });
  // 顯示剩餘項目數
  const [count, setCount] = useState(counts);

  // Input輸入(資料變動)
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // 新增Todo資料
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
    setCount(count + 1);
  };

  // 修改Todo資料完成/未完成
  const handleToggleDone = ({ id, isDone }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone,
          };
        }
        return todo;
      });
    });

    if (isDone) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };

  // 更動 Todo input 編輯狀態
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  // 儲存 Todo 編輯資料
  const handleTodoSave = ({ id, title }) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title, isEdit: false };
        }
        return todo;
      });
    });
  };

  // 刪除 Todo 資料
  const handleDelete = ({ id, isDone }) => {
    setTodos((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });

    if (!isDone) setCount(count - 1);
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
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleTodoSave}
        onDelete={handleDelete}
      />
      <Footer count={count} />
    </div>
  );
};

export default TodoPage;
