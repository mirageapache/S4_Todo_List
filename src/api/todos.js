import axios from 'axios';

const baseURL = 'http://localhost:3001';

// GET (取得Todos資料)
export const getTodos = async () => {
  try {
    // 用get的方式串接，並將response的值放到"res"變數內
    const res = await axios.get(`${baseURL}/todos`);
    // 回傳取得的資料
    return res.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

// POST (建立Todo資料)
export const createTodo = async (payload) => {
  // payload是要新增的參數
  // 把{title、isDone}從"payload"解構出來
  const { title, isDone } = payload;
  try {
    // 用post的方法，(參數1是路徑，參數2是要傳的值)
    const res = await axios.post(`${baseURL}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

// PATCH (修改Todo資料)
export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(`${baseURL}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]: ', error);
  }
};

// DELETE (刪除Todo資料)
export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]: ', error);
  }
};
