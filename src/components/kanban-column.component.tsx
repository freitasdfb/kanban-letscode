import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LcCardComponent from './card.components'
import { Box } from '@mui/material';
import { editCard } from '../services/card.service';
import { useEffect, useState } from 'react';

const LcColumn = styled(Card)`
  display: flex;
  flex-direction: column;
  background: #e2e2e2;
  border: 1px solid #001E3C;
  variant: outlined;
  color: #5168cc;
  width: 25%;
  border-top: 5px solid #5168cc;
  font-size: 15px;
  overflow: hidden;

  @media only screen and (max-width : 416px) {
  }
`

const BoxCard = styled(Box)({
    overflow: 'auto',
    maxHeight: '70vh',
    // flex: '1 100px',
    padding: '0 10px'
})

export default function LcColumnComponent(props: any) {

  const { title, cards, updateFlag, list } = props;

 

  return (
    <LcColumn style={{height: cards.length === 0 ? '35vh' : '73vh'}}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="div">
              {title}
            </Typography>
            <Typography component="div">
              {cards.length}
            </Typography>
          </div>
        </CardContent>
        <BoxCard >
          {cards.map((card: any) => (
            <LcCardComponent updateFlag={updateFlag} key={card.id} card={card}></LcCardComponent>
          ))}
          {cards.length <= 0 && <p style={{ color: '#cecccc' }}>No cards to show</p>}
        </BoxCard>
        {/* <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="small">Create new </Button>
        </CardActions> */}
    </LcColumn>
  )
}