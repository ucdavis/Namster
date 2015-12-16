import { getParameterByName } from '../../functions/location'

export class Nam extends React.Component{
    render() {
        var statusIcon = this.props.data.Status === 'In Service' ? 'fa fa-check text-success' : 'fa fa-close text-danger';
        return (
            <tr>
                <td>{this.props.data.NamNumber}</td>
                <td>{this.props.data.Room}</td>
                <td><a href={"/home/list?field=Building&term=" + encodeURIComponent(this.props.data.Building)}>{this.props.data.Building}</a></td>
                <td><a href={"/home/list?field=Department&term=" + encodeURIComponent(this.props.data.Department)}>{this.props.data.Department}</a></td>
                <td><a href={"/home/list?field=vlan&term=" + encodeURIComponent(this.props.data.Vlan)}>{this.props.data.Vlan}</a></td>
                <td><i className={statusIcon}></i> {this.props.data.Status}</td>
            </tr>
        );
    }
}

export class NamList extends React.Component {
    render() {
        var self = this;
        var namNodes = self.props.data.map(function(nam) {
            return (
                <Nam key={nam.NamNumber} data={nam} />
            );
        });
        return (
            <table id="datanams" className="table table-striped">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Room</th>
                        <th>Building</th>
                        <th>Department</th>
                        <th>Vlan</th>
                        <th>Status</th>
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
    componentDidUpdate() {
        $('#datanams').dataTable({
            paging: false,
            "language": {
                "search": "Filter:"
            }
        });
    }
    loadNamData () {
        var self = this;

        var field = getParameterByName('field');
        var term = getParameterByName('term');

        self.setState({ spinning: true, field: field, term: term });

        if (!field || !term){
            self.setState({message: 'No field selected - go back to the homepage and start over'});
        } else {
            if (field !== 'vlan'){ //TODO: get rid of hackery for index names
                field = "exact" + field;
            }

            $.getJSON(`/search/filter?field=${field}&term=${encodeURIComponent(term)}`, function (data) {
                self.setState({ spinning: false, data: data });
            });
        }
    }
    render() {
        var content = <NamList data={this.state.data} />;
        if (this.state.spinning) {
            content = <i className="fa fa-spinner fa-pulse fa-4x"></i>;
        }

        var message = this.state.message ? <div className="alert alert-warning">{this.state.message}</div> : '';

        return (
            <div>
                <h2>Showing NAMs for the {this.state.field} {this.state.term}</h2>
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
