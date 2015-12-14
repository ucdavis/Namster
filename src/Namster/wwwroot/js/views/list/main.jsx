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
                <td><a href={"/home/list?field=Building&term=" + encodeURIComponent(this.props.data.Building)}>{this.props.data.Building}</a></td>
                <td><a href={"/home/list?field=Department&term=" + encodeURIComponent(this.props.data.Department)}>{this.props.data.Department}</a></td>
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
            message: '',
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

        var field = getParameterByName('field');
        var term = getParameterByName('term');

        console.log(field, term);

        if (!field || !term){
            self.setState({message: 'No field selected - go back to the homepage and start over'});
        } else {
            $.getJSON(`/search/filter?field=exact${field}&term=${encodeURIComponent(term)}`, function (data) {
                self.setState({ spinning: false, data: data });
            });
        }
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
        
        var message = this.state.message ? <div className="alert alert-warning">{this.state.message}</div> : '';

        return (
            <div>
                <h1>Showing NAMs for CA&ES Dean's Office</h1>
                {message}
                {content}
            </div>
        );
    }
}

ReactDOM.render(
    <ListView />,
    document.getElementById('example')
);