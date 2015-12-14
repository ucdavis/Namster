export class FacetItem extends React.Component {
    componentDidMount() {
        var el = ReactDOM.findDOMNode(this)
        var checkboxes = el.getElementsByClassName("mdl-js-checkbox")
        componentHandler.upgradeElements(checkboxes, "MaterialCheckbox");
    }

    onChange(event) {
      
    }

    render() {
        return (
            <div className="facet-item">
              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                <input type="checkbox" className="mdl-checkbox__input" onChange={this.onChange.bind(this)} />
                <span className="mdl-checkbox__label">{this.props.name} ({this.props.count})</span>
              </label>
            </div>
        )
    }
}

export class FacetList extends React.Component {
    render() {
        return (
            <div className="">
                <h3>Buildings</h3>
                {this.props.facets.Building.Items.map(function(facet) {
                   return (
                      <FacetItem key={facet.Key} name={facet.Key} count={facet.DocCount} />
                   )
                })}
            </div>
        )
    }
}
