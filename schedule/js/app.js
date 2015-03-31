var activeTerm = [];

var TermListView = Backbone.View.extend({

    render: function() {
        var html = ['<ul className="termList">'];
        for (var i = 0; i < terms.length; ++i){
          term = terms[i];
          html.push('<li><a href="#/' + term.term_code + '">' + term.term_desc + '</a></li>');
        }
        html.push('</ul>');
        document.getElementById('rootContainer').innerHTML = html.join("");
    }
});

var DeptListView = Backbone.View.extend({

    render: function(term) {
        var html = ['<ul deptName="termList">'];
        deptEntries = _.sortBy(departments, 'dept_name');
        for (var i = 0; i < deptEntries.length; ++i){
          dept = deptEntries[i];
          html.push('<li><a href="#/' + term + '/' + dept.dept_code + '">' + dept.dept_name + '</a></li>');
        }
        html.push('</ul>');
        document.getElementById('rootContainer').innerHTML = html.join("");
    }
});

var CourseListView = Backbone.View.extend({

    render: function(term, dept) {
        document.getElementById('rootContainer').innerHTML = '<a href="#/201509/ACC/211">' + term + dept + '</a>';
    }
});

var CourseDetailView = Backbone.View.extend({

    render: function(term, dept, cid) {
        document.getElementById('rootContainer').innerHTML = '<a href="#/201509/CRN/405145">' + term + dept + cid + '</a>';
    }
});

var SectionDetailView = Backbone.View.extend({

    render: function(term, crn) {
        document.getElementById('rootContainer').innerHTML = '<a href="#">Section' + term + crn + '</a>';
    }
});

var Router = Backbone.Router.extend({

  routes: {
    ':term/CRN/:crn': 'sectionDetailRoute',
    ':term': 'deptListRoute',
    ':term/:dept': 'courseListRoute',
    ':term/:dept/:cid': 'courseDetailRoute',
    '*notFound': 'defaultRoute',
    '': 'defaultRoute'
  },
  deptListRoute: function(term){
    this.deptListView = new DeptListView();
    this.deptListView.render(term);
  },
  courseListRoute: function(term, dept){
    this.courseListView = new CourseListView();
    this.courseListView.render(term, dept);
  },
  courseDetailRoute: function(term, dept, cid){
    this.courseDetialView = new CourseDetailView();
    this.courseDetialView.render(term, dept, cid);
  },
  sectionDetailRoute: function(term, crn){
    this.sectionDetailView = new SectionDetailView();
    this.sectionDetailView.render(term, crn);
  },
  defaultRoute: function(){
    this.termListView = new TermListView();
    this.termListView.render();
  }

});

var appRouter = new Router;
Backbone.history.start();