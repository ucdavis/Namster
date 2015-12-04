var HelloView = React.createClass({
    render: function() {
        return (
            <h1>Hello, world!</h1>
        );
    }
});

ReactDOM.render(
    <HelloView />,
    document.getElementById('example')
);