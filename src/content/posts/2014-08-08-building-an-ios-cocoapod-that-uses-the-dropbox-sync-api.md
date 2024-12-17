---
title: Building an iOS Cocoapod that uses the Dropbox Sync API
slug: building-an-ios-cocoapod-that-uses-the-dropbox-sync-api
date: 2014-08-08T23:29:03.000Z
---
<!--kg-card-begin: markdown--><p>One of the frameworks we're building at Punch Through Design links to Dropbox to help users access their files from both iOS and their computer. Dropbox provides a very useful <a href="https://www.dropbox.com/developers/sync">Sync SDK for iOS</a> that makes it easy to access Dropbox accounts.</p>
<p>Installing the Dropbox SDK can be complicated, so I simply used Cocoapods to install the <a href="http://cocoadocs.org/docsets/Dropbox-Sync-API-SDK/3.0.2/">Dropbox iOS Sync SDK</a> for use with our framework.</p>
<p>I wanted the framework to be easy to install into any project, so I made efforts to distribute it as a Cocoapod. This caused problems: I needed to write a Podspec that included the Dropbox SDK as a framework dependency, and the <a href="http://guides.cocoapods.org/syntax/podspec.html">Podspec documentation</a> is sorely lacking. I couldn't figure out how to write a podspec that included the Dropbox SDK as a pod dependency AND linked the Dropbox framework so Xcode could find all its headers.</p>
<p>We ended up stealing some lines of code from the <a href="https://github.com/overcommitted/ParcelKit/blob/master/ParcelKit.podspec">ParcelKit podspec</a>—they also list the iOS Dropbox SDK as a Cocoapod dependency, and they seem to have it figured out.</p>
<p>Here are the important lines of code from our Podspec file:</p>
<pre><code>Pod::Spec.new do |s|
  # ...your code goes here
  s.frameworks   = 'Dropbox'
  s.dependency 'Dropbox-Sync-API-SDK', '~&gt; 3.0.2'
  s.xcconfig     = { 'FRAMEWORK_SEARCH_PATHS' =&gt; '&quot;${PODS_ROOT}/Dropbox-Sync-API-SDK/dropbox-ios-sync-sdk-3.0.2&quot;' }
end
</code></pre>
<p>I believe you'll need to change the framework search path if the Dropbox SDK version changes. This code helped me successfully link our Podfile with Dropbox, minimizing the amount of damage we had to do to our <code>.xcodeproj</code> file.</p>
<!--kg-card-end: markdown-->