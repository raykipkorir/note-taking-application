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

const getNoteById = async (id: string | undefined) => {
  const response = await axios.get(`${API_URL}/api/notes/${id}`, {
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

const createNote = async (
  title: string,
  content: string,
  draft: boolean = false
) => {
  const response = await axios.post(
    `${API_URL}/api/notes/`,
    {
      title: title,
      content: content,
      draft: draft,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response;
};

const updateNote = async (
  id: string | undefined,
  title: string,
  content: string
) => {
  const response = await axios.put(
    `${API_URL}/api/notes/${id}/`,
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

const deleteNote = async (id: number | undefined) => {
  const response = await axios.delete(`${API_URL}/api/notes/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};

const pinNote = async (id: number | undefined, pin: boolean) => {
  const response = await axios.patch(
    `${API_URL}/api/notes/${id}/`,
    { pinned: pin },
    { headers: { Authorization: `Bearer ${token.access}` } }
  );
  return response;
};

const throwNoteToTrash = async (id: number | undefined, trash: boolean) => {
  const response = await axios.patch(
    `${API_URL}/api/notes/${id}/`,
    { trash: trash },
    { headers: { Authorization: `Bearer ${token.access}` } }
  );
  return response;
};

const draftNote = async (id: number | undefined, draft: boolean) => {
  const response = await axios.patch(
    `${API_URL}/api/notes/${id}/`,
    { draft: draft },
    { headers: { Authorization: `Bearer ${token.access}` } }
  );
  return response;
};

const noteService = {
  getAllNotes,
  getNoteById,
  getPinnedNotes,
  getDraftNotes,
  getTrashNotes,
  createNote,
  updateNote,
  deleteNote,
  pinNote,
  throwNoteToTrash,
  draftNote,
};

export default noteService;
