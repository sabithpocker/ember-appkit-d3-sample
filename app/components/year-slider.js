export default Ember.Component.extend({
    
    /**
    Constructor
    */
    init : function () {
        this._super();
        this.set('currentYear', this.get('timeline.startYear'));
    },
    
    years : function () {
        return d3.range(this.get('timeline.startYear'), this.get('timeline.endYear'));
    }.property(),
    
    handleActive : false,
    handleDistance : 0,
    handleOffset : 0,
    
    moveTo : function (e) {
        var year = $(e.target).text();
        this.set('currentYear', year);
        return false;
    },
    
    distanceToYear : function (distance) {
        var years = this.get('years');
        var maxYear = years[years.length - 1];
        var minYear = years[0];
        var year = minYear + distance / $('#timeline_slider').width() * years.length;
        return year;
    },
    
    handleStyle : function () {
        var distance = this.get('handleDistance');
        return "left:" + distance + "px;";
    }.property('handleDistance'),
    
    mouseDown : function (e) {
        //console.log('mouseDown');
        e.preventDefault();
        if ($(e.target).hasClass('handle')) {
            this.set('handleActive', true);
            this.set('handleOffset', e.pageX - $(e.target).offset().left);
        }
    },
    
    mouseUp : function (e) {
        //console.log('ehh', e.target);
        e.preventDefault();
        this.set('handleActive', false);
    },
    
    mouseLeave : function (e) {
        e.preventDefault();
        this.set('handleActive', false);
    },
    
    mouseMove : function (e) {
        e.preventDefault();
        if (this.get('handleActive')) {
            var $ele = $(e.target);
            if (!$ele.hasClass('handle'))
                $ele = $(e.target).find('.handle');
            var distance = e.pageX - $ele.parents('#timeline_slider').offset().left - this.get('handleOffset');
            var year = this.distanceToYear(distance);
            this.set('currentYear', year);
            this.set('handleDistance', distance);
        }
    },
    
    click : function (e) {
        e.preventDefault();
        var $ele = $(e.target);
        if (!$ele.hasClass('handle'))
            $ele = $(e.target).find('.handle');
        var distance = e.pageX - $ele.parents('#timeline_slider').offset().left - this.get('handleOffset');
        var year = this.distanceToYear(distance);
        this.set('currentYear', year);
        this.set('handleDistance', distance);
        this.set('handleActive', false);
    }
});
