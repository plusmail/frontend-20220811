import client from './client';
import axios from 'axios';

// 로그인
export const login = ({ username, password }) => {
  return client.post('https://localhost:8080/api/auth/login', { username, password })
    .then(response => {
      // console.log("responese:", response);
      const { message, result, status } = response.data;
      const { jwt, user } = result.data;
      // console.log("responese accessToken:", jwt);
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;
      console.log(response);
      return response;
    }).catch(error => {
    console.log("login error =====");
  });
};
// 회원가입
export const register = ({ username, password }) =>
  client.post('https://localhost:8080/api/auth/signup', { username, password });


// 로그인 상태 확인
export const check = ({username, accessToken}) =>{
  console.log("acct:", accessToken);
  return client.post('https://localhost:8080/api/auth/check', {username, accessToken})
    .then(response =>{
      console.log("check post res:", response);
      return response;

    }).catch(error => {
      console.log("check post error");
    })

};

// 로그아웃
export const logout = () => client.post('https://localhost:8080/api/auth/logout');
