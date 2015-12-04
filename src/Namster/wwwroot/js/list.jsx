var Nam = React.createClass({
    render: function () {
        return (
            <li>testing: {this.props.data.id} -- {this.props.data.title}</li>
        );
    }
});

var NamList = React.createClass({
    render: function () {
        var namNodes = this.props.data.map(function(nam) {
            return (
                <Nam key={nam.id} data={nam} />
            );
        });
        return (
            <ul>{namNodes}</ul>
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
        var self = this;
        window.setTimeout(function () {
            self.setState({ spinning: false });
        }, 1000);
    },
    render: function() {
        var content = <NamList data={this.state.data} />;
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