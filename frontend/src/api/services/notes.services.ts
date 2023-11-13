import { axiosInstance } from "../axios";

const getAllNotes = async () => {
  const response = await axiosInstance.get("/notes/");
  return response;
};

const getNoteById = async (id: string | undefined) => {
  const response = await axiosInstance.get(`/notes/${id}`);
  return response;
};

const getPinnedNotes = async () => {
  const response = await axiosInstance.get("/notes?q=pinned");
  return response;
};

const getDraftNotes = async () => {
  const response = await axiosInstance.get("/notes?q=draft");
  return response;
};

const getTrashNotes = async () => {
  const response = await axiosInstance.get("/notes?q=trash");
  return response;
};

const createNote = async (
  title: string,
  content: string,
  draft: boolean = false
) => {
  const response = await axiosInstance.post("/notes/", {
    title: title,
    content: content,
    draft: draft,
  });
  return response;
};

const updateNote = async (
  id: string | undefined,
  title: string,
  content: string
) => {
  const response = await axiosInstance.put(`/notes/${id}/`, {
    title: title,
    content: content,
  });
  return response;
};

const deleteNote = async (id: number | undefined) => {
  const response = await axiosInstance.delete(`/notes/${id}/`);
  return response;
};

const pinNote = async (id: number | undefined, pin: boolean) => {
  const response = await axiosInstance.patch(`/notes/${id}/`, {
    pinned: pin,
  });
  return response;
};

const throwNoteToTrash = async (id: number | undefined, trash: boolean) => {
  const response = await axiosInstance.patch(`/notes/${id}/`, {
    trash: trash,
  });
  return response;
};

const draftNote = async (id: number | undefined, draft: boolean) => {
  const response = await axiosInstance.patch(`/notes/${id}/`, {
    draft: draft,
  });
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
