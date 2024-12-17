---
title: LED crowd visualizations suck, and here's how to make them better
slug: led-crowd-visualizations-suck
date: 2014-05-21T04:16:03.000Z
---
<!--kg-card-begin: markdown--><p><em>This post is a WIP outline. Feel free to read it if you'd like.</em></p>
<p>People love attending fireworks events and laser light shows. It's awe-inspiring to see coordinated events happen on a scale so much larger than a single person.</p>
<p>It's even more incredible to become a part of the performance yourself. In 2007, Graffiti Research Lab launched a project called <a href="http://www.graffitiresearchlab.com/blog/projects/laser-tag/">L.A.S.E.R Tag</a> that let users spray large-scale digital graffiti on the sides of massive buildings using a laser and a high-power projector.</p>
<iframe width="700" height="525" src="//www.youtube.com/embed/EFWcAkxzkv4" frameborder="0" allowfullscreen></iframe>
<p>Giving people a chance to be a part of the show grants them a feeling of empowerment. It feels good to be part of something bigger, especially when you can personally see hundreds or thousands of other people invested in the same idea.</p>
<h1 id="crowdvisualizationisexciting">Crowd visualization is exciting.</h1>
<p>In 2012, Coldplay gave out LED wristbands called <a href="http://en.wikipedia.org/wiki/Xyloband"><strong>Xylobands</strong></a> to people attending their Moto Xyloto tour concerts. This was the first time Xylobands were used in a large-scale performance.</p>
<iframe width="700" height="394" src="//www.youtube.com/embed/QKcxhQZxvdw" frameborder="0" allowfullscreen></iframe>
<p>The Xylobands were given out for free to concert attendees. They sport LEDs that light up in sync with the performance. <strong>[FIXME]</strong> It's really cool to see the entire crowd flash with the beat of the music.</p>
<p>In June 2012, Disney rolled out their <strong>Glow with the Show</strong> ears at select Disney parks.</p>
<iframe width="700" height="394" src="//www.youtube.com/embed/qVe93Vhbpxk" frameborder="0" allowfullscreen></iframe>
<p>While the Xylobands flash, blink, and glow in a single color determined by the plastic casing, the Disney ears are translucent white and have RGB LEDs built into the body, allowing them to glow in any color. In addition, the Disney ears also support more sophisticated patterns than the Xylobands.</p>
<p>Some of the Disney ears patterns shown in the video include:</p>
<ul>
<li>blending from one color to another,</li>
<li>fading on and off smoothly, and</li>
<li>displaying independent colors and fades on each ear.</li>
</ul>
<h1 id="wecandobetter">We can do better.</h1>
<ul>
<li>Crowds aren't blobs</li>
<li>They're people</li>
<li>Screens (2D pixel arrays) are cool</li>
<li>Displaying coherent patterns on free-form blobs of pixels creates an incredible effect</li>
</ul>
<iframe width="700" height="394" src="//www.youtube.com/embed/0bKNnXUMQ9k" frameborder="0" allowfullscreen></iframe>
<h1 id="techspecs">Tech Specs</h1>
<p>Here's a quick overview of</p>
<p><strong>Glow with the Show ears</strong></p>
<ul>
<li>Translucent plastic enclosure</li>
<li>IR blaster at front of stage sends signal to <strong>Vishay TSMP6000</strong> IR receiver</li>
<li>Each device repeats IR from receiver on front to emitter on back</li>
<li><strong>TI MSP430G2553</strong> microcontroller contros RGB LEDs in ears</li>
<li>Runs on 3 AAA batteries</li>
<li>All devices flash the same patte (!!)rn during the show</li>
<li><strong>$25 (!!)</strong> at park kiosks</li>
</ul>
<p><strong>Coldplay Xyloband</strong></p>
<ul>
<li>Opaque colored plastic enclosure mounted on nylon wristband strap</li>
<li>Each device has its own color</li>
<li><strong>Atmel ATmega48PA</strong> (according to <a href="http://hackaday.com/2012/02/19/ask-hackaday-did-you-catch-the-grammys/">Hackaday</a>) or <strong>Silicon Labs 8-bit µC</strong> (according to <a href="https://www.youtube.com/watch?v=5s2NQnBgIEw">CarlsTechShed</a>) is probably the microcontroller being used</li>
<li>Operator can select to pulse all bands or select colors independently from one another</li>
<li><strong>SI4313</strong> RF receiver <a href="http://mplewis.com/files/si4313.pdf">(PDF datasheet)</a></li>
</ul>
<p>Don't forget to <a href="https://www.youtube.com/watch?v=5s2NQnBgIEw">check out the teardown</a> of the Xyloband—thanks, <a href="https://www.youtube.com/user/CarlsTechShed">CarlsTechShed</a>!</p>
<h1 id="whydotheysuck">Why do they suck?</h1>
<ul>
<li>Single setting for the entire crowd</li>
<li>No way to treat the crowd like a screen</li>
<li>Devices aren't interactive—users don't give back to the show</li>
</ul>
<h1 id="devicerequirements">Device Requirements</h1>
<p><strong>Devices need to:</strong></p>
<ul>
<li>Be cool</li>
<li>Be light</li>
<li>Be wearable</li>
<li>Have an RGB LED</li>
<li>Receive data from a base station</li>
<li><strong>Be individually addressable</strong>—this is the one thing these devices should do but don't</li>
<li>Be cheap enough that people will buy them at a gift shop or that the price can be factored into a show ticket ($10)</li>
</ul>
<p><strong>Devices could:</strong></p>
<ul>
<li>Have an accelerometer</li>
<li>Translate live accelerometer data into visualizations</li>
<li>Return accelerometer data to the base station</li>
<li>Bounce signals back to other devices</li>
<li>Be controlled by DMX via an adapter at the base station for use in shows with DMX setups</li>
</ul>
<!--kg-card-end: markdown-->