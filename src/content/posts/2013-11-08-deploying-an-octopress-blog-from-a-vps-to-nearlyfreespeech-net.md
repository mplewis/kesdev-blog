---
title: Deploying an Octopress blog from a VPS to NearlyFreeSpeech.net
slug: deploying-an-octopress-blog-from-a-vps-to-nearlyfreespeech-net
date: 2013-11-08T19:10:36.000Z
---
<!--kg-card-begin: markdown--><blockquote>
<p><em>Author's note: This was migrated from an Octopress blog. I think the data is still relevant to anyone trying to run Octopress and deploy to NearlyFreeSpeech, so I've kept the post online in its old form. Enjoy!</em></p>
</blockquote>
<p>Hello! I'm Matthew Lewis, and this is my Octopress blog.</p>
<p>I'd like to use this blog for projects, and I suppose the first project I should discuss is this blog itself.</p>
<p><a href="http://octopress.org/">Octopress</a> is a blogging framework. It's based on <a href="http://jekyllrb.com/">jekyll</a>, a static site generator.</p>
<p>Frankly, Octopress is amazing. It's easy to install and modify themes and layouts, and I can run a single <code>rake</code> command to deploy my blog from my VPS to my <a href="http://www.nearlyfreespeech.net">NearlyFreeSpeech</a> site.</p>
<p>In this post, I'll detail how to generate and deploy your Octopress blog straight to your NearlyFreeSpeech.net hosting account in one command.</p>
<!-- more -->
<h1 id="deploymentstack">Deployment Stack</h1>
<p>I'm running on a Debian 32-bit VPS hosted on <a href="http://www.bigscoots.com">BigScoots</a> and hosting www.mplewis.com on NearlyFreeSpeech.net.</p>
<h1 id="whyuseavpsandawebhost">Why use a VPS and a web host?</h1>
<p>I want to host my blog on NFS.net because:</p>
<ul>
<li>NFS can handle much more traffic than my dev VPS (my VPS is uber cheap)</li>
<li>NFS is seriously cheap for static sites, which makes using Octopress on NFS very attractive</li>
</ul>
<p>I have to use a VPS to deploy because:</p>
<ul>
<li>NFS doesn't have the proper Ruby or bundles or anything I need to generate my Octopress site using Jekyll</li>
</ul>
<h1 id="sohowsthedeploywork">So, how's the deploy work?</h1>
<p>The process behind deploying an Octopress blog is as follows:</p>
<ul>
<li>Run <code>rake generate</code> to generate the static files behind the blog posts</li>
<li>Run <code>rake deploy</code> to rsync the static files to a web server</li>
</ul>
<p>That's it. The config is documented in <a href="http://octopress.org/docs/deploying/rsync/">the Octopress docs</a>.</p>
<p>And if you're lazy like me, use the combined <code>rake</code> command:</p>
<ul>
<li>Run <code>rake gen_deploy</code> to generate the blog and deploy it to your server. Hooray!</li>
</ul>
<h1 id="andthatsitthateasy">And that's it? That easy?</h1>
<p>Yes... and no.</p>
<p><code>rake deploy</code> wants a public key to connect to your web server.</p>
<p>NearlyFreeSpeech.net will let you use a public key to authenticate. However, you have to file a free assistance ticket and wait a couple of hours for the key to be set up on your account.</p>
<p>More information can be found <a href="https://members.nearlyfreespeech.net/mplewis/support/faq?q=SSHKeys&amp;keywords=key&amp;form=1#SSHKeys">here</a> on NFS.net's FAQ, but it's a very simple process:</p>
<ul>
<li>Click the link titled &quot;assistance request&quot; to submit a free assistance request.</li>
<li>Copy your <code>id_rsa.pub</code> and paste it in the text field, and ask them to add that pub key to your account.</li>
<li>Wait two hours.</li>
</ul>
<p>And you're done! Your dev server will now be able to deploy straight to any of your NFS sites without a password.</p>
<p>I hope this information helps anyone looking for info on how to deploy to NearlyFreeSpeech.net via an external server.</p>
<!--kg-card-end: markdown-->