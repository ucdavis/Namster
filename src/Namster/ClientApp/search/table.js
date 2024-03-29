import React from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Dialog from 'react-toolbox/lib/dialog';
import ProgressBar from 'react-toolbox/lib/progress_bar';

export default class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this)
    }

    state = {
        active: false
    };

    handleToggle = (item) => {
        console.log("Toggling ", item);
        if (item === null) {
            this.setState({ selectedNam: null });
        } else {
            this.setState({ selectedNam: item });
        }
    }

    actions = [
        { label: "Close", onClick: () => this.handleToggle(null) },
    ];

    renderDialog = (item) => {
        return (
            <Dialog
                actions={this.actions}
                active={this.state.selectedNam === item.namNumber}
                onEscKeyDown={() => this.handleToggle(null)}
                onOverlayClick={() => this.handleToggle(null)}
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
                <b>Id:</b> {item.id}<br/>
                <b>Division:</b> {item.division}<br />
                <b>Subnet:</b> {item.subnet}<br />
                <b>Mask:</b> {item.mask}<br/>
                <b>Tech Contact:</b> {item.techContact} <br />
                <b>Email:</b> {item.email} <br/>
                <b>Phone:</b> {item.phone}
            </Dialog>

        );
    }

    renderHighlights = (highlights, index) => {
        const keys = Object.keys(highlights[index]);
        let highlightedObjects = {
            highlightedBuilding: null,
            highlightedRoom: null
        }

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "room") {
                highlightedObjects.highlightedRoom = highlights[index].room[0];
            }
    
            if (keys[i] === "building" || keys[i] === "department") {
                highlightedObjects.highlightedBuilding = highlights[index].building !== undefined
                ? highlights[index].building[0]
                : highlights[index].department[0];
            }
        }

        return highlightedObjects;
    }

    renderRow = (item, index) => {
        var source = ""; 
        const highlights = this.props.highlights;
        const { highlightedBuilding, highlightedRoom } = this.renderHighlights(highlights, index);

        if (item.status === "In Service") {
            source = "done";
        } else {
            source = "clear";
        }
        return (
            <TableRow key={item.namNumber} onClick={() => this.handleToggle(item.namNumber)}>
                <TableCell>{item.namNumber}</TableCell>
                <TableCell>{item.vlan}</TableCell>
                {highlightedBuilding !== null ? 
                    <TableCell>
                        <div dangerouslySetInnerHTML={{ __html: highlightedBuilding }} />
                    </TableCell> : 
                    <TableCell>{item.building}</TableCell>}
                {highlightedRoom !== null ? 
                    <TableCell>
                        <div dangerouslySetInnerHTML={{ __html: highlightedRoom }} />
                    </TableCell> : 
                    <TableCell>{item.room}</TableCell>}
                <TableCell><i className="material-icons">{source}</i></TableCell>
                {(this.renderDialog(item))}
            </TableRow>
        );
    }

    render() {
        if (this.props.displaySpinner === true) {
            return (<center><ProgressBar type='circular' mode='indeterminate' multicolor /></center>);
        }
        if (this.props.results.length === 0) {
            return (<div><center><h3>No NAMs found</h3></center></div>);
        } else {
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
}
