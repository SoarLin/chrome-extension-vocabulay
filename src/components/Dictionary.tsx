import React from 'react'
import {
  Paper, Table,
  TableBody, TableCell, TableHead,
  TableContainer, TableRow,
  TablePagination
} from '@mui/material'

import { Vocabulary } from '../types'

type Props = {
  data: Vocabulary[],
  onEditRow: (_value: Vocabulary) => void,
}

const Dictionary: React.FC<Props> = ({
  data = [],
  onEditRow
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell>Meaning</TableCell>
              <TableCell>Sentence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vocabulary: Vocabulary, idx: number) => {
                return (
                  <TableRow
                    hover
                    key={vocabulary.id ? vocabulary.id : `row-${idx}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={ () => onEditRow(vocabulary) }
                  >
                    <TableCell>{vocabulary.word}</TableCell>
                    <TableCell>{vocabulary.meaning}</TableCell>
                    <TableCell>{vocabulary.sentence}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        size="small"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Dictionary
