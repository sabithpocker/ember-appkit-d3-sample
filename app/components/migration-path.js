export default Ember.Component.extend({
    group : null,
    countries : null,
    timeline : null,
    currentYear : null,
    bezierStyle : function () {
        //partition hue spectrum among countries
        var country = this.get('group.belongsToCountry.name');
        var noOfCountries = this.get('countries.model').length;
        var index = this.getCountryIndex(country);
        var min = index * 360 / noOfCountries;
        var max = index * 360 / noOfCountries + 360 / noOfCountries;
        var yearOffset = this.get('yearsPassed') + 2;
        var style = "";
        style += 'fill:none;stroke-width:1px;shape-rendering:auto;';
        style += 'stroke:' + 'hsl(' + ((min + max) / 2) + ',100%,50%';//,' + 100 / yearOffset + '%);';
        return style;
    }
    .property(),
    bezierPath : function () {
        //console.log('asked for new paths');
        var year = this.get('group.hasOneMigration.year');
        var currentYear = this.get('currentYear');
        var line = d3.svg.line().x(function (d) {
                return d.x;
            }).y(function (d) {
                return d.y;
            });
        var curve;
        var delta = 0.01;
        var t = 1;
        if (Math.floor(year) === Math.floor(currentYear)) {
            t = currentYear - Math.floor(currentYear);
        }
        //console.log(t);
        var d = 3;
        if (!curve) {
            curve = [];
            for (var t_ = 0; t_ <= 1; t_ += delta) {
                var x = this.getLevels(d, t_);
                curve.push(x[x.length - 1][0]);
            }
        }
        return line(curve.slice(0, t / delta + 1));
    }
    .property('currentYear', 'group'),

    getLevels : function (d, t_) {
        var obj = this;
        var x = [this.get('controlPoints')];
        for (var i = 1; i < d; i++) {
            x.push(obj.interpolate(x[x.length - 1], t_));
        }
        return x;
    },
    interpolate : function (d, p) {
        var r = [];
        for (var i = 1; i < d.length; i++) {
            var d0 = d[i - 1],
            d1 = d[i];
            r.push({
                x : d0.x + (d1.x - d0.x) * p,
                y : d0.y + (d1.y - d0.y) * p
            });
        }
        return r;
    },
    controlPoints : function () {
        var offset = 50 + 30 * this.get('yearsPassed');
        var from = this.getCountryPosition(this.get('group.belongsToCountry.name'));
        var to = this.getCountryPosition(this.get('group.hasOneMigration.hasOneCountry.name'));
        var control = {
            x : ((from.x + to.x) / 2) + offset,
            y : ((from.y + to.y) / 2) + offset
        };
        return [from, control, to];
    }
    .property(),

    yearsPassed : function () {
        var startYear = this.get('timeline.startYear');
        var year = this.get('group.hasOneMigration.year');
        return year - startYear;
    }
    .property(),

    getCountryPosition : function (country) {
        var countries = this.get('countries.model');
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].country === country)
                return countries[i].position;
        }
    },

    getCountryIndex : function (country) {
        var countries = this.get('countries.model');
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].country === country)
                return i;
        }
    }
});
