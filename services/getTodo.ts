import { promises } from "dns";
import { ListType } from "../src/types/listype";
import { http } from "../src/utils/request";
import axios, { AxiosResponse } from "axios";

// const showLists = async () => {
//   const res = await axios.get("http://localhost:3000/todos");
//   console.log(res.data);
//
// };

export async function getLists(): Promise<ListType[]> {
  const res = await http.get<ListType>("/todos");
  return res.data;
}

export async function addList(list: ListType): Promise<ListType[]> {
  const res = await http.post<ListType>("/todos", list);
  return res.data;
}
export async function deleteList(id: number): Promise<ListType[]> {
  const res = await http.delete<ListType>(`/todos/${id}`);
  return res.data;
}
export async function updateList(list: ListType): Promise<ListType[]> {
  const res = await http.put<ListType>(`/todos/${list.id}`, {
    done: list.done,
  });
  return res.data;
}
// const addList = async () => {
//   if (inputValue.value.trim() === "") {
//     alert("请输入内容");
//     return;
//   }

//   // 如果里面的月份，天数是个位数，就在前面加0
//   // axios 自动转换为json
//   const response = await axios.post("http://localhost:3000/todos", {
//     text: inputValue.value,
//     done: false,
//     time: time.value,
//   });
//   console.log(response.data);
//   const list = response.data;
//   lists.value.push(list);
//   inputValue.value = "";
//   showLists();
// };
