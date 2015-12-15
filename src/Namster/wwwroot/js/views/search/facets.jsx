export class FacetItem extends React.Component {
    componentDidMount() {
        var el = ReactDOM.findDOMNode(this)
        var checkboxes = el.getElementsByClassName("mdl-js-checkbox")
        componentHandler.upgradeElements(checkboxes, "MaterialCheckbox");
    }

    onChange(event) {
        this.props.onChange(event.target.checked)
    }

    render() {
        return (
            <li className="facet-item">
              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                <input type="checkbox" className="mdl-checkbox__input" onChange={this.onChange.bind(this)} />
                <span className="mdl-checkbox__label">{this.props.name} <span className="small">({this.props.count})</span></span>
              </label>
            </li>
        )
    }
}

export class FacetList extends React.Component {
    onChange(category, key, value) {
        this.props.onChange(category, key, value);
    }

    render() {
        var self = this;

        return (
            <div className="">
                <h3>Buildings</h3>
                <ul>
                {this.props.facets.Building.Items.map(function(facet) {
                   return (
                      <FacetItem key={facet.Key} name={facet.Key} count={facet.DocCount} onChange={self.onChange.bind(self, "building", facet.Key)} />
                   )
                })}
                </ul>
                <h3>Department</h3>
                <ul>
                {this.props.facets.Department.Items.map(function(facet) {
                   return (
                      <FacetItem key={facet.Key} name={facet.Key} count={facet.DocCount} onChange={self.onChange.bind(self, "department", facet.Key)} />
                   )
                })}
                </ul>
                <h3>VLAN</h3>
                <ul>
                {this.props.facets.VLAN.Items.map(function(facet) {
                   return (
                      <FacetItem key={facet.Key} name={facet.Key} count={facet.DocCount} onChange={self.onChange.bind(self, "vlan", facet.Key)} />
                   )
                })}
                </ul>
            </div>
        )
    }
}
