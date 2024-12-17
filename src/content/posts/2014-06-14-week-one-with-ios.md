---
title: Week One with iOS
slug: week-one-with-ios
date: 2014-06-14T06:43:58.000Z
---
<!--kg-card-begin: markdown--><p>It's really not that bad. I think I might prefer it to Android soon.</p>
<ul>
<li>Interface Builder and Storyboards are nicer than Android's XML layouts, but you have the learning curve of the message-passing component linking GUI. I was really annoyed with iOS for using IBOutlets and delegates to programatically link code and UI until I realized that Android does the exact same thing under a different name.</li>
<li>It's much easier to build a good-looking iOS app out of the box thanks to their great UI elements and thought put into design. Android apps look like trash out of the box and they're hard to make pretty, especially if you try them on more than one phone.</li>
<li>I didn't like how I had to subclass UIViewController for every single individual screen until I realized that I have to do literally the same thing in Java. Android does have Activities though, and those were really nice—it was clear how to pass parameters from one view to another. There's probably just as good of a way to do this in the view constructor.</li>
<li>I was really afraid of memory management but it turns out iOS has ARC which is pretty neat.</li>
<li>I still don't know what half the keywords in Obj-C mean. Here's an example: <code>@property (nonatomic, retain) IBOutlet UIButton *myButton;</code>—I know <code>retain</code> has something to do with not letting ARC discard it, but how does <code>IBOutlet</code> &quot;decorate&quot; it? What's <code>nonatomic</code> mean? What does an <code>@</code> symbol specify, because I've been using it for like ten things already today.</li>
<li>Why are there three ways to register something into Interface Builder, and why does the most common one involve setting a return type that gets thrown away and left unused?</li>
<li>It took me 30 minutes today to realize that my <code>Configs/app_ids.plist</code> file was being statically linked into the root when I ran my app, keeping me from importing it from the <code>Configs</code> folder I specified. Aaagh. Why?</li>
<li>This week, Objective-C has felt like a mesh between the readability of Haskell, the parens of Lisp, and the elegant naming styles of Java.</li>
</ul>
<p>I will probably keep developing for iOS and Android, but I think I like iOS a bit more now—it lets me work my chops as a designer a bit more than Android, and it's not that different after banging your head into the system for a week.</p>
<!--kg-card-end: markdown-->