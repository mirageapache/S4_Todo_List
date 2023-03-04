import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

// Login Method
export const login = async ({ username, password }) => {
  try {
    //用POST 串接api，並解構存到data 變數
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    // 將AuthToken 從data 解構
    const { authToken } = data;

    // 如果登入成功，會回傳AuthToken及user資料
    // {"authToken": "eyJhbGciOiJ...~", "user": { "username": "james14", "email": "james14@gmail.com"}}
    if (authToken) {
      return { success: true, ...data };
    }
    // 如果登入失敗，則回傳失敗訊息
    // {"success": false, "message": "Username or password is invalid"}
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Register Method
export const register = async ({ username, email, password }) => {
  try {
    //用POST 串接api，並解構存到data 變數
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });

    // 將AuthToken 從data 解構
    const { authToken } = data;

    // 註冊成功，會回傳success及authToken
    if (authToken) {
      return { success: true, ...data };
    }
    // 註冊失敗，則回傳失敗訊息
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Check Token Method
export const checkPermission = async (authToken) => {
  try {
    // 在 JWT 實作機制中，須把 token 放在 HTTP Request「Header」裡，並使用 Authorization 的 Bearer 類型來攜帶 token。
    // 注意字串間 'Bearer ' 和 authToken 之間需要加入空格。
    const response = await axios.get(`${authURL}/test-token`, {
      headers: { Authorization: 'Bearer ' + authToken },
    });
    return response.data.success;
  } catch (error) {
    console.error(error);
  }
};
