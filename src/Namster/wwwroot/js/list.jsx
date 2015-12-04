var data = [{ id: 123, title: "abc" }, { id: 456, title: "def" }, { id: 789, title: "ghi" }];

var Nam = React.createClass({
    render: function () {
        console.log(this.props);
        return (
            <li>testing: {this.props.data.id} -- {this.props.data.title}</li>
        );
    }
});

var NamList = React.createClass({
    render: function () {
        var namNodes = this.props.data.map(function(nam) {
            return (
                <Nam data={nam} />
            );
        });
        return (
            <ul>{namNodes}</ul>
        );
    }
});

var ListView = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Showing NAMs for CA&ES Dean's Office</h1>
                <NamList data={this.props.data} />
            </div>
        );
    }
});

ReactDOM.render(
    <ListView data={data} />,
    document.getElementById('example')
);