import React from 'react'
import { API } from '../../config/api';
import { Table, Container } from "react-bootstrap";
import { useQuery } from 'react-query';
export default function CompaniesComponent({ transactions }) {

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
                      <tr>
                          <th>Nama</th>
                          <th>Company</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {transactions?.map((transaction, index) => (
                          <tr key={index}>
                              <td>{transaction.nama}</td>
                              <td>{transaction.company}</td>
                              <td>{transaction.status}</td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
          </Container>
    </>
  )
}
