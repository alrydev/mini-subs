import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function AddCompanyComponent() {
  return (
    <div>
      <Container className='mt-5 d-flex justify-content-center pt-5'>
        <Form className='' style={{ width: "75%" }} >
          <h2 className='mb-3'>Add New Company</h2>
          <Form.Group className="mb-3">
            <Form.Control placeholder='name' type="text" name='name' />
          </Form.Group>
          <Button className='w-100 bg-bluish bluish border-0 text-white' type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </div>
  )
}
