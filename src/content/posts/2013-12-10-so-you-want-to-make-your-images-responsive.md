---
title: So You Want To Make Your Images Responsive
slug: so-you-want-to-make-your-images-responsive
date: 2013-12-11T00:19:29.000Z
---
<!--kg-card-begin: markdown--><p>Your website looks like it's from '06. Your images look blurry when those kids pull up your site on their fancy new Retina MacBooks and iPad Airs. What do?</p>
<ol>
<li>Wait for <a href="http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/"><code>srcset</code></a> to come out</li>
<li>Implement <a href="https://github.com/borismus/srcset-polyfill"><code>srcset-polyfill</code></a> with code that isn't production-ready</li>
<li>Send your users images at 2X resolution, even if they're on mobile</li>
<li>Use BBC News' <a href="https://github.com/BBC-News/Imager.js"><code>imager.js</code></a></li>
</ol>
<p>You should be using <code>imager.js</code>. Here's why:</p>
<ul>
<li>It's production-ready—the BBC uses this on their sites</li>
<li>It's documented very, very well.</li>
<li>It's <em>smart</em>—it lazy loads specific images based on the viewport properties, saving your mobile users time and bandwidth</li>
<li>Your users will love you for having a fast-loading site (with pretty Retina images, if they're into that).</li>
</ul>
<p><a href="https://github.com/BBC-News/Imager.js">Go check out some examples and get started!</a></p>
<h3 id="appendixokimusingimagerjsnowwhat">Appendix: <em>OK, I'm using imager.js. Now what?</em></h3>
<p>Start generating your images automatically from source. Ain't nobody got time for doing that by hand.</p>
<p><a href="https://github.com/andismith/grunt-responsive-images/"><code>grunt-responsive-images</code></a> will do the heavy lifting for you. Yay for automation!</p>
<!--kg-card-end: markdown-->