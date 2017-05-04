import React from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Dialog from 'react-toolbox/lib/dialog';

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
    constructor(props) {
        super(props);
        //this.renderDialog = this.renderDialog.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
    }

    state = {
        active: false
    };

    handleToggle = () => {
        console.log("Toggling");
        this.setState({ active: !this.state.active });
    }

    actions = [
        { label: "Close", onClick: this.handleToggle },
    ];

    renderDialog = (item) => {
        console.log("Rendering: " + item.namNumber);
        return (
            <Dialog
                actions={this.actions}
                active={this.state.active}
                onEscKeyDown={this.handleToggle}
                onOverlayClick={this.handleToggle}
                title='Details'
            >
                <b>NAM Number:</b> {item.namNumber}<br />
                <b>Building:</b> {item.building}<br />
                <b>Room:</b> {item.room}<br />
                <b>VLAN:</b> {item.vlan}<br />
                <b>Department:</b> {item.department}<br />
                <b>Department Number:</b> {item.departmentNumber}<br />
                <b>Status:</b> {item.status}<br />
                <b>Caan Zone:</b> {item.caanZone}<br />
                <b>Billing ID:</b> {item.billingId}<br />
                <b>Division:</b> {item.division}<br />
            </Dialog>

        );
    }

    renderRow = (item) => {
        var source = "";
        if (item.status == "In Service") {
            source = "done";
        } else {
            source = "clear";
        }

        return (
            <TableRow key={item.namNumber} onClick={this.handleToggle.bind(this)}>
                <TableCell>{item.namNumber}</TableCell>
                <TableCell>{item.vlan}</TableCell>
                <TableCell>{item.building}</TableCell>
                <TableCell>{item.room}</TableCell>
                <TableCell><i className="material-icons">{source}</i></TableCell>
                {(this.renderDialog(item))}
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