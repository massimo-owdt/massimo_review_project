/**
 * Created by massimo on 7/27/15.
 */

/*NAMESPACE DEFINITION*/
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


/*MODELS*/
myapp.my_constructors.models.Item = Backbone.Model.extend({
    initialize: function(){
        console.log('A new item has been created');
    },
    defaults: {
        item_name: 'My Company LLC',
        item_review_count: 120,
        item_rating: 5,
        item_address: '1384 Testing Rd. Houston, TX',
        item_phone: '555 555 55 55',
        item_email: 'themail@gmail.com'
    }
});

myapp.my_constructors.models.Review = Backbone.Model.extend({
    initialize: function(){
        console.log('A new Review object has been created');
    },
    defaults: {
        review_number: 6666,
        review_title: 'Default Title',
        review_date: '00/00/0000',
        review_author: 'Francois Voltaire',
        review_pros: 'Default Pros',
        review_cons: 'Defualt Cons'
    }
});


/*REST SERVICE TEST MODEL*/
myapp.my_constructors.models.WPPost = Backbone.Model.extend({});




/*COLLECTIONS*/
myapp.my_constructors.collections.ItemsCollection = Backbone.Collection.extend({
    model: myapp.my_constructors.models.Item,
    initialize: function(){
        console.log('A new items collection has been initialized');

    }
});

myapp.my_constructors.collections.ReviewsCollection = Backbone.Collection.extend({
    model: myapp.my_constructors.models.Review,
    initialize: function(){
        console.log('A new review collection has been initialized');
    }
});

/*REST SERVICE TEST COLLECTION*/
myapp.my_constructors.collections.PostsColl = Backbone.Collection.extend({
    model: myapp.my_constructors.models.WPPost,
    url: 'http://eda.owdt.com/wordpress_1/wp-json/posts?type[]=movies'
});


/*VIEWS*/
myapp.my_constructors.views.Menu1 = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<h1>menu 1</h1>');
        return this;
    }
});

myapp.my_constructors.views.Menu2 = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<h2>menu 2</h2>');
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

myapp.my_constructors.views.SingleItem = Backbone.View.extend({
    initialize: function(){
        console.log('Single Item view initialized');
        this.render();
    },
    template: _.template($("#single_item_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .item_name': 'loadDetails'
    },
    loadDetails: function(){
        console.log('I have been clicked');

        myapp.my_objects.views.Details_1 = new myapp.my_constructors.views.ItemDetail_1({
            el: '#item_details_1',
            model: this.model
        });
    }
});

myapp.my_constructors.views.ListItemContainer = Backbone.View.extend({
    initialize: function(){
        console.log('List Item Container View initialized');
        this.render();
    },
    render: function(){
        _.each(this.collection.models, function(item){
            console.log(item.toJSON());
            var singleItemView = new myapp.my_constructors.views.SingleItem({model: item});
            this.$el.append(singleItemView.render().el);
        }, this);
    }
});

myapp.my_constructors.views.ItemDetail_1 = Backbone.View.extend({
    initialize: function(){
        console.log('Item detail 1 view has been initialized');

        /*setTimeout(this.render(), 3000);*/
        this.render();
    },
    template: _.template($("#details_1_template").html()),
    render: function(){
        this.showLoader();
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    showLoader: function(){
        console.log('the loader...');
        $('.loader').css({
            "display":"block"
        });
        setTimeout(function(){
            $('.loader').css({
                "display":"none"
            });
        }, 1000);


    }
});

myapp.my_constructors.views.SmallReview = Backbone.View.extend({
    initialize: function(){
        console.log('A small review view has been initialized');
        this.render();
    },
    template: _.template($("#small_review_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .review_title': 'loadDetails'
    },
    loadDetails: function(){
        console.log('I have been clicked');
        myapp.my_objects.views.Details_3 = new myapp.my_constructors.views.ItemDetail_3({
            el: '#item_details_3',
            model: this.model
        });
    }
});

myapp.my_constructors.views.ReviewListContainer = Backbone.View.extend({
    initialize: function(){
        console.log('Review List Item Container View initialized');
        this.render();
    },
    render: function(){
        _.each(this.collection.models, function(item){
            console.log(item.toJSON());
            var SmallReviewView = new myapp.my_constructors.views.SmallReview({model: item});
            this.$el.append(SmallReviewView.render().el);
        }, this);
    }
});

myapp.my_constructors.views.ItemDetail_3 = Backbone.View.extend({
    initialize: function(){
        console.log('Item detail 3 view has been initialized');
        this.render();
    },
    template: _.template($("#big_review_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});




/*ROUTER*/
myapp.my_constructors.router.AppRouter = Backbone.Router.extend({
    routes: {
        "menu1": "menu1Handler",
        "menu2": "menu2Handler",
        "menu3": "menu3Handler",
        "menu4": "menu4Handler",
        "": "defaultHandler"
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
        var tee = new myapp.my_constructors.models.Item();
        var col = new myapp.my_constructors.collections.ItemsCollection();
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
    },
    defaultHandler: function(){
        console.log('kkkkkk');

        var i1 = new myapp.my_constructors.models.Item({
            item_rating: 80,
            item_review_count: 200,
            item_phone: '666 666 66 66'
        });
        var i2 = new myapp.my_constructors.models.Item();
        var i3 = new myapp.my_constructors.models.Item({
            item_rating: 20,
            item_phone: '999 999 99 99'
        });
        var i4 = new myapp.my_constructors.models.Item({
            item_rating: 50
        });
        var i5 = new myapp.my_constructors.models.Item({
            item_rating: 46
        });

        myapp.my_objects.collections.collec = new myapp.my_constructors.collections.ItemsCollection();
        myapp.my_objects.collections.collec.add(i1);
        myapp.my_objects.collections.collec.add(i2);
        myapp.my_objects.collections.collec.add(i3);
        myapp.my_objects.collections.collec.add(i4);
        myapp.my_objects.collections.collec.add(i5);

        /*console.log(collec.toJSON());*/

        var vi = new myapp.my_constructors.views.ListItemContainer({
            el: '#list_container',
            collection: myapp.my_objects.collections.collec
        });



        console.log('ooooooo');
        var r = new myapp.my_constructors.models.Review();
        console.log(r);



        myapp.my_objects.collections.reviews = new myapp.my_constructors.collections.ReviewsCollection();
        var r1 = new myapp.my_constructors.models.Review();
        var r2 = new myapp.my_constructors.models.Review();
        var r3 = new myapp.my_constructors.models.Review();
        var r4 = new myapp.my_constructors.models.Review({
            review_author: 'Massimo Penzo',
            review_cons: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        });
        var r5 = new myapp.my_constructors.models.Review({
            review_number: 2222,
            review_cons: 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
        });
        var r6 = new myapp.my_constructors.models.Review();
        myapp.my_objects.collections.reviews.add(r1);
        myapp.my_objects.collections.reviews.add(r2);
        myapp.my_objects.collections.reviews.add(r3);
        myapp.my_objects.collections.reviews.add(r4);
        myapp.my_objects.collections.reviews.add(r5);
        myapp.my_objects.collections.reviews.add(r6);

        var vi2 = new myapp.my_constructors.views.ReviewListContainer({
            el: '#item_details_2',
            collection: myapp.my_objects.collections.reviews
        });


        var rest = new myapp.my_constructors.collections.PostsColl();

        rest.fetch({
            success: function(){
                console.log('SUCCESS!!');
            },
            error: function(){
                console.log('ERROR!!');
            }
        });
        console.log(rest);






    }
});

myapp.my_objects.router.APPRouter = new myapp.my_constructors.router.AppRouter;
Backbone.history.start();
