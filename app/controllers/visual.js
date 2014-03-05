export default Ember.ArrayController.extend({
    needs : ["countries", "migrations"],
    init : function(){
        this.set('currentYear', this.get('timeline.startYear'));
    },
    currentYear: null,
    timeline : Em.Object.create({
        startYear : 1940,
        endYear : 1950,
        divisions : 0
    }),
    countries: Ember.computed.alias('controllers.countries'),
    activeGroups : function () {
        var controller = this;
        return this.get('model').filter(function (group) {
            if (group.get('hasOneMigration.year') <= controller.get('currentYear')){
                return true;
                }
        });
    }
    .property('currentYear','model')
});
