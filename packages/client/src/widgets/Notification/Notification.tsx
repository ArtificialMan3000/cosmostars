import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

import { clearNotification } from '@/entities/notification';
import { selectNotification } from '@/entities/notification/selectors';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';

export const Notification: FC = () => {
  const dispatch = useAppDispatch();
  const { id, type, text } = useAppSelector(selectNotification);

  const isShown = Boolean(id);

  return (
    <>
      {isShown && (
        <Snackbar
          key={id}
          open={true}
          onClose={(_evt, reason) => {
            if (reason !== 'clickaway') {
              dispatch(clearNotification());
            }
          }}
          autoHideDuration={6000}
        >
          <Alert severity={type ?? 'info'} variant="filled">
            {text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
