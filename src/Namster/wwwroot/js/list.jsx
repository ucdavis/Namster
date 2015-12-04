﻿var Nam = React.createClass({
    filterBuilding: function (e) {
        e.preventDefault();
        this.props.onFilter(this.props.data);
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td><a href="#" onClick={this.filterBuilding}>{this.props.data.title}</a></td>
                <td>{this.props.data.title}</td>
            </tr>
        );
    }
});

var NamList = React.createClass({
    handleFilter: function (nam) {
        this.props.onFilter(nam);
    },
    render: function () {
        var self = this;
        var namNodes = self.props.data.map(function(nam) {
            return (
                <Nam onFilter={self.handleFilter} key={nam.id} data={nam} />
            );
        });
        return (
            <table className="table">
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
    componentDidMount: function () {
        this.loadNamData();
    },
    loadNamData : function() {
        var self = this;
        self.setState({ spinning: true });
        window.setTimeout(function () {
            self.setState({ spinning: false });
        }, 1000);
    },
    handleFilter : function(nam) {
        this.loadNamData();
        console.log(nam);
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