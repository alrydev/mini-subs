import React from 'react'
import { Table, Container } from "react-bootstrap";
export default function CompaniesComponent({ transactions }) {
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
