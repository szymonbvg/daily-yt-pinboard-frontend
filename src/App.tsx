import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SearchResults from "./components/Search/SearchResults";
import Home from "./components/Home";
import AuthWrapper from "./components/Auth/AuthWrapper";
import ProfileWrapper from "./components/Profile/ProfileWrapper";
import Posts from "./components/Profile/Posts";
import PostByID from "./components/Profile/PostByID";
import Settings from "./components/Settings";
import NavbarWrapper from "./components/Navbar/NavbarWrapper";
import InputForm from "./components/Auth/InputForm";
import Status from "./components/Status";
import { MessageType } from "./structures/Common";

export default function App() {
  return (
    <AuthWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <div className="content">
        <Routes>
          <Route path="*" element={<Status type={MessageType.NOT_FOUND} />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<InputForm type="login" />} />
          <Route path="/register" element={<InputForm type="register" />} />
          <Route
            path="/user/:profile"
            element={
              <ProfileWrapper>
                <Posts />
              </ProfileWrapper>
            }
          />
          <Route
            path="/user/:profile/post/:id"
            element={
              <ProfileWrapper>
                <PostByID />
              </ProfileWrapper>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </AuthWrapper>
  );
}
