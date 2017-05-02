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
            source = "done";
        } else {
            source = "clear";
        }
        return (
            <TableRow key={item.namNumber}>
                <TableCell>{item.namNumber}</TableCell>
                <TableCell>{item.vlan}</TableCell>
                <TableCell>{item.building}</TableCell>
                <TableCell>{item.room}</TableCell>
                <TableCell><i className="material-icons">{source}</i></TableCell>
            </TableRow>
        );
    }

    render() {
        return (
            <Table selectable={false}>
                <TableHead>
                    <TableCell>NAM</TableCell>
                    <TableCell>VLAN</TableCell>
                    <TableCell>Building</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Status</TableCell>
                </TableHead>
                {this.props.results.map(this.renderRow)}
            </Table>
        );
    }
}
