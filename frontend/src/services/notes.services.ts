import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = JSON.parse(localStorage.getItem("user") || "{}");

const getAllNotes = async () => {
  const response = await axios.get(`${API_URL}/api/notes/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};

const getPinnedNotes = async () => {
  const response = await axios.get(`${API_URL}/api/notes?q=pinned`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};

const getDraftNotes = async () => {
  const response = await axios.get(`${API_URL}/api/notes?q=draft`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};

const getTrashNotes = async () => {
  const response = await axios.get(`${API_URL}/api/notes?q=trash`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};

const createNote = async (title: string, content: string) => {
  const response = await axios.post(
    `${API_URL}/api/notes/`,
    {
      title: title,
      content: content,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response;
};
const noteService = {
  getAllNotes,
  getPinnedNotes,
  getDraftNotes,
  getTrashNotes,
  createNote,
};

export default noteService;
