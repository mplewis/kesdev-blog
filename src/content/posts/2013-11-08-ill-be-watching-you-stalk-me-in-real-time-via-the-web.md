---
title: "I'll be watching you: Stalk me in real time via the web"
slug: ill-be-watching-you-stalk-me-in-real-time-via-the-web
date: 2013-11-08T19:07:21.000Z
---
<!--kg-card-begin: markdown--><blockquote>
<p><em>Author's note: Google took down Google Latitude and Locality is no longer online. But my code is still around, and I'll leave this up in case anyone finds anything of use!</em></p>
</blockquote>
<p>I've always been fascinated by the idea of real-time location data. <a href="http://www.youtube.com/watch?v=JSnB06um5r4">The first Google Glass video</a> showed a person checking where his friend was with a real-time location service. I always liked the idea of <a href="">the Weasley family clock from Harry Potter</a>, which the mother of the large Weasley family used to keep tabs on her kids and husband. So I tried to build a Weasley clock of my own with HTML, CSS, and a little JavaScript magic.</p>
<p>I named my web application <a href="http://www.mplewis.com/locality/"><strong>Locality</strong></a>. <a href="http://www.mplewis.com/locality/">Check it out right now,</a> and read on to find out how it works.</p>
<!-- more -->
<blockquote>
<p><strong>locality</strong></p>
<p><em>Noun</em></p>
<ol>
<li>
<p>The position or site of something.</p>
</li>
<li>
<p>An area or neighborhood, esp. as regarded as a place occupied by certain people or as the scene of particular activities.</p>
</li>
</ol>
</blockquote>
<p>Step one is figuring out where I am at any given time. The easiest way to get my own real-time location data is with an Android smartphone that I already have. It's got GPS and 4G, so it'll try to sync my location to <a href="http://latitude.google.com/">Google Latitude</a> whenever I move around.</p>
<p>Getting the data out of Google Latitude is slightly tricky. Latitude offers &quot;site badges&quot;, HTML drop-ins that put a little map and an icon on the map to show people where you are. But I want the coordinates, and Latitude offers a JSON feed to get that data out too. The URL for any given user's JSON feed is <code>https://latitude.google.com/latitude/apps/badge/api?user=YOUR_USER_ID_HERE&amp;type=json</code>.</p>
<p>If you've ever worked with JSON before, you know that making a JSON request from one domain to another is likely to fail because of <a href="">HTTP access control (CORS)</a>. So I used <a href="http://developer.yahoo.com/yql/">Yahoo's YQL</a> to import a JSON feed, read the data, and spit it back out as JSONP -- which isn't governed by CORS.</p>
<pre><code class="language-javascript">// URL for Latitude data in JSON form
var latitudeUrl = 'https://latitude.google.com/latitude/apps/badge/api?user=MY_USER_ID&amp;type=json';
// use Yahoo YQL to proxy the JSON into JSONP
var yahooYqlUrl = 'http://query.yahooapis.com/v1/public/yql?callback=?'

$.getJSON(yahooYqlUrl, {
    q: 'select * from json where url=&quot;' + latitudeUrl + '&quot;',
    format: 'json'
}, function(response) {
    var data = response.query.results.json;
    // do something with data here
});
</code></pre>
<p>It's a bit of a hacky solution but it works very well. <a href="http://stackoverflow.com/a/8579158/254187">Credit where credit is due to Stack Overflow user hippietrail.</a> Apparently there's also a cool little service called <a href="http://jsonp.ru/">jsonp.ru</a> that does the same thing, but I trust Yahoo more with my data.</p>
<p>Once I've got the Matt coordinates, I need to figure out where Matt is. I started by constructing a list of location objects with data on each location of which I wanted to keep track. I grabbed the coordinates from Google Maps by using the &quot;right-click to drop coordinates&quot; Labs addon and manually typing the coordinates for each location into my code.</p>
<pre><code class="language-javascript">var locations = [
    {
        name: &quot;Stadium View&quot;,
        coordinates: {
            latitude: 44.971599,
            longitude: -93.221807
        }
    },
    {
        name: &quot;Kenneth H. Keller Hall&quot;,
        coordinates: {
            latitude: 44.974650,
            longitude: -93.232460
        }
    },
    // ... put more locations here
]
</code></pre>
<p>Okay, so now I have the coordinates of locations and the coordinates for myself. I need to be able to tell how far away I am from each location. It turns out this is a reasonably well-solved problem -- I found some fantastic scripts from <a href="http://www.movable-type.co.uk/scripts/latlong.html">Chris Veness at movable-type.co.uk</a> that do just what I want: simple, accurate calculation of distances between two latitude/longitude pairs.</p>
<p>I wrote a little function that uses <code>LatLon.js</code> to calculate the distance in miles between two pairs of coordinates:</p>
<pre><code class="language-javascript">function distMiLatLon(lat1, lon1, lat2, lon2) {
    var rMi = 3963.1676; // earth's radius in miles
    var p1 = new LatLon(lat1, lon1, rMi);
    var p2 = new LatLon(lat2, lon2, rMi);
    return p1.distanceTo(p2); // in miles
}
</code></pre>
<p>For my application, I decided if I was within 500 feet of a known location, I should be checked in. 500 feet == .094697 miles, so I set <code>var maxDistToValidateLoc = .094697</code> in my code. After Locality gets the coordinates for locations and for me, it iterates down the list of locations and calculates a distance to each one. If a distance is less than .094697 miles, it registers me as being present at that location. Otherwise, it puts me in the &quot;no man's land&quot; category of &quot;somewhere else&quot;.</p>
<p>That's the JavaScript and data handling side covered. I'll write more about the HTML/CSS layout in another post. For now, check out the app at <a href="http://www.mplewis.com/locality/">mplewis.com/locality</a> and tell me what you think!</p>
<!--kg-card-end: markdown-->