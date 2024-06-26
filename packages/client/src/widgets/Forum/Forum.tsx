import { ArrowForward, Search } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  Paper,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState } from 'react';

import {
  useAddTopicMutation,
  useGetTopicsQuery,
} from '@/entities/forum/topics/api';
import { AddTopic } from '@/features/AddTopic/AddTopic';
import { GenericList } from '@/features/GenericList/GenericList';
import { TopicItem } from '@/features/TopicItem/TopicItem';
import { BasePerPage } from '@/shared/constants';
import { searchValidation } from '@/shared/constants/validationShemas';

import { useGetUserQuery } from '../../entities/user/model/api';

export const Forum: FC = () => {
  const [addTopic] = useAddTopicMutation();
  const { data: userData } = useGetUserQuery();
  const { data } = useGetTopicsQuery();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(BasePerPage[0]);
  const rowsOffset = page * rowsPerPage;

  const filtredTopics = data
    ? data.topics.slice(rowsOffset, rowsOffset + rowsPerPage)
    : [];

  const formikSearch = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: searchValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
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
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" component="h1" textAlign="center">
        Forum
      </Typography>
      <Box
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          px: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={formikSearch.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            flex: 1,
            my: 2,
            mr: 5,
          }}
        >
          <TextField
            fullWidth
            id="search"
            name="search"
            label="Search"
            onChange={formikSearch.handleChange}
            error={
              formikSearch.touched.search && Boolean(formikSearch.errors.search)
            }
            helperText={
              formikSearch.touched.search && formikSearch.errors.search
            }
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
                    <ArrowForward />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {userData && <AddTopic onSubmit={addTopic} authorId={userData.id} />}
      </Box>
      <List
        sx={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {filtredTopics.length ? (
          <GenericList
            renderItem={TopicItem}
            items={filtredTopics}
            isBordered
            hasLink
          />
        ) : (
          <Typography variant="h5" textAlign="center">
            No topics yet...
          </Typography>
        )}
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <TablePagination
          component="div"
          rowsPerPageOptions={BasePerPage}
          colSpan={4}
          count={data ? data.count : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};
