


var Router = Backbone.Router.extend({

  routes: {
    ':term/crn/:crn': 'sectionDetailRoute',
    ':term': 'deptListRoute',
    ':term/:dept': 'courseListRoute',
    ':term/:dept/:cid': 'courseDetailRoute',
    '*notFound': 'defaultRoute',
    '': 'defaultRoute'
  },
  deptListRoute: function(term){
    document.getElementById('rootContainer').innerHTML = '<a href="#/201509/ACC">' + term + '</a>';
  },
  courseListRoute: function(term, dept){
    document.getElementById('rootContainer').innerHTML = '<a href="#/201509/ACC/211">' + term + dept + '</a>';
  },
  courseDetailRoute: function(term, dept, cid){
    document.getElementById('rootContainer').innerHTML = '<a href="#/201509/crn/405145">' + term + dept + cid + '</a>';
  },
  sectionDetailRoute: function(term, crn){
    document.getElementById('rootContainer').innerHTML = '<a href="#">Section' + term + crn + '</a>';
  },
  defaultRoute: function(){
    document.getElementById('rootContainer').innerHTML = '<a href="#/201509">Select A Term</a>';
  }

});

var appRouter = new Router;
Backbone.history.start();