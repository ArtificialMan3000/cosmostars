import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { RoutesName } from "../../shared/constants";
import { Link } from "react-router-dom";

export const MainPage: FC = () => {
  return (
    <MainLayout>
      <Box
        data-testid="main-page"
        className="main-page"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
          width: "100%",
        }}>
        <Typography
          variant="h1"
          className="main-page__name"
          sx={{
            fontSize: "144px",
            letterSpacing: "0.01em",
            color: "transparent",
            textShadow:
              " 5px 4px 6px #011133, 0px 0px 0px #ff00008c, 5px 4px 6px #ff00008c",
            marginBottom: 2,
            WebkitTextStroke: "4px white",
            pointerEvents: "none",
          }}>
          Galaxy spaceship
        </Typography>
        <Button
          className="main-page__play-btn"
          variant="contained"
          endIcon={<PlayArrowIcon />}
          size="large"
          component={Link}
          to={RoutesName.GAME}>
          Play
        </Button>
      </Box>
    </MainLayout>
  );
};