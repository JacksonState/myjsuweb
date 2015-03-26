React.initializeTouchEvents(true);

var Term = React.createClass({
  render: function(){
    return(
      <li className="term">
        <div className="termCode">
          {this.props.data.term_desc}
        </div>
      </li>
    );
  }
});

var TermList = React.createClass({
  loadTermsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data){
        this.setState({terms: data.terms});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {terms: []};
  },
  componentDidMount: function(){
    this.loadTermsFromServer();
  },
  render: function(){
    return(
      <div className="termList">
        {this.state.terms.map(function(term){
          return <Term key={term.term_code} data={term}/>;
        })}
      </div>
    );
  }
});

// Below is an example of another way to implement TermList
/* var TermList = React.createClass({
  render: function(){
    var termNodes = this.props.terms.map(function(term){
      return(
        <Term key={term.term_code} termCode={term.term_code}>
          {term.term_desc}
        </Term>
      );
    });
    return(
      <div className="termList">
        {termNodes}
      </div>
    );
  }
}); */

var DeptList = React.createClass({
  render: function(){
    return(
      <div className="deptList">
        Hello, World! I am a DeptList.
      </div>
    );
  }
});

var CourseList = React.createClass({
  render: function(){
    return(
      <div className="courseList">
        Hello, World! I am a CourseList.
      </div>
    );
  }
});


React.render(
  <TermList url="data/termDept.json" />,
  document.getElementById('rootContainer')
);