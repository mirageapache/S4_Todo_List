import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';

const TodoPage = () => {
  // input的value
  const [inputValue, setInputValue] = useState('');
  // todo list 的資料
  const [todos, setTodos] = useState([]);
  // 顯示剩餘項目數
  const [count, setCount] = useState(0);

  // 透過api 取得Todo 資料
  useEffect(() => {
    let counts = 0; //計算剩餘項目數
    const getTodosAsync = async () => {
      try {
        // 呼叫getTodos api
        const todos = await getTodos();
        // 將資料set到 useState的 todos
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));

        todos.map((todo) => {
          return todo.isDone === false && counts++;
        });
        setCount(counts); //設定未完成項目數
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  // Input輸入(資料變動)
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // 新增Todo資料
  const handleAddtodo = async () => {
    // 驗證input value有沒有資料
    if (inputValue.length === 0) {
      return;
    }
    try {
      // 呼叫createTodo api
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      // 重新render Todos資料
      setTodos((prevTodo) => {
        return [
          ...prevTodo,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false, //須多設定todo的編輯狀態
          },
        ];
      });
      setInputValue('');
      setCount(count + 1);
    } catch (error) {
      console.error(error);
    }
  };

  // 修改Todo資料完成/未完成
  const handleToggleDone = async (id) => {
    // 先取得欲修改的todo資料
    const current_todo = todos.find((todo) => todo.id === id);

    try {
      // 呼叫patchTodo
      await patchTodo({ id, isDone: !current_todo.isDone });

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });

      if (!current_todo.isDone) {
        setCount(count - 1);
      } else {
        setCount(count + 1);
      }
    } catch (error) {
      console.error(error);
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
  const handleTodoSave = async ({ id, title }) => {
    // 驗證input value有沒有資料
    if (title === 0) {
      return;
    }

    try {
      // 呼叫 patchTodo api
      await patchTodo({ id, title });

      setTodos((prevTodo) => {
        return prevTodo.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title, isEdit: false };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 刪除 Todo 資料
  const handleDelete = async ({ id, isDone }) => {
    try {
      // 呼叫 deleteTodo api
      await deleteTodo(id);

      setTodos((prevTodo) => {
        return prevTodo.filter((todo) => todo.id !== id);
      });

      if (!isDone) setCount(count - 1);
    } catch (error) {
      console.error(error);
    }
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
