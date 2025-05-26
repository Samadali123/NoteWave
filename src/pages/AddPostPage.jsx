import React from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/Postform/Postform'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost