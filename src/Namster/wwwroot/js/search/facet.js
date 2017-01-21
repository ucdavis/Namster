import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class Facet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedKey: props.selectedKey || ''
    };
  }

  _onCheck = (key, value) => {
    // if unchecking, clear selected key
    const selectedKey = value ? key : '';
    this.setState({
      selectedKey
    });

    if (this.props.onChange) {
      this.props.onChange(selectedKey);
    }
  }

  renderFacet(item) {
    const selected = (this.state.selectedKey === item.key);
    return (
      <Checkbox
        key={item.key}
        checked={selected}
        label={item.key}
        onChange={(value) => this._onCheck(item.key, value)}
      />
    );
  }

  render() {
    const { items } = this.props;

    return (
      <div className="">
        <h2>{this.props.subHeader}</h2>
        {items.map((item) => this.renderFacet(item))}
      </div>
    );
  }
}
