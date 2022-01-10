import React, { useEffect } from 'react';
import './App.css';
import { auth } from './services/auth.service';
import KanbanBoard from './components/kanban-board.component';
import styled from 'styled-components';
import { Container } from '@mui/material';

const Title = styled.h2`
    color:white;
    text-align: center;
`

function App() {

  useEffect(() => {
    //Trocar para retirar usuario do .env
    auth("letscode", "lets@123")
  }, [])

  return (
    <>
      {/* <div style={{ position: 'absolute', top: '0' }}> */}
      <Title> Kanban board - Let's code</Title>

      {/* </div> */}
      <div className="App">
        <Container sx={{ minHeight: '100vh', maxWidth: '150vw' }}>
          <KanbanBoard></KanbanBoard>
        </Container>
      </div>
    </>
  );
}

export default App;
