import React from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';

const NamModel = {
  namNumber: { type: Number },
  building: { type: String },
  room: { type: String },
  vlan: { type: String },
  department: { type: String },
  departmentNumber: { type: String },
  status: { type: String },
  caanZone: { type: String },
  billingId: { type: String },
  division: { type: String }
};

export default class ResultsTable extends React.Component {

  renderRow = (item) => (
    <TableRow key={item.namNumber}>
      <TableCell>{item.namNumber}</TableCell>
      <TableCell>{item.building}</TableCell>
      <TableCell>{item.room}</TableCell>
    </TableRow>
  );

  render() {
    return (
      <Table selectable={false}>
        <TableHead>
          <TableCell>NAM</TableCell>
          <TableCell>Building</TableCell>
          <TableCell>Room</TableCell>
        </TableHead>
        {this.props.results.map(this.renderRow)}
      </Table>
    );
  }
}
