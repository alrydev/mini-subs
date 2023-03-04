import React from 'react'
import { API } from '../../config/api';
import { Table, Container } from "react-bootstrap";
import { useQuery } from 'react-query';
export default function CompaniesComponent() {



    // get variants: 
    let { data: companies } = useQuery('companiesCache', async () => {
        const response = await API.get('/companies')
        return response.data.data
    })

    console.log("companies ", companies);

  return (
    <>
          <Container className="p-5">
              <Table striped bordered hover responsive>
                  <thead>
                      <tr className='text-center w-10'>
                          <th>No.</th>
                          <th>Company</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {companies?.map((transaction, index) => (
                          <tr key={index}>
                              <td className='text-center w-10'>{index+1}</td>
                              <td>{transaction.name}</td>
                              <td>{transaction.status}</td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
          </Container>
    </>
  )
}
