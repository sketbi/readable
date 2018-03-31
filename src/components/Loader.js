import React from 'react'
import { Loader,Message } from 'semantic-ui-react'

const Loading = () => (
  <Loader active inline='centered' size='big'/>
)

const ErrorMessage = (props) => (
    <Message negative>
      <Message.Header>Error Loading</Message.Header>
      <p>{props.message}</p>
    </Message>
  )




export  {
    Loading,
    ErrorMessage,
  }
