import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Login } from "./routes/login-component";
import { Register } from "./routes/register-component";
import { Navigation } from "./components/navbar/navbar.component";
import { Home } from "./routes/home/home";
import { useContext, useEffect, useState } from "react";
import { getUserLogged, putAccessToken } from "./utils/public-api";
import { AddNote } from "./routes/add-note/add-note.page";
import { DetailNote } from "./routes/detail-note/detail-note.page";
import { Archived } from "./routes/archived/archived.page";
import { SeachBar } from "./components/search-bar/search-bar.component";
import { LanguageContext } from "./components/context/language.context";
import { ArchivedDetail } from "./routes/archived-detail-note/archived-detail-note.page";
import { ThemeContext } from "./components/context/theme.context";
const PageNotFound = () => {
  return <div>This page is not found</div>;
};

function App() {
  const { langAsset } = useContext(LanguageContext);
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [searchNoteString, setSarchNoteString] = useState("");
  const { theme } = useContext(ThemeContext);

  const onLoginSuccessHandler = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };
  const onLogOutHandler = () => {
    setAuthedUser(null);
    putAccessToken("");
  };
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUser();
  }, []);

  const onSearchQueryHandler = (val) => {
    setSarchNoteString(val);
  };
  if (initializing) {
    return null;
  }
  if (authedUser === null) {
    return (
      <div className={`private-notes-app `}>
        <main>
          <Routes>
            <Route
              path="*"
              element={<Login loginSuccess={onLoginSuccessHandler} />}
            />
            <Route path="register" element={<Register />} />
          </Routes>
        </main>
      </div>
    );
  }
  return (
    <div className={`private-notes-app ${theme}`}>
      <header className="private-notes-header">
        <span className="app-title">{langAsset.title}</span>
        <Navigation logOut={onLogOutHandler} name={authedUser.name} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<SeachBar searchQuery={onSearchQueryHandler} />}
          >
            <Route index element={<Home searchString={searchNoteString} />} />
            <Route
              path="archived"
              element={<Archived searchString={searchNoteString} />}
            />
            <Route
              path="archived/detail-note/:id"
              element={<ArchivedDetail />}
            />
          </Route>
          <Route path="add-note" element={<AddNote />} />
          <Route path="detail-note/:id" element={<DetailNote />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
