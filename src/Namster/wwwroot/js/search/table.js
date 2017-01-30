import React from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';

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

  renderRow(item) {
    return (
      <TableRow key={item.namNumber}>
        <TableCell>{item.namNumber}</TableCell>
      </TableRow>
    );
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHead>
          <TableCell>NAM</TableCell>
        </TableHead>
        {this.props.results.map(this.renderRow)}
      </Table>
    );
  }
}
