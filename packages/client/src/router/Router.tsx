import { Route, Routes } from "react-router-dom";
import { ForumPage } from "../pages/ForumPage";
import { ForumTopicPage } from "../pages/ForumTopicPage";
import { GamePage } from "../pages/GamePage";
import { LeaderboardPage } from "../pages/LeaderboardPage";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage/";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProfilePage } from "../pages/ProfilePage";
import { RegPage } from "../pages/RegPage";
import { RoutesName } from "../shared/constants";
import { PrivateMode } from "./modes/PrivateMode";

export const Router = () => {
  return (
    <Routes>
      <Route path={RoutesName.MAIN} element={<MainPage />} />
      <Route
        path={RoutesName.PROFILE}
        element={
          <PrivateMode>
            <ProfilePage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.LEADERBOARD}
        element={
          <PrivateMode>
            <LeaderboardPage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.FORUM}
        element={
          <PrivateMode>
            <ForumPage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.FORUM_DETAIL}
        element={
          <PrivateMode>
            <ForumTopicPage />
          </PrivateMode>
        }
      />
      <Route path={RoutesName.GAME} element={<GamePage />} />
      <Route path={RoutesName.LOGIN} element={<LoginPage />} />
      <Route path={RoutesName.REGISTRATION} element={<RegPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
