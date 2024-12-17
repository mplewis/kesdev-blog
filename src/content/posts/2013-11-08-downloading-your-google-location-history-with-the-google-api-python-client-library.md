---
title: Downloading Your Google Location History With The Google API Python
  Client Library
slug: downloading-your-google-location-history-with-the-google-api-python-client-library
date: 2013-11-08T19:06:34.000Z
---
<!--kg-card-begin: markdown--><p><em><strong>tl;dr If you want to get started with your Latitude data right away, check out my gist at the bottom.</strong></em></p>
<p>I've started a new project! I'm investigating ways to share my life with others electronically, with little to no conscious effort on my part.</p>
<p>One of the things I'd like to share is my location history. I'm not sure how much or how little information I want to give to a total stranger, but I believe that if I want to share a significant amount of my life with everyone on the Internet, context is key -- and location makes a huge deal when it comes to taking events in my life into context. Right now I live in San Francisco, but two months ago I lived in Minneapolis, and somewhere in between I spent time with my family in Wausau. Knowing this is key to understanding what I want to share with the world.</p>
<p>I'm being intentionally vague about the actual project I'm working on, but that's okay -- this post is about one of the key elements, and I'll post more later when I start assembling other parts.</p>
<p>Read on to find out how to get your super-interesting real-time location data out of everyone's favorite location-tracking Google app.</p>
<!-- more -->
<h1 id="howtogeolog101">How to Geolog 101</h1>
<p>What's the best, most convenient, cheapest way to tell people where I've been in the past? There are plenty of ways to log my location, and most of them involve the use of GPS to lock onto my location, and some kind of data logging device to put the data into a format I can use.</p>
<p>I could build a device from scratch involving a GPS module, a microcontroller and a data logger, or I could just use my Android phone!</p>
<p>Android, as we all know, is developed by Google, and Google puts out tons of other cool web products. One of those products is Google Latitude.</p>
<p>From Google's website:</p>
<p>{% blockquote %}<br>
Google Latitude is a location-aware mobile app developed by Google as a successor to its earlier SMS-based service Dodgeball. Latitude allows a mobile phone user to allow certain people to view their current location. Via their own Google Account, the user's cell phone location is mapped on Google Maps.<br>
{% endblockquote %}</p>
<p>Perfect! Plus -- if I use my cell phone, it uses <a href="http://www.skyhookwireless.com/">Skyhook</a> to approximate my location even better with the use of wifi hotspots and cell phone towers.</p>
<p>So, Google Latitude will log my location over time in Location History. All I need to do is carry my cell phone on me and keep it turned on. Easy.</p>
<p>My next goal, then, is to get my data out of Location History and into a form I can use.</p>
<h1 id="prerequisiteswhatchuneed">Prerequisites (<a href="https://www.youtube.com/watch?v=s8S5PN1FnFk">Whatchu Need</a>)</h1>
<p>To be able to follow along and extract your own Location History data, you'll need the following:</p>
<ul>
<li>Location History data in your Google account</li>
<li>A Python 2.7+ installation</li>
<li>The <a href="https://code.google.com/p/google-api-python-client/">Google API Python Client</a> -- I used <code>pip install google-api-python-client</code> to install this.</li>
<li>A Google account.</li>
<li>A <a href="https://developers.google.com/console/help/">Google API project</a> with access to the Latitude API. See <a href="https://developers.google.com/console/help/#creatingdeletingprojects">Creating a project</a> for information on creating a new API project.</li>
</ul>
<p>After you create a project, you'll want to go to the <code>API Access</code> tab and create an OAuth 2.0 Client ID. Make sure you set the application type to <code>Installed application</code> and the installed application type to <code>Other</code>.</p>
<h1 id="accessingyourdatausingapoorlydocumentedbutwellwrittenapilibrary">Accessing Your Data Using A Poorly-Documented (But Well-Written) API Library</h1>
<h2 id="authentication">Authentication</h2>
<p>The Google Location History API runs on OAuth 2. It's finnicky because of that. OAuth 2 is finnicky. Avoid writing an OAuth 2 client from scratch if you can -- you'll regret it. Use the tools you're given by the developers who know what they're doing.</p>
<p>It took me about four hours to figure out the basics of the API because the documentation is a bit lacking. You should still check out the docs though -- <a href="https://code.google.com/p/google-api-python-client/source/browse/samples/latitude/latitude.py">here's Google's only Latitude API sample</a>, and <a href="https://code.google.com/p/google-api-python-client/wiki/SampleApps">here's some samples for other applications that might help you out</a>.</p>
<p>Hopefully I can save you some time by explaining how the script I wrote to authenticate with the Google OAuth endpoint via the Python API works and why it works that way.</p>
<p>Here's the code you'll need to authenticate with Google:</p>
<pre><code class="language-python">import httplib2
from apiclient.discovery import build
from oauth2client.file import Storage
from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.tools import run

CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'
REQUESTED_SCOPE = 'https://www.googleapis.com/auth/latitude.all.best'

flow = OAuth2WebServerFlow(CLIENT_ID, CLIENT_SECRET, REQUESTED_SCOPE)

storage = Storage('credentials.dat')
credentials = storage.get()
if credentials == None or credentials.invalid:
    credentials = run(flow, storage)

http = httplib2.Http()
http = credentials.authorize(http)
</code></pre>
<p>In the above example, you need to replace <code>CLIENT_ID</code> and <code>CLIENT_SECRET</code> with real values. Fill those in with the values found in the application you created above in the Google API Console.</p>
<p>When you run this code, Python will open your web browser to an authorization page. If you're not logged into a Google account, you'll be asked to log in. You'll then be asked to allow access to your location history.</p>
<p>After you grant access to your application to access your location history, you can close your browser window. The Python script will continue by saving your login credentials in <code>credentials.dat</code> as shown in the script above -- if you want to change that, just provide a different path to <code>Storage()</code>. Once you have <code>credentials.dat</code> saved, you won't have to log in again until your OAuth token expires.</p>
<p>Great! Now you have authorization to access your Location History data. How do you actually access it?</p>
<h2 id="accessingyourdata">Accessing Your Data</h2>
<p>This uses some of the code Google provides in their API acess examples. This code follows immediately after the authentication above and assumes you have a valid <code>http</code> instance available from <code>credentials.authorize()</code>.</p>
<pre><code class="language-python">latitude = build('latitude', 'v1', http=http)

try:
	# access Location History data via the &quot;latitude&quot; object; put your code here!
except AccessTokenRefreshError:
    print 'Access token refresh error. Please restart the application to reauthorize.'
</code></pre>
<p>The <code>latitude</code> object indicates you want to access the Latitude API, version 1, using the <code>credentials.authorize()</code> <code>http</code> object to make the requests.</p>
<p>Inside that <code>try</code> section you'll need to use the <code>latitude</code> object to access your data. Here's the syntax you need:</p>
<pre><code class="language-python">response = latitude.location().list(granularity='best').execute()
</code></pre>
<p>By default, Google assumes that you want the latest results. Specifying the keyword argument <code>granularity='best'</code> indicates you want the best available location granularity as well. You're allowed to do this because earlier, when you asked the user for permission, you told Google you wanted permission to use the best-available location data (REQUESTED_SCOPE = '<a href="https://www.googleapis.com/auth/latitude.all.best">https://www.googleapis.com/auth/latitude.all.best</a>').</p>
<p>When you request this data, you'll get the 100 latest data points. You can access them by looping through the object <code>response['items']</code>. If the <code>response</code> object has no key <code>items</code>, then the Google API returned no results.</p>
<p>Since Latitude likes to take one point a minute, you almost certainly won't get all your data with one query. So, how do you cycle through this data?</p>
<h2 id="iteratingthroughyourdata">Iterating Through Your Data</h2>
<p>You can specify other arguments to the <code>latitude</code> object inside the <code>location().list()</code> function as well. One option you can specify is <code>max_time</code>, which indicates that you want no objects with the milliseconds timestamp later than the one you provide in the <code>max_time</code> argument.</p>
<p>Since the <code>latitude.location().list().execute()</code> function returns the 100 latest location items that match your query, you can cycle through the list by doing the following:</p>
<ol>
<li>Run a <code>latitude.location().list(granularity='best').execute()</code> and save that data.</li>
<li>Take the least-recent data point in that set of data, look for the key <code>timestampMs</code>, and subtract 1 millisecond.</li>
<li>Take that new lower timestamp and use it in the query as follows: <code>latitude.location().list(granularity='best', max_time=LOWER_TIMESTAMP_HERE).execute()</code>.</li>
</ol>
<p>Since you asked the API to return no results with a timestamp greater than the one you provided, you'll get a new page of the next-100-most-recent Latitude results. Yay!</p>
<p>If you keep doing that, someday you'll get a <code>response</code> back that doesn't have an <code>items</code> key. This means you don't have any results left. You could either check for an <code>items</code> key with <code>if items in response</code>, or you could just <code>try</code> to read <code>response[items]</code> and catch the Exception with <code>except KeyError:</code>. The second one is &quot;more Pythonic&quot; if you want to get super pedantic and PEP-8ic.</p>
<h1 id="workingsample">Working Sample</h1>
<p>Here's a working sample. I'm using this with my application's OAuth2 ID and secret and it saves all my data as a big pile of JSON files. Hopefully this gets you up and running!</p>
<p>{% gist 5993157 google_latitude_api_access.py %}</p>
<h1 id="alternativestolatitudeforgeologging">Alternatives to Latitude for Geologging</h1>
<p>If you don't want to use Google Latitude to log your GPS location constantly (which is probably a good idea, because <a href="https://support.google.com/gmm/answer/3001634?p=maps_android_latitude&amp;rd=1">the API is shutting down in less than a month</a>), then you can log the data on your phone with an app instead. <a href="https://play.google.com/store/apps/details?id=com.flashlight.ultra.gps.logger">Ultra GPS Logger</a> is the best one I've found in the Play Store, and at $5ish it's much cheaper than buying a dedicated hardware device.</p>
<h1 id="summary">Summary</h1>
<p>In this post, I detailed how to use the Google API library for Python with the Google Latitude API to get your personal location history data out of Google Latitude and onto your computer in a versatile data format.</p>
<p>In my next post, I'll be writing about the purpose for which I'm using this location history data, and why it's so important to have accurate location data!</p>
<!--kg-card-end: markdown-->