var Nam = React.createClass({
    filterBuilding: function (type, e) {
        e.preventDefault();
        this.props.onFilter(type, this.props.data);
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td><a href="#" onClick={this.filterBuilding.bind(this, 'building')}>{this.props.data.title}</a></td>
                <td><a href="#" onClick={this.filterBuilding.bind(this, 'department')}>{this.props.data.title}</a></td>
            </tr>
        );
    }
});

var NamList = React.createClass({
    handleFilter: function (type, nam) {
        this.props.onFilter(type, nam);
    },
    render: function () {
        var self = this;
        var namNodes = self.props.data.map(function(nam) {
            return (
                <Nam onFilter={self.handleFilter} key={nam.id} data={nam} />
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
});

var ListView = React.createClass({
    getInitialState: function () {
        return {
            data: [{ id: 123, title: "abc" }, { id: 456, title: "def" }, { id: 789, title: "ghi" }],
            spinning: true
        };
    },
    componentWillMount: function () {
        this.loadNamData();
    },
    componentDidMount: function () {
        console.log("did mount");
    },
    componentDidUpdate: function () {
        $('#datanams').dataTable();
    },
    loadNamData : function() {
        var self = this;
        self.setState({ spinning: true });
        $.getJSON('/search/filter?field=building&term=EVERSN', function (data) {
            console.log(data);
            self.setState({ spinning: false });

        });
    },
    handleFilter : function(type, nam) {
        this.loadNamData();
        console.log(type, nam);
    },
    render: function () {
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
});

ReactDOM.render(
    <ListView />,
    document.getElementById('example')
);