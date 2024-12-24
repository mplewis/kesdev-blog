---
title: Posting Images to Bluesky from TypeScript
slug: posting-images-to-bluesky-from-typescript
date: 2024-12-24T05:44:56.545Z
---

_Special thanks to
[Guillermo Esteves @allencompassingtrip.com](https://bsky.app/profile/allencompassingtrip.com),
whose Rails photoblogging CMS features a
[Bluesky integration](https://github.com/gesteves/denali/blob/release/app/lib/bluesky.rb)
which was my inspiration to build this project._

Since the demise of Twitter, I've been posting to
[Bluesky](https://bsky.app/profile/mplewis.com). The communities that have
formed there are lovely, including lots of fellow photographers, and I wanted to
start sharing photos from my [Photolog](https://photolog.mplewis.com/) to
Bluesky on a daily basis.
[Here's what one of those posts looks like](https://bsky.app/profile/mplewis.com/post/3ldxj6zwm2o2a)!

The Bluesky app works like Twitter – you can post small messages and attach
images, videos, or a website embed. It's different from Twitter in that it is
based on the AT Protocol, which makes Bluesky more like an app that runs on top
of an open database. So, instead of making a REST request to the Bluesky API,
you "insert into the database" and your post shows up in the app.

My goal was to write a text post, attach an image, and run this code daily with
a random photo. AT Protocol complicates things a little bit compared to a
`POST /posts/new` REST API in that the AT Protocol is data-oriented rather than
task-oriented. This means you have to perform the intermediate steps to
construct the _parts of a post_ before assembling them into a completed post.

Since I'm using [Astro](http://localhost:4321/how-i-build-frontend-apps) to post
my photos, it was easy enough to update my
[template](https://github.com/mplewis/photolog/blob/main/src/sitegen/src/pages/photos.json.ts)
to add a [`photos.json`](https://photolog.mplewis.com/photos.json) file with
content for daily posts.

# How To

The Bluesky team has some
[documentation](https://docs.bsky.app/docs/tutorials/creating-a-post#images-embeds)
on posting with images, but these docs use Python and are not terribly complete,
so I wanted to share my complete and working example of the
[Node.js TypeScript code](https://github.com/mplewis/photolog/blob/60e6bf5b2de74da514b29f3efbe9469d97c5fe42/src/netlify/functions/index.mts#L103-L129)
I use to post to Bluesky.

Here are the steps from the above code described in detail:

## Upload image data to Bluesky

This results in a **blob**, a bit of structured data which points to the
uploaded image. You can't upload an image of > 1 MB and you have to strip the
image metadata yourself. At this time, these are both responsibilities of the
client.

To upload content to Bluesky, you use the ATP Agent with a set of credentials
(username & app-specific password). Under the hood, this is performing REST
requests for you.

## Build the image metadata

Construct an `app.bsky.embed.images` object by passing the image data blob. You
have to provide the aspect ratio of your image in this part, or the image won't
be rendered properly in the official clients.

## Build the post content

Assemble the **rich text** for the post. To add stuff like inline links,
hashtags, or @ mentions, you provide the raw string alongside
[facets](https://docs.bsky.app/docs/advanced-guides/post-richtext), bits of data
which indicate a range of string characters should point to a target thing.
Bluesky's SDK provides a
[helper](https://github.com/bluesky-social/atproto/tree/main/packages/api#rich-text)
to turn raw text into rich text.

Finally, build an `app.bsky.feed.post` by combining the text, facets, image
embed, and created at date. You can actually back/forward date stuff as part of
how the protocol works. Some people use this to import their posts from other
social media sites onto ATProto.

## Post it

Use the same ATP Agent we used in the image upload step to upload this post to
Bluesky, and you're done!

# Posting Daily

To run this task daily, I created a Netlify app with one
[scheduled function](https://docs.netlify.com/functions/scheduled-functions/)
configured to run at 09:00 Mountain Time. I want this script to try not to
repost images that have been posted recently, but I don't want to maintain a
database of recent posts. So I implemented the following:

- Get the date of the most recently added image (the **basis date**)
- Shuffle the list of images using the basis date as the RNG seed
- Get the distance in days between the basis date and now
- Pick the photo to post from the shuffled images at index
  `[daysSince % imageCount]`

With this scheme, the script will go through all images in order, only repeating
after each image has been posted once. When I add new images – a relatively
infrequent operation – the basis date changes, the images are reshuffled, and
the script starts posting sequentially from that point. This is the only time
that there's a risk of posting the same image twice in a row, but I'm OK with
the low chance of that happening in exchange me not having to run a database for
this project.
