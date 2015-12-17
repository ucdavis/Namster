import { getParameterByName } from '../../functions/location'

export class Nam extends React.Component{
    render() {
        var statusIcon = this.props.data.Status === 'In Service' ? 'fa fa-check text-success' : 'fa fa-close text-danger';
        return (
            <tr>
                <td>{this.props.data.NamNumber}</td>
                <td><a href={'/home/list?room=' + encodeURIComponent(this.props.data.Room) + '&building=' + encodeURIComponent(this.props.data.Building)}>{this.props.data.Room}</a></td>
                <td><a href={"/home/list?building=" + encodeURIComponent(this.props.data.Building)}>{this.props.data.Building}</a></td>
                <td><a href={"/home/list?department=" + encodeURIComponent(this.props.data.Department)}>{this.props.data.Department}</a></td>
                <td><a href={"/home/list?vlan=" + encodeURIComponent(this.props.data.Vlan)}>{this.props.data.Vlan}</a></td>
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

        var building = getParameterByName('building');
        var room = getParameterByName('room');
        var department = getParameterByName('department');
        var vlan = getParameterByName('vlan');

        var title = 'Showing NAMs for ';
        if (room && building){
          title += building + ' ' + room;
        } else if (building){
          title += building;
        } else  if (vlan) {
          title += vlan;
        } else if (department){
          title += department;
        }

        self.setState({ spinning: true, title: title });

        if (!building && !department && !vlan){
            self.setState({message: 'No field selected - go back to the homepage and start over', title: '' });
        } else {
            $.getJSON(`/search/filter?room=${encodeURIComponent(room)}&building=${encodeURIComponent(building)}&department=${encodeURIComponent(department)}&vlan=${encodeURIComponent(vlan)}`, function (data) {
                self.setState({ spinning: false, data: data });
            });
        }
    }
    render() {
        var content = <NamList data={this.state.data} />;
        if (this.state.spinning && this.state.title) {
            content = <i className="fa fa-spinner fa-pulse fa-4x"></i>;
        }

        var message = this.state.message ? <div className="alert alert-warning">{this.state.message}</div> : '';

        return (
            <div>
                <h2>{this.state.title}</h2>
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
