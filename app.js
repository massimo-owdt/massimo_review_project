/**
 * Created by massimo on 7/27/15.
 */


/*defining namespace for the app*/
var myapp = {
    my_constructors: {
        models: {},
        collections: {},
        views: {},
        router: {}
    },
    my_objects: {
        models: {},
        collections: {},
        views: {},
        router: {}
    }
};


console.log('backbone');


/*models constructors*/


/*collections constructors*/


/*views constructors*/
myapp.my_constructors.views.Menu1 = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<p>menu 1</p>');
        return this;
    }
});

myapp.my_constructors.views.Menu2 = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<p>menu 2</p>');
        return this;
    }
});

myapp.my_constructors.views.Menu3 = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<p>menu 3</p>');
        return this;
    }
});

myapp.my_constructors.views.Menu4 = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<p>menu 4</p>');
        return this;
    }
});


/*router*/
myapp.my_constructors.router.AppRouter = Backbone.Router.extend({
    routes: {
        "menu1":"menu1Handler",
        "menu2":"menu2Handler",
        "menu3":"menu3Handler",
        "menu4":"menu4Handler"
    },
    menu1Handler: function(){
        myapp.my_objects.views.testView = new myapp.my_constructors.views.Menu1({
            el: '#content'
        });
    },
    menu2Handler: function(){
        myapp.my_objects.views.testView2 = new myapp.my_constructors.views.Menu2({
            el: '#content'
        });
    },
    menu3Handler: function(){
        myapp.my_objects.views.testView3 = new myapp.my_constructors.views.Menu3({
            el: '#content'
        });
    },
    menu4Handler: function(){
        myapp.my_objects.views.testView4 = new myapp.my_constructors.views.Menu4({
            el: '#content'
        });
    }



});

myapp.my_objects.router.APPRouter = new myapp.my_constructors.router.AppRouter;
Backbone.history.start();
