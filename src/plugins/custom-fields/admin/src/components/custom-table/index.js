import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@strapi/design-system/Table';

const CustomTable = () => {
  const data = [
    { id: 1, name: 'Item 1', description: 'Descrição do Item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do Item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do Item 3' },
  ];

  return (
    <Table colCount={2} rowCount={data.length}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nome</Th>
          <Th>Descrição</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
