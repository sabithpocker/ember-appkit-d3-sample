ember-appkit-d3-sample
======================

This is an attempt to setup [d3.js](http://d3js.org/) with [Ember App Kit](http://iamstef.net/ember-app-kit/). 

>**DISCLAIMER**
>The code was actually written around two years back, I have just restructured the code to fit in current norms.
>The purpose of this example is not demonstrating how to organize an Eber application, least care is given in that direction. 
>The main objective is to show **one particular method of using Ember with d3**.
>The code is just *working* as of now, I will try to complete the functionalities as I get time.

This particular method is generating paths with `d3` and binding it to the `svg` using `Ember`. This will result in paths responding to data changes in the app.
The example **does not** use `d3` to render the `svg`, instead it is *using `d3` API to calculate the path* and use it in svg.

*__courtesy__ : The whole project was started after reading an [article](http://corner.squareup.com/2012/04/building-analytics.html) by [Allen Cheung](http://twitter.com/allenmhc).*

### Demo

See live demo at [my website](http://markupmonks.com/migration/) 
*The demo might not be updated*

### The Approach used

The template for the `svg` looks like this in the `handlebars`

    <svg class="migration" height="568" width="1024">
        <g transform="translate(0,0)">
            {{countryMarkers}}
            <path {{bind-attr style=bezierStyle  d=bezierPath}} class="curve" />
        </g>
    </svg>
    
Here the `d` attribute of path is bound to the ember computed variable `bezierPath`. In Ember we create a derived attribute for the same

    bezierPath : function () {
        .
        .
        .
        var line = d3.svg.line().x(function (d) {
                return d.x;
            }).y(function (d) {
                return d.y;
            });
        .
        .
        .
        return line(curve.slice(0, t / delta + 1));
    }
    .property('currentYear')
    
This property changes as the `currentYear` changes, resulting in the path changing by itself.

### Installing

- Install [NodeJS](http://nodejs.org)
- Install [Grunt|]()http://gruntjs.com): `npm install -g grunt-cli`
- Clone repo
- In repo
  - Install local Node packages: `npm install`
  - Not needed: Install JavaScript packages: `bower install`
  - Run server: `grunt server`
  - Visiit `localhost:8000`


----

### Setting up Tips

**To install Ember App Kit** 

Please check the Ember App Kit git page to get details on how to install Ember App Kit :)

**Add d3 to Ember App Kit managed using bower**

To include d3 in bower, you can use
    
    bower install d3
    
Then you can go the `index.html` and add the new vendor file there mimicking jQuery.

    <script src="/vendor/jquery/jquery.js"></script>
    <script src="/vendor/d3/d3.js"></script>

**Setup jsHint for esnext or es6**

It is recommended that you configure your jsHint with `esnext` option as the project is using next version of ECMA Specification (es6)
ou can probaby change it in the `.jshintrc` file, I am not an expert with these though.

**To build**

Once everything is setup, build using grunt

    grunt dist
    
You will have the app deployed into `dist` folder.


