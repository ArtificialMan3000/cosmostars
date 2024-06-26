import {
  TableFooter as MuiTableFooter,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { FC } from 'react';

type TableFooterProps = {
  pagesCount: number;
  rowsPerPage: number;
  currPage: number;
  onChangePage: (
    evt: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onChangeRowsPerPage: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const TableFooter: FC<TableFooterProps> = ({
  pagesCount,
  rowsPerPage,
  currPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  return (
    <MuiTableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          colSpan={4}
          count={pagesCount}
          rowsPerPage={rowsPerPage}
          page={currPage}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TableRow>
    </MuiTableFooter>
  );
};
