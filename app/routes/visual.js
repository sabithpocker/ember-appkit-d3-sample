export default Ember.Route.extend({
    addGroup : function (datum) {
        var newGroup = Em.Object.create({
                strength : datum.strength,
                hasOneMigration : Em.Object.create({
                    year : datum.year,
                    hasOneCountry : Em.Object.create({
                        name : datum.to
                    })
                }),
                belongsToCountry : Em.Object.create({
                    name : datum.from
                })
            });
        return newGroup;
    },
    loadGroups : function () {
        var migrations = this.controllerFor('migrations').get('model');
        var groups = [];
        for (var i = 0; i < migrations.length; i++) {
            groups.push(this.addGroup(migrations[i]));
        }
        return groups;
    },
    setupController: function(controller, model) {

        this.controllerFor('countries').set('model',[
            {country :'india' , position: {x : 725, y: 300} ,translation: "translate(725,300)"},
            {country :'china' , position : {x: 785, y: 233} ,translation: "translate(785,233)"},
            {country :'japan' , position : {x: 872, y: 237} ,translation: "translate(872,237)"},
            {country :'italy' , position : {x: 542, y: 196} ,translation: "translate(542,196)"},
            {country :'germany' , position : {x: 540, y: 168} ,translation: "translate(540,168)"},
            {country :'usa' , position : {x: 260, y: 250} ,translation: "translate(260,250)"}
        ]);
        
        this.controllerFor('migrations').set('model', [{
                from : 'italy',
                to : 'usa',
                year : 1940,
                strength : 20000
            }, {
                from : 'italy',
                to : 'china',
                year : 1940,
                strength : 20000
            }, {
                from : 'china',
                to : 'usa',
                year : 1941,
                strength : 2000
            }, {
                from : 'germany',
                to : 'usa',
                year : 1941,
                strength : 25600
            }, {
                from : 'italy',
                to : 'usa',
                year : 1941,
                strength : 20000
            }, {
                from : 'india',
                to : 'usa',
                year : 1941,
                strength : 340
            }, {
                from : 'india',
                to : 'usa',
                year : 1942,
                strength : 3409
            }, {
                from : 'japan',
                to : 'usa',
                year : 1947,
                strength : 5654
            }, {
                from : 'germany',
                to : 'usa',
                year : 1943,
                strength : 25600
            }, {
                from : 'italy',
                to : 'usa',
                year : 1947,
                strength : 20000
            }, {
                from : 'india',
                to : 'usa',
                year : 1945,
                strength : 340
            }, {
                from : 'india',
                to : 'usa',
                year : 1944,
                strength : 3409
            }, {
                from : 'japan',
                to : 'usa',
                year : 1947,
                strength : 5654
            }, {
                from : 'germany',
                to : 'usa',
                year : 1947,
                strength : 25600
            }, {
                from : 'italy',
                to : 'usa',
                year : 1947,
                strength : 20000
            }, {
                from : 'india',
                to : 'usa',
                year : 1946,
                strength : 340
            }, {
                from : 'india',
                to : 'usa',
                year : 1946,
                strength : 3409
            }, {
                from : 'japan',
                to : 'usa',
                year : 1947,
                strength : 5654
            }, {
                from : 'germany',
                to : 'usa',
                year : 1947,
                strength : 25600
            }, {
                from : 'italy',
                to : 'usa',
                year : 1947,
                strength : 20000
            }, {
                from : 'germany',
                to : 'usa',
                year : 1948,
                strength : 25600
            }, {
                from : 'italy',
                to : 'usa',
                year : 1948,
                strength : 20000
            }, {
                from : 'italy',
                to : 'usa',
                year : 1949,
                strength : 20000
            }
        ]);
        
        controller.set('model', this.loadGroups());
    }
});
