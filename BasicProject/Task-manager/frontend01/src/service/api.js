import { API_URL } from "../utils/api.js";

export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };

  try {
    const result = await fetch(url, options);
    const data = result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const GetAllTask = async () => {
  const url = `${API_URL}/tasks`;
  const option = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const result = await fetch(url, option);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const DeleteTaskById = async (id) => {
  const url = `${API_URL}/tasks/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {}
};
export const UpdateTaskById = async (id, reqbody) => {
  const url = `${API_URL}/tasks/${id}`;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqbody),
  };
  try {
    const result = await fetch(url, option);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
