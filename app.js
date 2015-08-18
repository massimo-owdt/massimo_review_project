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
myapp.my_constructors.models.Client = Backbone.Model.extend({
    initialize: function(){
        /*registering some events for this model*/
        this.on("change", this.model_change, this);
    },
    defaults: {
        "clientId": 0,
        "clientName": "default name",
        "clientAddress": "default address",
        "clientPhone": "default phone",
        "clientEmail": "default mail",
        "clientWebsite": "default website",
        "clientCreatedDate": "default created date",
        "createdByBusinessId": 0
    },
    model_change: function(){
    }
});

myapp.my_constructors.models.Review = Backbone.Model.extend({
    initialize: function(){},
    defaults: {
        "reviewId": 0,
        "reviewTitle": "default title",
        "reviewDate": "default date",
        "businessId": 0,
        "reviewPros": "default pros",
        "reviewCons": "default cons",
        "clientId": 0,
        "reviewAttr1": 0,
        "reviewAttr2": 0,
        "reviewAttr3": 0,
        "reviewAttr4": 0,
        "reviewAttr5": 0,
        "reviewWatchCount": 0,
        "reviewUsefulCount": 0,
        "reviewNotUsefulCount": 0
    }
});


myapp.my_constructors.models.Business = Backbone.Model.extend({
    initialize: function(){},
    defaults: {
        "businessId": 0,
        "businessName": "default name",
        "businessAddress": "default address",
        "businessPhone": "default phone",
        "businessEmail": "default email",
        "industryId": 0,
        "createdDate": "default date",
        "businessWebsite": "default website",
        "active": 0
    }
});

myapp.my_constructors.models.Industry = Backbone.Model.extend({
    initialize: function(){},
    defaults: {
        industryId: "0",
        industryName: "no name"
    }
});



/*COLLECTIONS*/
myapp.my_constructors.collections.ClientsCollection = Backbone.Collection.extend({
    model: myapp.my_constructors.models.Client,
    initialize: function(){},
    url: "http://localhost:8080/reviews/api/rest/clients"
});

myapp.my_constructors.collections.ReviewsCollection = Backbone.Collection.extend({
    model: myapp.my_constructors.models.Review,
    initialize: function(){
        console.log('a new review collection has been initialized');
    },
    url: "http://localhost:8080/reviews/api/rest/reviews"
});

myapp.my_constructors.collections.IndustriesCollection = Backbone.Collection.extend({
    model: myapp.my_constructors.models.Industry,
    initialize: function(){
        console.log('a new industry collection has been created');
    }
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
    template: _.template($("#login_form_template").html()),
    render: function(){
        this.$el.html(this.template);
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

myapp.my_constructors.views.SingleClient = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template($("#single_item_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.$('.rateYo').rateYo({
            rating: this.model.get("Avg_total"),
            /*rating: 2.5,*/
            /*maxValue: 5,*/
            precision: 0,
            starWidth: "20px",
            normalFill: "#A0A0A0",
            ratedFill: "#E74C3C",
            numStars: 5,
            halfStar: true,
            readOnly: true
            /*spacing: "2px"*/
        });
        return this;
    },
    events: {
        'click .item_name': 'loadDetails',
        'click .item_add_review': 'add_review'
    },
    loadDetails: function(){

        $(this.$('.list_item')).css({
            "background-color":"rgba(255,212,84,0.2)"
        });


        new myapp.my_constructors.views.ItemDetail_1({
            el: '#item_details_1',
            model: this.model
        });

        new myapp.my_constructors.views.ReviewListFilters({
            el: '#reviews_header'
        });

        $('#reviews_list').html('');
        $('#item_details_3').html('');

        var id = this.model.get("clientId");
        var filtered_reviews = myapp.my_objects.collections.ReviewsCollection.where({clientId: id});
        var filt = new myapp.my_constructors.collections.ReviewsCollection();
        filt.add(filtered_reviews);

        console.log(JSON.stringify(filtered_reviews));


        new myapp.my_constructors.views.ReviewListContainer({
            el: '#reviews_list',
            collection: filt
        });

        NProgress.start();
        NProgress.done();
    },
    add_review: function(){
        console.log('review added');
        NProgress.start();
        NProgress.done();

        myapp.my_objects.views.Add_Review = new myapp.my_constructors.views.AddReview({
            el: '#item_details_3',
            model: this.model
        });
    }
});

myapp.my_constructors.views.ListItemContainer = Backbone.View.extend({
    initialize: function(){
        console.log('List Client Container View initialized');
        this.render();
    },
    render: function(){

        this.collection.each(function(model){
            var SingleClientView = new myapp.my_constructors.views.SingleClient({
                model: model
            });
            this.$el.append(SingleClientView.render().el);
        }, this);

    },
    events: {
        'click .sort': 'sort_by_name'
    },
    sort_by_name: function(){
        this.collection.models.sort(function(a, b){
            var nameA = a.attributes.item_name.toLowerCase();
            var nameB = b.attributes.item_name.toLowerCase();
            if (nameA < nameB){
                return -1;
            } //sort string ascending
            if (nameA > nameB){
                return 1;
            }
            return 0; //default return value (no sorting)
        });
        console.log(JSON.stringify(this.collection.models));
        this.clean_view();
        this.render();
    },
    sort_by_rating: function(){
        this.collection.models.sort(function(a, b){
            return a.attributes.item_rating - b.attributes.item_rating
        });
        console.log(JSON.stringify(this.collection.models));
        this.clean_view();
        this.render();
    },
    clean_view: function(){
        this.$el.html('');
    }
});

myapp.my_constructors.views.ItemDetail_1 = Backbone.View.extend({
    initialize: function(){
        console.log('Client detail 1 view has been initialized');
        this.render();
    },
    template: _.template($("#details_1_template").html()),
    render: function(){
        this.showLoader();
        this.$el.html(this.template(this.model.toJSON()));
        this.showChart();
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
        }, 1200);
    },
    showChart: function(){
        console.log('showing chart');

        /*CHART #1*/
        var data = {
            labels: ["ATTR_1", "ATTR_2", "ATTR_3", "ATTR_4", "ATTR_5"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(0,0,0,0.1)",
                    strokeColor: "#FD8008",
                    pointColor: "#FD8008",
                    pointStrokeColor: "#FD8008",
                    pointHighlightFill: "#000000",
                    pointHighlightStroke: "#000000",
                    data: [
                        this.model.get("Avg_reviewAttr1"),
                        this.model.get("Avg_reviewAttr2"),
                        this.model.get("Avg_reviewAttr3"),
                        this.model.get("Avg_reviewAttr4"),
                        this.model.get("Avg_reviewAttr5")
                    ]
                }
            ]
        };
        var ctx = document.getElementById("myChart").getContext("2d");
        var myRadarChart = new Chart(ctx).Radar(data);

        /*CHART #2*/
        var data2 = {
            labels: /*["January", "February", "March", "April", "May", "June"]*/ this.model.get("Months") ,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(0,0,0,0.1)",
                    strokeColor: "#000000",
                    pointColor: "#000000",
                    pointStrokeColor: "#000000",
                    pointHighlightFill: "#000000",
                    pointHighlightStroke: "#000000",
                    data: this.model.get("Time_series")
                }/*,
                 {
                 label: "My Second dataset",
                 fillColor: "rgba(151,187,205,0.2)",
                 strokeColor: "rgba(151,187,205,1)",
                 pointColor: "rgba(151,187,205,1)",
                 pointStrokeColor: "#fff",
                 pointHighlightFill: "#fff",
                 pointHighlightStroke: "rgba(151,187,205,1)",
                 data: [28, 48, 4, 19, 8, 27, 9]
                 }*/
            ]
        };

        var ctx2 = document.getElementById("myChart2").getContext("2d");
        var myLineChart = new Chart(ctx2).Line(data2, {
            bezierCurve: false
        });

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
        /*console.log('I have been clicked');*/
        $(this.$('.review_item')).css({
            /*"background-color":"rgba(251,46,69,0.2)",*/
            "background-color":"rgba(255,212,84,0.2)"
        });

        $(this.$('#item_details_3')).html("");
        new myapp.my_constructors.views.ItemDetail_3({
            el: '#item_details_3',
            model: this.model
        });
        NProgress.start();
        NProgress.done();
    }
});

myapp.my_constructors.views.ReviewListContainer = Backbone.View.extend({
    initialize: function(){
        console.log('Review List Client Container View initialized');
        this.render();
    },
    render: function(){

        this.collection.each(function(model){
            var SmallReviewView = new myapp.my_constructors.views.SmallReview({
                model: model
            });
            this.$el.append(SmallReviewView.render().el);
        }, this);

    },
    events: {
        'click .sort_date': 'sort_by_date'
    },
    sort_by_date: function(){
        this.collection.models.sort(function(a, b){
            var dateA = new Date(a.attributes.review_date);
            console.log(dateA);
            var dateB = new Date(b.attributes.review_date);
            return dateB-dateA; //sort by date ascending
        });
        this.clean_view();
        this.render();
    },
    clean_view: function(){
        this.$el.html('');
    }

});

myapp.my_constructors.views.ItemDetail_3 = Backbone.View.extend({
    initialize: function(){
        console.log('Client detail 3 view has been initialized');
        this.render();
    },
    template: _.template($("#big_review_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.showChart();
        return this;
    },
    events: {
        'click .useful': 'add_useful',
        'click .not_useful': 'add_not_useful'
    },
    showChart: function(){
        console.log('showing chart');
        var data3 = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(0,0,0,0.1)",
                    strokeColor: "#000000",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [1, 2, 3, 4, 5, 2, 4]
                }
            ]
        };

        var chart3options = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.2)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: false,

            //Boolean - If there is a stroke on each bar
            barShowStroke : true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 3,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 5,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 5,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

        };

        /*var ctx3 = document.getElementById("myChart3").getContext("2d");
         var myBarChart = new Chart(ctx3).Bar(data3, chart3options);*/
    },
    add_useful: function(){
        console.log('useful count has been increased');
    },
    add_not_useful: function(){
        console.log('NOT useful count has been increased');
    }
});

myapp.my_constructors.views.AddReview = Backbone.View.extend({
    initialize: function(){
        console.log('Add Review VIEW initialized');
        this.render();
    },
    template: _.template($("#add_review_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click #add_review_button': 'addReview'
    },
    addReview: function(){

        var new_review = new myapp.my_constructors.models.Review();
        new_review.set({
            /*review_number: 6666,*/     /*note: this property is not set because is handled by the database (autoincrement)*/
            review_title: $(this.$("[name='review_title']")).val(),
            review_date: Date.now(),
            review_author: $(this.$("[name='review_author']")).val(),
            review_pros: $(this.$("[name='review_pros']")).val(),
            review_cons: $(this.$("[name='review_cons']")).val(),
            review_watch_count: '0',
            review_comments_count: '0',
            review_useful_count: '0',
            review_not_useful_count: '0',


            review_attr_1: $(this.$("input[name='attr1']:checked")).val(),
            review_attr_2: $(this.$("input[name='attr2']:checked")).val(),
            review_attr_3: $(this.$("input[name='attr3']:checked")).val(),
            review_attr_4: $(this.$("input[name='attr4']:checked")).val(),
            review_attr_5: $(this.$("input[name='attr5']:checked")).val()
        });

        console.log(JSON.stringify(new_review));

        var jqXHR4 = $.ajax(
            {
                url:"http://localhost:8080/reviews/api/rest/add_review",
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(new_review)
            }
        );

        jqXHR4.done(function(data){
            console.log(data);
        });
    }
});

myapp.my_constructors.views.ClientListFilters = Backbone.View.extend({
    initialize: function(){
        console.log('Client list filters view initialized');
        this.render();
    },
    template: _.template($("#client_filters_template").html()),
    render: function(){
        this.$el.html(this.template);
        return this;
    },
    events: {
        'click #clients_f1': 'sort_by_name_desc',
        'click #clients_f2': 'sort_by_name_asc',
        'click #clients_f3': 'sort_by_rating_desc',
        'click #clients_f4': 'sort_by_rating_asc'
    },
    sort_by_name_desc: function(){

        myapp.my_objects.collections.Items_sorted_name_desc  = myapp.my_objects.collections.ClientsCollection.clone();
        console.log(JSON.stringify(myapp.my_objects.collections.Items_sorted_name_desc));

        myapp.my_objects.collections.Items_sorted_name_desc.models.sort(function(a, b){
            var nameA = a.attributes.clientName.toLowerCase();
            var nameB = b.attributes.clientName.toLowerCase();
            if (nameA < nameB){
                return -1;
            } //sort string ascending
            if (nameA > nameB){
                return 1;
            }
            return 0; //default return value (no sorting)
        });

        /*cleaning view before new rendering*/
        $('#clients_list').html('');

        new myapp.my_constructors.views.ListItemContainer({
            el: '#clients_list',
            collection: myapp.my_objects.collections.Items_sorted_name_desc
        });
    },
    sort_by_name_asc: function(){
        myapp.my_objects.collections.Items_sorted_name_asc  = myapp.my_objects.collections.ClientsCollection.clone();
        console.log(JSON.stringify(myapp.my_objects.collections.Items_sorted_name_asc));

        myapp.my_objects.collections.Items_sorted_name_asc.models.sort(function(a, b){
            var nameA = a.attributes.clientName.toLowerCase();
            var nameB = b.attributes.clientName.toLowerCase();
            if (nameA > nameB){
                return -1;
            } //sort string ascending
            if (nameA < nameB){
                return 1;
            }
            return 0; //default return value (no sorting)
        });
        console.trace();
        /*cleaning view before new rendering*/
        $('#clients_list').html('');

        new myapp.my_constructors.views.ListItemContainer({
            el: '#clients_list',
            collection: myapp.my_objects.collections.Items_sorted_name_asc
        });
    },
    sort_by_rating_desc: function(){
        //TODO to make it work we need to add a rating attribute to the client model

        myapp.my_objects.collections.Items_sorted_rating_desc  = myapp.my_objects.collections.collec.clone();
        myapp.my_objects.collections.Items_sorted_rating_desc.models.sort(function(a, b){
            return b.attributes.item_rating - a.attributes.item_rating
        });

        /*cleaning view before new rendering*/
        $('#clients_list').html('');


        new myapp.my_constructors.views.ListItemContainer({
            el: '#clients_list',
            collection: myapp.my_objects.collections.Items_sorted_rating_desc
        });
    },
    sort_by_rating_asc: function(){
        //TODO to make it work we need to add a rating attribute to the client model

        myapp.my_objects.collections.Items_sorted_rating_asc  = myapp.my_objects.collections.collec.clone();
        myapp.my_objects.collections.Items_sorted_rating_asc.models.sort(function(a, b){
            return a.attributes.item_rating - b.attributes.item_rating
        });

        /*cleaning view before new rendering*/
        $('#clients_list').html('');

        new myapp.my_constructors.views.ListItemContainer({
            el: '#clients_list',
            collection: myapp.my_objects.collections.Items_sorted_rating_asc
        });
    }
});

myapp.my_constructors.views.ReviewListFilters = Backbone.View.extend({
    initialize: function () {
        console.log('Review list filters view initialized');
        this.render();
    },
    template: _.template($("#review_filters_template").html()),
    render: function () {
        this.$el.html(this.template);
        return this;
    },
    events: {
        'click #reviews_f1': 'sort_older_first',
        'click #reviews_f2': 'sort_newest_first',
        'click #reviews_f3': 'sort_most_seen_first',
        'click #reviews_f4': 'sort_most_useful_first'
    },
    sort_older_first: function () {
        myapp.my_objects.collections.Reviews_sorted_oldest_first = myapp.my_objects.collections.reviews.clone();
        console.log(JSON.stringify(myapp.my_objects.collections.Reviews_sorted_oldest_first));

        myapp.my_objects.collections.Reviews_sorted_oldest_first.models.sort(function(a, b){
                var dateA = new Date(a.attributes.review_date);
                console.log(dateA);
                var dateB = new Date(b.attributes.review_date);
                return dateA-dateB; //sort by date ascending
            }
        );

        /*cleaning view before new rendering*/
        $('#reviews_list').html('');

        var r = new myapp.my_constructors.views.ReviewListContainer({
            el: '#reviews_list',
            collection: myapp.my_objects.collections.Reviews_sorted_oldest_first
        });
    },
    sort_newest_first: function(){
        myapp.my_objects.collections.Reviews_sorted_newest_first = myapp.my_objects.collections.reviews.clone();
        console.log(JSON.stringify(myapp.my_objects.collections.Reviews_sorted_newest_first));

        myapp.my_objects.collections.Reviews_sorted_newest_first.models.sort(function(a, b){
                var dateA = new Date(a.attributes.review_date);
                console.log(dateA);
                var dateB = new Date(b.attributes.review_date);
                return dateB-dateA; //sort by date ascending
            }
        );

        /*cleaning view before new rendering*/
        $('#reviews_list').html('');

        var r = new myapp.my_constructors.views.ReviewListContainer({
            el: '#reviews_list',
            collection: myapp.my_objects.collections.Reviews_sorted_newest_first
        });
    },
    sort_most_seen_first: function(){
        myapp.my_objects.collections.reviews.models.sort(function(a, b){
            return b.attributes.review_watch_count - a.attributes.review_watch_count
        });

        /*cleaning view before new rendering*/
        $('#reviews_list').html('');

        var r = new myapp.my_constructors.views.ReviewListContainer({
            el: '#reviews_list',
            collection: myapp.my_objects.collections.reviews
        });
    },
    sort_most_useful_first: function(){
        myapp.my_objects.collections.reviews.models.sort(function(a, b){
            return b.attributes.review_useful_count - a.attributes.review_useful_count
        });

        /*cleaning view before new rendering*/
        $('#reviews_list').html('');

        var r = new myapp.my_constructors.views.ReviewListContainer({
            el: '#reviews_list',
            collection: myapp.my_objects.collections.reviews
        });
    }

});

myapp.my_constructors.views.Search = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template($("#search_template").html()),
    render: function(){
        this.$el.html(this.template);
        return this;
    },
    events: {
        'keyup #search_box': 'search_collection'
    },
    search_collection: function(){

        if ($('#search_box').val() === "") {

            $('#clients_list').html('');
            new myapp.my_constructors.views.ListItemContainer({
                el: '#clients_list',
                collection: myapp.my_objects.collections.ClientsCollection
            });
        } else {

            var str = $('#search_box').val();

            var x = JSON.stringify(myapp.my_objects.collections.ClientsCollection.models);
            console.log(JSON.stringify(x));

            var y = JSON.parse(x);
            console.log(y);

            var options = {
                keys: ['clientName', 'clientAddress', 'clientEmail'],
                caseSensitive: false,
                includeScore: false,
                shouldSort: true,
                location: 0,
                threshold: 0.6,
                distance: 100,
                maxPatternLength: 32
            };

            var f = new Fuse(y, options);
            var result = f.search(str);

            console.log(result);

            if (result.length == 0) {
                new myapp.my_constructors.views.Confused({
                    el: '#clients_list'
                });
            } else {
                var temp_coll = new myapp.my_constructors.collections.ClientsCollection();
                result.forEach(function(w){
                    var i = new myapp.my_constructors.models.Client({
                        clientName: w.clientName,
                        item_review_count: w.item_review_count,
                        item_rating: w.item_rating,
                        item_address: w.item_address,
                        item_phone: w.item_phone,
                        item_email: w.item_email
                    });
                    temp_coll.add(i);
                });

                $('#clients_list').html('');

                new myapp.my_constructors.views.ListItemContainer({
                    el: '#clients_list',
                    collection: temp_coll
                });
            }
        }
    }
});

myapp.my_constructors.views.Confused = Backbone.View.extend({
    initialize: function(){
        console.log('A new CONFUSED view has been created');
        this.render();
    },
    template: _.template($("#confused_template").html()),
    render: function(){
        this.$el.html(this.template);
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
        console.log($.isEmptyObject(myapp.my_objects.collections.ClientsCollection));
    },
    defaultHandler: function(){

        myapp.my_objects.collections.ClientsCollection = new myapp.my_constructors.collections.ClientsCollection();
        myapp.my_objects.collections.ClientsCollection.fetch({
            reset: true,
            success: function(response){

                console.log('SUCCESS');
                console.log(JSON.stringify(response));

                myapp.my_objects.collections.ReviewsCollection = new myapp.my_constructors.collections.ReviewsCollection();
                myapp.my_objects.collections.ReviewsCollection.fetch({
                    reset: true,
                    success: function(response){

                        console.log('SUCCESS');
                        console.log(JSON.stringify(response));

                        myapp.my_objects.collections.ClientsCollection = AvgRatings(myapp.my_objects.collections.ClientsCollection,
                            myapp.my_objects.collections.ReviewsCollection);

                        TimeSeries();


                    },
                    error: function(){
                        console.log('ERROR');
                    }

                });


                /*initializing sub-views of panel 1*/
                new myapp.my_constructors.views.ClientListFilters({
                    el: '#clients_header'
                });
                new myapp.my_constructors.views.ListItemContainer({
                    el: '#clients_list',
                    collection: myapp.my_objects.collections.ClientsCollection
                });
            },
            error: function(){
                console.log('ERROR');
            }

        });

        new myapp.my_constructors.views.Search({
            el: '#search_area'
        });

    }
});


myapp.my_objects.router.APPRouter = new myapp.my_constructors.router.AppRouter;
Backbone.history.start();

function AvgRatings(clients, reviews){

    var clients_temp = clients.clone();

    clients_temp.each(function(model){

        var model_reviews = reviews.where({clientId: model.get("clientId")});

        // ATTRIBUTE 1
        var sum_1 = model_reviews.reduce(function(memo, model){
            return memo + model.get("reviewAttr1");
        }, 0);
        var avg_1 = sum_1 / model_reviews.length;
        model.set("Avg_reviewAttr1", avg_1);

        // ATTRIBUTE 2
        var sum_2 = model_reviews.reduce(function(memo, model){
            return memo + model.get("reviewAttr2");
        }, 0);
        var avg_2 = sum_2 / model_reviews.length;
        model.set("Avg_reviewAttr2", avg_2);

        // ATTRIBUTE 3
        var sum_3 = model_reviews.reduce(function(memo, model){
            return memo + model.get("reviewAttr3");
        }, 0);
        var avg_3 = sum_3 / model_reviews.length;
        model.set("Avg_reviewAttr3", avg_3);

        // ATTRIBUTE 4
        var sum_4 = model_reviews.reduce(function(memo, model){
            return memo + model.get("reviewAttr4");
        }, 0);
        var avg_4 = sum_4 / model_reviews.length;
        model.set("Avg_reviewAttr4", avg_4);

        // ATTRIBUTE 5
        var sum_5 = model_reviews.reduce(function(memo, model){
            return memo + model.get("reviewAttr5");
        }, 0);
        var avg_5 = sum_5 / model_reviews.length;
        model.set("Avg_reviewAttr5", avg_5);


        // TOTAL RATING
        var total_average = (avg_1 + avg_2 + avg_3 + avg_4 + avg_5) / 5;
        model.set("Avg_total", total_average);
        /*console.log(JSON.stringify(model));*/




        // TEMPORAL PERFORMANCE

        /*console.log("XXX" + JSON.stringify(model_reviews));*/
        var now = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var time_frame = [
            monthNames[now.getMonth()-5], // m1
            monthNames[now.getMonth()-4], // m2
            monthNames[now.getMonth()-3], // m3
            monthNames[now.getMonth()-2], // m4
            monthNames[now.getMonth()-1], // m5
            monthNames[now.getMonth()]    // m6
        ];


        /*MONTH 1*/
        var reviews_m1 = model_reviews.filter(function(element){
            return new Date(element.get("reviewDate")).getMonth() == (now.getMonth());
        });
        // ATTRIBUTE 1
        var sum_m1_att1 = reviews_m1.reduce(function(memo, model){
            return memo + model.get("reviewAttr1");
        }, 0);
        var avg_m1_att1 = sum_m1_att1 / reviews_m1.length;

        // ATTRIBUTE 2
        var sum_m1_att2 = reviews_m1.reduce(function(memo, model){
            return memo + model.get("reviewAttr2");
        }, 0);
        var avg_m1_att2 = sum_m1_att2 / reviews_m1.length;

        // ATTRIBUTE 3
        var sum_m1_att3 = reviews_m1.reduce(function(memo, model){
            return memo + model.get("reviewAttr3");
        }, 0);
        var avg_m1_att3 = sum_m1_att3 / reviews_m1.length;

        // ATTRIBUTE 4
        var sum_m1_att4 = reviews_m1.reduce(function(memo, model){
            return memo + model.get("reviewAttr4");
        }, 0);
        var avg_m1_att4 = sum_m1_att4 / reviews_m1.length;

        // ATTRIBUTE 5
        var sum_m1_att5 = reviews_m1.reduce(function(memo, model){
            return memo + model.get("reviewAttr5");
        }, 0);
        var avg_m1_att5 = sum_m1_att5 / reviews_m1.length;




        /*MONTH 2*/
        var reviews_m2 = model_reviews.filter(function(element){
            return new Date(element.get("reviewDate")).getMonth() == (now.getMonth()-1);
        });
        console.log(JSON.stringify(reviews_m2));


        /*// ATTRIBUTE 1
        var sum_m2_att1 = reviews_m2.reduce(function(memo, model){
            return memo + model.get("reviewAttr1");
        }, 0);
        var avg_m2_att1 = sum_m2_att1 / reviews_m2.length;

        // ATTRIBUTE 2
        var sum_m2_att2 = reviews_m2.reduce(function(memo, model){
            return memo + model.get("reviewAttr2");
        }, 0);
        var avg_m2_att2 = sum_m2_att2 / reviews_m2.length;

        // ATTRIBUTE 3
        var sum_m2_att3 = reviews_m2.reduce(function(memo, model){
            return memo + model.get("reviewAttr3");
        }, 0);
        var avg_m2_att3 = sum_m2_att3 / reviews_m2.length;

        // ATTRIBUTE 4
        var sum_m2_att4 = reviews_m2.reduce(function(memo, model){
            return memo + model.get("reviewAttr4");
        }, 0);
        var avg_m2_att4 = sum_m2_att4 / reviews_m2.length;

        // ATTRIBUTE 5
        var sum_m2_att5 = reviews_m2.reduce(function(memo, model){
            return memo + model.get("reviewAttr5");
        }, 0);
        var avg_m2_att5 = sum_m2_att5 / reviews_m2.length;
*/

        /*MONTH 3*/
        var reviews_m3 = model_reviews.filter(function(element){
            return new Date(element.get("reviewDate")).getMonth() == (now.getMonth()-2);
        });
        console.log(JSON.stringify(reviews_m3));






        var avg_m1 = (avg_m1_att1 + avg_m1_att2 + avg_m1_att3 + avg_m1_att4 + avg_m1_att5) / 5;
        var avg_m2 = 5;
        var avg_m3 = 3;
        var avg_m4 = 2;
        var avg_m5 = 5;
        var avg_m6 = 3;

        model.set("Time_series", [
            avg_m1, avg_m2, avg_m3, avg_m4, avg_m5, avg_m6
        ]);

        model.set("Months", time_frame);







    }, this);

    console.log(JSON.stringify(clients_temp));
    return clients_temp;
}



function TimeSeries(){
    console.log('massimopenzo');
}

