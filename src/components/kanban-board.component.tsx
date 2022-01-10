import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TransitionsModal from './modal-create-card.component'
import { getCards } from '../services/card.service';
import LcColumnComponent from './kanban-column.component'
import styled from 'styled-components';

const LcButtonNew = styled(Button)`
    variant: outlined;
    margin: 1% 0;
`

const ButtonFixed = styled.div`
    position: fixed;
    right: 0;
    left: 0;
`

const ContainerBoards = styled(Box)`
    height: 80%;
    display: flex;
    justify-content: space-around;
    margin-top: 9vh;
    
    @media only screen and (max-width : 416px) {
        width: 193vw;
        margin-top: 7vh;
        
    }
`

function KanbanBoard() {

    const [modalOpen, setModalOpen] = useState(false);
    const [cards, setCards] = useState([])
    const [updateCards, setUpdateCards] = useState(true);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
        setModalOpen(false);
        setUpdateCards(true)
    }

    useEffect(() => {
        getCards().then((res => { setCards(res.data) }));
        setUpdateCards(false)
    }, [updateCards]);



    return (
        <>
            <ButtonFixed>
                <LcButtonNew variant='contained' color='success' onClick={() => handleOpen()}>Create new card</LcButtonNew>
            </ButtonFixed>
            {/* Essa modal só é aberta quando a variavel é manipulada */}
            <TransitionsModal open={modalOpen} handleClose={handleClose}></TransitionsModal>
            <ContainerBoards>
                <LcColumnComponent title="To do" cards={cards.filter((card: any) => card.lista === 'todo')} updateFlag={setUpdateCards} list='todo' />
                <LcColumnComponent title="Doing" cards={cards.filter((card: any) => card.lista === 'doing')} updateFlag={setUpdateCards} list='doing' />
                <LcColumnComponent title="Done" cards={cards.filter((card: any) => card.lista === 'done')} updateFlag={setUpdateCards} list='done' />
            </ContainerBoards>
        </>
    );
}

export default KanbanBoard;
