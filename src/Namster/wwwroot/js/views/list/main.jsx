import { getParameterByName } from '../../functions/location'

export class Nam extends React.Component{
    filterBuilding (type, e) {
        e.preventDefault();
        this.props.onFilter(type, this.props.data);
    }
    render() {
        return (
            <tr>
                <td>{this.props.data.NamNumber}</td>
                <td><a href="#" onClick={this.filterBuilding.bind(this, 'building') }>{this.props.data.Building}</a></td>
                <td><a href="#" onClick={this.filterBuilding.bind(this, 'department') }>{this.props.data.Department}</a></td>
            </tr>
        );
    }
}

export class NamList extends React.Component {
    handleFilter(type, nam) {
        this.props.onFilter(type, nam);
    }
    render() {
        var self = this;
        var namNodes = self.props.data.map(function(nam) {
            return (
                <Nam onFilter={self.handleFilter} key={nam.NamNumber} data={nam} />
            );
        });
        return (
            <table id="datanams" className="table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Building</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {namNodes}
                </tbody>
            </table>
        );
    }
}

export class ListView extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            spinning: true
        };
        
    }
    componentWillMount() {
        this.loadNamData();
    }
    componentDidMount() {
        console.log("did mount");
    }
    componentDidUpdate() {
        $('#datanams').dataTable({ paging: false });
    }
    loadNamData () {
        var self = this;
        self.setState({ spinning: true });

        var field = 'exact' + getParameterByName('field');
        var term = getParameterByName('term');

        $.getJSON(`/search/filter?field=${field}&term=${term}`, function (data) {
            self.setState({ spinning: false, data: data });
        });
    }
    handleFilter(type, nam) {
        this.loadNamData();
        console.log(type, nam);
    }
    render() {
        var content = <NamList onFilter={this.handleFilter} data={this.state.data} />;
        if (this.state.spinning) {
            content = <span>Spinner a spining</span>;
        }

        return (
            <div>
                <h1>Showing NAMs for CA&ES Dean's Office</h1>
                {content}
            </div>
        );
    }
}

ReactDOM.render(
    <ListView />,
    document.getElementById('example')
);