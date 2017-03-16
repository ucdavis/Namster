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

    renderRow = (item) => {
        var source = "";
        if (item.status == "In Service") {
            source = "http://orig11.deviantart.net/4ffe/f/2015/059/9/0/checkmark_by_toast_horse-d8jwdb3.gif";
        } else {
            source = "http://orig14.deviantart.net/07ba/f/2015/059/6/4/x_by_toast_horse-d8jwdhf.gif";
        }
        return (
            <TableRow key={item.namNumber}>
                <TableCell>{item.namNumber}</TableCell>
                <TableCell>{item.building}</TableCell>
                <TableCell>{item.room}</TableCell>
                <TableCell><img src={source}></img></TableCell>
            </TableRow>
        );
    }

  render() {
    return (
      <Table selectable={false}>
        <TableHead>
          <TableCell>NAM</TableCell>
          <TableCell>Building</TableCell>
          <TableCell>Room</TableCell>
          <TableCell>Status</TableCell>
        </TableHead>
        {this.props.results.map(this.renderRow)}
      </Table>
    );
  }
}
