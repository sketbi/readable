import React from 'react'
import { Loader,Message,Modal,Header,Button } from 'semantic-ui-react'


const Loading = () => (
  <Loader active inline='centered' size='big'/>
)

const ErrorMessage = ({ message }) => (
    <Message negative>
      <Message.Header>Error Loading</Message.Header>
      <p>{message}</p>
    </Message>
  )

const DeleteConfirmationModal = (props) => (
  <Modal open={props.openDialog} style={{margin: "150px",marginTop : "300px",}}>
   <Header icon='delete' content='Delete Post' />
    <Modal.Content>
       <p>Are you sure you want to delete <b>{props.record.title}</b> ?</p>
    </Modal.Content>
    <Modal.Actions>
    <Button negative onClick={props.deletePost}>
      Confirm Delete
    </Button>
    <Button  onClick={props.closeDelete}>
      Cancel 
    </Button>
  </Modal.Actions>
  </Modal>
)
const Error = () => {
  return (
    <ErrorMessage message='Error communicatiing with API Server'/>
  );
}


export  {
    Loading,
    ErrorMessage,
    DeleteConfirmationModal,
    Error
  }
