export interface Notes {
  notes: Note[];
}

export interface Note {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  draft: boolean;
  trash: boolean;
}
