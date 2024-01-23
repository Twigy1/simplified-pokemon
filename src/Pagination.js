import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Pagination({ gotoNextPage, gotoPrevPage}) {
  return (
    <>
        <Stack spacing = {21} direction = "row" justifyContent="center">
          {gotoPrevPage && <Button variant='contained' onClick={gotoPrevPage}>Previous</Button>}
          {gotoNextPage && <Button variant='contained' onClick={gotoNextPage}>Next</Button>}
        </Stack> 
    </>
  )
}
