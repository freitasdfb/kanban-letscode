import { Box, styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize'
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdCheckCircleOutline,
  MdOutlineCancel
} from 'react-icons/md';
import styledComponents from 'styled-components';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { deleteCard, editCard } from '../services/card.service';
import { animated, useSpring } from 'react-spring';

const LcCard = styledComponents(Card)({
  background: 'white',
  color: 'black',
  margin: '2% 0 2% 0',
  padding: '10px',
  position: 'relative',
});

const CardFooter = styled(Box)({
  position: 'absolute',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '4%',
  fontSize: '30px',
  width: '92%'
})

const MarkDownCardContent = styled(CardContent)({
  background: '#eaeaea',
  borderRadius: '5px',
  fontSize: '12px',
  marginBottom: '10%',
})

const FooterButton = styled(Button)({
  fontSize: '23px'
})

const FooterWrapper = styledComponents.div`
  display: flex;
  justifyContent: center;
`
const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const ITEM_HEIGHT = 24;

const options = [
  'Edit',
  'Delete'
];

export default function LcCardComponent(props: any) {

  const { card, updateFlag } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [title, setTitle] = useState(card.titulo);
  const [content, setContent] = useState(card.conteudo);
  const [editMode, setEditMode] = useState(false);
  const propes = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 100 })



  const menuOpen = Boolean(anchorEl);
  const handleClose = (option: string) => {
    if (option && option.toLowerCase() === 'edit') {
      setEditMode(true);
    } else if (option && option.toLowerCase() === 'delete') {
      deleteCard(card.id)
      updateFlag(true)
    }
    setAnchorEl(null)
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditCard = () => {
    editCard({ id: card.id, title, content, list: card.lista })
    setEditMode(false);
    updateFlag(true);
  }

  const handleClickBack = () => {
    const nextList = card.lista === 'doing' ? 'todo' : 'doing'
    editCard({ id: card.id, title, content, list: nextList })
    updateFlag(true)
  }

  const handleClickForward = () => {
    const nextList = card.lista === 'todo' ? 'doing' : 'done'
    editCard({ id: card.id, title, content, list: nextList })
    updateFlag(true)
  }

  return (
    <animated.div id={card.id} style={propes}>
      <LcCard>
        <CardHeader>
          {editMode ?
            <TextField required value={title} onChange={(e: any) => setTitle(e.target.value)} fullWidth label="Title" id="outlined-size-normal" placeholder='Card title' />
            :
            <>
              <Typography component="p" sx={{ fontSize: '13px', textAlign: 'left' }}>
                {card.titulo}
              </Typography>
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={menuOpen ? 'long-menu' : undefined}
                  aria-expanded={menuOpen ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MdOutlineMoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </>
          }

        </CardHeader>

        {editMode ?
          <div style={{ marginBottom: '10%', marginTop: '5%' }}>
            <MDEditor
              value={content}
              onChange={(e: any) => setContent(e)}
              highlightEnable={true}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
              hideToolbar={true}
              preview='edit'
            />
          </div>

          :
          <MarkDownCardContent>
            <MDEditor.Markdown
              source={card.conteudo}
              rehypePlugins={[[rehypeSanitize]]}
            />
          </MarkDownCardContent>
        }


        <CardFooter>
          <FooterWrapper>
            {editMode ?
              <>
                <FooterButton onClick={() => setEditMode(false)}>
                  <MdOutlineCancel style={{ color: 'red' }} />
                </FooterButton>
                <FooterButton onClick={() => handleEditCard()}>
                  <MdCheckCircleOutline style={{ color: 'green' }} />
                </FooterButton>
              </>
              :
              <>
                <FooterButton disabled={card.lista === 'todo'} onClick={() => handleClickBack()}>
                  <MdOutlineChevronLeft />
                </FooterButton>
                <FooterButton disabled={card.lista === 'done'} onClick={() => handleClickForward()}>
                  <MdOutlineChevronRight />
                </FooterButton>
              </>
            }
          </FooterWrapper>
        </CardFooter>
      </LcCard >
    </animated.div>
  )
}