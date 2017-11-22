var Excel = React.createClass({
    displayName: 'Excel',
    propTypes: {
        headers: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        )
    },
    
    getInitialState: function() {
        return {
            data: this.props.initialData,
            sortby: null,
            descending: false
        };
    },

    _sort: function(e) {
        var c = e.target.cellIndex;
        var descending = this.state.sortby === c && !this.state.descending
        var data = this.state.data.slice();
        data.sort((r1, r2)=>{
            return descending
                ? (r1[c] > r2[c] ? 1: -1) : (r1[c] < r2[c] ? 1: -1);
        });
        this.setState({
            data: data,
            sortby: c,
            descending: descending
        });
    },
    
    render: function() {
        return (
            React.DOM.table(
                null,
                React.DOM.thead(
                    {onClick: this._sort},
                    React.DOM.tr(
                        null,
                        this.props.headers.map(function(title, idx) {
                            if (idx===this.state.sortby) {
                                title += this.state.descending ? ' \u2191' : ' \u2193'
                            }
                            return React.DOM.th({key: idx}, title);
                        }, this)
                    )
                ),
                React.DOM.tbody(
                    null,
                    this.state.data.map(function(row, idx) {
                        return React.DOM.tr(
                            {key: idx},
                            row.map(function(cell, idx) {
                                return React.DOM.td({key: idx}, cell);
                            })
                        );
                    })
                )
            )
        );
    }
});

var headers = [
    'タイトル', '著者', '言語', '出版年', '売上部数'
];

var data = [
    ['The Lord of the Rings', 'J. R. R. Tolkien', 'English', '1954–1955', '150 million'],
    ['Le Petit Prince (The Little Prince)', 'Antoine de Saint-Exupéry', 'French', '1943', '140 million'],
    ['Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', 'English', '1997', '107 million'],
    ['And Then There Were None', 'Agatha Christie', 'English', '1939', '100 million'],
    ['Dream of the Red Chamber', 'Cao Xueqin', 'Chinese', '1754–1791', '100 million'],
    ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
    ['She: A History of Adventure', 'H. Rider Haggard', 'English', '1887', '100 million'],
];

const myExcel = ReactDOM.render(
    React.createElement(
        Excel, {
            headers: headers,
            initialData: data,
        }
    ),
    document.getElementById('app')
);
