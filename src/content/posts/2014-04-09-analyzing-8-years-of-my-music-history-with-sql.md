---
title: Analyzing 8 years of my music history with SQL
slug: analyzing-8-years-of-my-music-history-with-sql
date: 2014-04-10T05:34:20.000Z
---
<!--kg-card-begin: markdown--><p><strong>Ever heard an album or a song for the first time and loved it so much you played it on repeat for three days straight?</strong> I wanted to dig into my listening history to find out which songs I loved, got sick of, and forgot about for years.</p>
<p>Good thing I use Last.fm obsessively. Last.fm is a service that <em>&quot;scrobbles&quot;</em>—keeps track of—every song you listen to past the halfway mark. I've been using Last.fm since 2006 and have accumulated a <em>seriously</em> extensive scrobble log.</p>
<p>Last.fm provides users with an API for accessing their scrobble history. I figured that if I scraped my entire listening history into a SQL database, I could better analyze my listening history.</p>
<h2 id="scrapingthelastfmapiwithpython">Scraping the Last.fm API with Python</h2>
<p>I wrote some Python to claw my data out of the internals of Last.fm, one page at a time. It uses the <a href="http://docs.python-requests.org/en/latest/">Requests</a> and <a href="http://docs.python-requests.org/en/latest/">Dataset</a> packages. I used <a href="http://ipython.org/notebook.html">iPython Notebook</a> to assemble a <strong>docs-and-code mashup of doom.</strong></p>
<p><strong><a href="http://www.mplewis.com/files/lastfm-scraper.html">Check out my writeup on scraping Last.fm data here!</a></strong></p>
<p>(If you have iPython Notebook, you can <a href="http://www.mplewis.com/files/lastfm-scraper.ipynb">download the notebook file here</a> and run it yourself.)</p>
<h2 id="whatchuknowboutme">Whatchu know 'bout me?</h2>
<p>Once my data was scraped into my DB, I ran some queries to search for songs I played obsessively after I discovered them, and I found several of my music-listening phases, such as:</p>
<ul>
<li>that period during which I listened exclusively to &quot;Weird Al&quot; Yankovic,</li>
<li>the landmark date in 2006 when I listened to Daft Punk's <em>Discovery</em> for the first time, and</li>
<li>that time I saw <em>Wicked</em> with my high school band and listened to the soundtrack for a week straight.</li>
</ul>
<p><strong>This is awesome</strong>. I'm a stats nerd and I love the idea of a quantified self. Thank you, 14-year-old Matt, for signing up for Last.fm 8 years ago.</p>
<p>There's plenty more to find out. Like, <a href="http://rd.io/x/QWTS1Ddd7GBS/">this has been my favorite song so far this week</a> and <a href="http://www.rdio.com/artist/Basement_Jaxx_Vs._Metropole_Orkest/album/Basement_Jaxx_Vs._Metropole_Orkest/">this is my favorite newly-discovered album</a>. And <a href="http://rd.io/x/QWTS1DFtBiM/">this is probably my favorite new artist by far</a>.</p>
<h2 id="okthisisgettingkindacreepy">OK, this is getting kinda creepy</h2>
<p>But don't take my word for it—I've put my entire scrobble log online for you. Want to know on which day I fell asleep listening to Ellie Goulding in 2012? Want to dig up that evidence that I'm actually a closet Ke$ha fan? <strong><a href="http://www.mplewis.com/files/lastfm-trickybeta-20140410.zip">Download my SQLite database and learn what you will about 8 years of Matt's musical taste.</a></strong></p>
<p>As always, email me at <a href="mailto:matt@mplewis.com">matt@mplewis.com</a> or tweet me at <a href="https://twitter.com/mplewis">@mplewis</a> if you do something cool with this! I always love hearing when someone takes something I helped build and makes it even more interesting.</p>
<p>And if you do find out I like Ke$ha, please keep it to yourself maybe?</p>
<!--kg-card-end: markdown-->