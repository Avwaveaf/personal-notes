import { createContext, useEffect, useState } from "react";
let currLang = {
  title: "Private notes",
  addNote: "Add note",
  archived: "Archived",
  home: "Home",
  searchNote: "Search Your Note",
  logOut: "Log Out",
  activeNotesTitle: "Your Notes",
  notFound: "No Notes Found",
  delete: "Delete",
  archive: "Archive this",
  unarchive: "Un-Archive",
  addNoteTitle: "Add Your Note Info",
  addButton: "Add",
  addNoteInfoTitle: "Title of Your Notes",
  addNoteInfoBody: "Write your notes info",
  searchNotFound: "No Notes Found Please Add it first",
  language: "Language",
  theme: "Theme",
};
let indLang = {
  title: "Catatan Pribadi",
  addNote: "Tambahkan Notes",
  archived: "Terarsipkan",
  home: "Halaman Utama",
  searchNote: "Cari Catatanmu",
  logOut: "Keluar",
  activeNotesTitle: "Catatan Pribadiku",
  notFound: "Catatan tidak ditemukan",
  delete: "hapus",
  archive: "Arsipkan",
  unarchive: "Batalkan Archive",
  addNoteTitle: "Tambahkan Catatan Mu",
  addButton: "Tambahkan",
  addNoteInfoTitle: "Tambahkan Judul disini",
  addNoteInfoBody: "Isi Notes mu Disini",
  searchNotFound: "Notes tidak ditemukan silahkan tambahkan terlebih dahulu",
  language: "Bahasa",
  theme: "Tema",
};
export const LanguageContext = createContext({
  language: {},
  setLanguage: () => {},
  langAsset: {},
});
export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(false);
  const [langAsset, setLangAsset] = useState(currLang);
  useEffect(() => {
    if (language) {
      setLangAsset(indLang);
    } else {
      setLangAsset(currLang);
    }
  }, [language]);
  const value = { language, setLanguage, langAsset };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
