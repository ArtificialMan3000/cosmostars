import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  CardActionArea, CardHeader,
  IconButton, InputAdornment,
  List,
  Paper, TablePagination,
  TextField,
  Typography
} from "@mui/material";
import { TopicItem } from "../../features/TopicItem/TopicItem";
import { searchValidation } from "../../shared/constants/validationShemas";
import { topicMock } from "../../shared/constants/mocks";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { ArrowForward, Search } from "@mui/icons-material";
import { AddTopic } from "../../features/AddTopic/AddTopic";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export const ForumPage: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const rowsOffset = page * rowsPerPage;
  const filtredTopics = topicMock.slice(rowsOffset, rowsOffset + rowsPerPage);

  const formikSearch = useFormik({
    initialValues: {
      search: ""
    },
    validationSchema: searchValidation,
    onSubmit: values => {
      console.log(values);
    }
  });
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MainLayout>
      <Paper
        variant="outlined"
        sx={{
          backgroundColor: "rgb(0 0 0 / 80%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "80%",
          margin: "auto",
          padding: 3
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}>
          <Typography
            variant="h2"
            component="h1"
            className="topic-page__name"
            m={"auto"}>
            Forum
          </Typography>
        </Box>

        <Box
          sx={{
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            px: 4
          }}>
          <Box
            component="form"
            onSubmit={formikSearch.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              width: "80%",
              my: 2,
              mr: 5
            }}>
            <TextField
              fullWidth
              id="search"
              name="search"
              label="Search"
              onChange={formikSearch.handleChange}
              error={formikSearch.touched.search && Boolean(formikSearch.errors.search)}
              helperText={formikSearch.touched.search && formikSearch.errors.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search topic"
                      edge="end"
                      type="submit"
                    >
                      <ArrowForward></ArrowForward>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2
              }}
            />
          </Box>
          <AddTopic/>
        </Box>

        <List
          sx={{
            width: "100%",
            overflowY: "scroll"
          }}>
          {filtredTopics.map(item => (
            <TopicItem key={item.id} bordered {...item} header={() => (
              <CardActionArea component={Link} to={`/forum/${item.id}`}>
                <CardHeader
                  title={<Typography variant="h5" component="h2">Topic {item.id}</Typography>}
                />
              </CardActionArea>
            )} />
          ))}
        </List>
        <TablePagination
          rowsPerPageOptions={[1, 2, 3]}
          colSpan={4}
          count={topicMock.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </MainLayout>
  );
};
