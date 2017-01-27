import React from 'react';
import { Table } from 'react-toolbox';

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

  render() {
    return (
      <Table
        model={NamModel}
        selectable={false}
        source={this.props.results}
      />
    );
  }
}
