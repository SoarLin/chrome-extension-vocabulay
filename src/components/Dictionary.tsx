import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import { db, getAllDataBase, writeWord } from '../apis/firebase'

interface Vocabulary {
  word: string,
  explan: string,
  sentence: string,
}
const data: readonly Vocabulary[] = [
  {
    word: 'dividend',
    explan: '股息；紅利',
    sentence: 'The company distributed a dividend to its shareholders. (公司向股東發放了股息。)',
  },
  {
    word: 'reimbursement',
    explan: '償還；補償',
    sentence: 'I submitted the expense report for reimbursement. (我提交了費用報銷申請。)',
  },
  {
    word: 'beneficiaries',
    explan: '受益人；受惠者',
    sentence: 'The insurance policy provides financial support to the beneficiaries. (該保險政策為受益人提供財務支援。)',
  },
  {
    word: 'instinct',
    explan:	'本能；直覺',
    sentence: 'The mother\'s instinct told her that something was wrong with her child. (母親的本能告訴她，孩子有些問題。)',
  },
  {
    word: 'fulfill',
    explan: '實現；履行',
    sentence: 'He worked hard to fulfill his dream of becoming a professional athlete. (他努力實現成為職業運動員的夢想。)',
  },
  {
    word: 'tariff',
    explan: '關稅',
    sentence: 'The government increased the tariff on imported goods. (政府提高了進口商品的關稅。)',
  },
  {
    word: 'multinational',
    explan: '跨國的；多國的',
    sentence: 'The multinational company has branches in over 50 countries. (這家跨國公司在50多個國家設有分公司。)',
  },
  {
    word: 'prestige',
    explan: '聲望；威望',
    sentence: 'The luxury brand is known for its prestige and exclusivity. (這個奢侈品牌以其聲望和獨特性而聞名。)'
  },
  {
    word: 'veteran',
    explan: '老手；經驗豐富的人',
    sentence:'The company hired a veteran to train new employees. (公司聘請了一位老手來培訓新員工。)'
  },
  {
    word: 'profitability',
    explan:	'獲利性；盈利能力',
    sentence: 'The company\'s profitability has increased significantly this year. (該公司的盈利能力今年顯著提高。)'
  },
  {
    word: 'constitute',
    explan:	'構成；組成',
    sentence: 'These elements constitute the basic structure of the theory. (這些元素構成了該理論的基本結構。)'
  }
]

const Dictionary: React.FC = () => {
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
    console.log('fireStore:', db)
    const writeData = async (idx: number) => {
      try {
        await writeWord(idx)
      } catch (error) {
        console.error('Error write data:', error)
      }
    }

    const fetchData = async () => {
      try {
        const response = await getAllDataBase()
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    // writeData(0)
    fetchData()
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {data
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
