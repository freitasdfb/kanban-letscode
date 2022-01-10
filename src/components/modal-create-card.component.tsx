import { FormEvent, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { MdClose } from "react-icons/md";
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { saveCard } from '../services/card.service';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LcModal = styled(Box)`

@media only screen and (max-width : 416px) {
  width: 77% !important
}
`

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
`

const ModalContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '6%'
});

const ModalFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '5%;'
})

export default function TransitionsModal(props: any) {
  const { open, handleClose } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveCard({title, content}).then(() => {
      handleClose();
      setTitle('');
      setContent('');
    })
  }

  interface ICard {

  }

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={open}>
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <LcModal sx={style}>
              <ModalHeader>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Create new Card
                </Typography>
                <div onClick={() => handleClose()} style={{ cursor: 'pointer' }}> <MdClose /></div>
              </ModalHeader>
              <Typography id="transition-modal-description">
                Define your card title and content.
              </Typography>


              <ModalContent>
                <TextField required value={title} onChange={(e: any) => setTitle(e.target.value)} sx={{ marginTop: '2%', marginBottom: '2%' }} fullWidth label="Title" id="outlined-size-normal" placeholder='Card title' />
                {/* <TextField value={content} onChange={(e: any) => setContent(e.target.value)} sx={{ marginTop: '2%' }} fullWidth label="Content" id="outlined-size-normal" placeholder='Card content' /> */}

                Card content:
                <p style={{fontSize: '12px'}}>You can type your card content in markdown type</p>
                <MDEditor
                  value={content}
                  onChange={(e: any )=> setContent(e)}
                  highlightEnable={true}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
                {/* <MDEditor.Markdown source={content} /> */}
              </ModalContent>

              <ModalFooter>
                <Button type='submit' variant='contained' color='success'>Save</Button>
              </ModalFooter>
            </LcModal>
          </form>
        </Fade>
      </Modal>
    </Box>
  );
}
