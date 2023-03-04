import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { useMutation } from 'react-query'
import { API } from '../../config/api'
import { Container, Form, Button } from 'react-bootstrap'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function AddVariant() {

  let { data: variants, refetch } = useQuery('variantsCache', async () => {
    const response = await API.get('/variant')
    return response.data.data
  })

  const [form, setForm] = useState({
    name: "",
    subs_period: "",
    price: "",
    desc: "",
  })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      let formData = new FormData()
      formData.set('name', form.name)
      formData.set('subs_period', form.subs_period)
      formData.set('price', form.price)
      formData.set('desc', form.desc)

      const response = await API.post('/variant', formData, form, config)
      if (response?.status === 200) {
        Swal2.fire({
          position: 'center',
          icon: 'success',
          title: 'New Variant Added',
          showConfirmButton: false,
          timer: 2000
        })
        refetch()
      }
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div>
      <Container className='mt-5 d-flex justify-content-center pt-5'>
        <Form onSubmit={(e) => handleSubmit.mutate(e)} className='' style={{ width: "75%" }} >
          <h2 className='mb-3'>Add New Variants</h2>
          <Form.Group className="mb-3">
            <Form.Control onChange={handleOnChange} placeholder='name' type="text" name='name' />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control onChange={handleOnChange} placeholder='subscribe period day' type="text" name='subs_period' />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control onChange={handleOnChange} placeholder='price' type="text" name='price' />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control onChange={handleOnChange} placeholder='description' type="text" name='desc' />
          </Form.Group>
          <Button className='w-100 bg-bluish bluish border-0 text-white' type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </div>
  )
}
