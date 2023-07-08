import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import { Vocabulary } from '../types'
import { readAllWords } from '../apis/vocabulary'


const Dictionary: React.FC = () => {
  const [dictionary, setDictionary] = React.useState<Vocabulary[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    const getAllData = async () => {
      const dictionaries = await readAllWords()
      // const dictionaries: Vocabulary[] = Object.values(data)
      setDictionary(dictionaries)
    }
    getAllData()
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell>Explan</TableCell>
              <TableCell>Sentence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dictionary
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data: Vocabulary, idx: number) => {
                return (
                  <TableRow
                    hover
                    key={`row-${idx}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{data.word}</TableCell>
                    <TableCell>{data.explan}</TableCell>
                    <TableCell>{data.sentence}</TableCell>
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
        count={dictionary.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Dictionary
