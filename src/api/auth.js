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
