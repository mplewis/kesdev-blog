---
title: You got LaTeX in my Markdown!
slug: you-got-latex-in-my-markdown
date: 2014-10-21T06:51:05.000Z
---
<!--kg-card-begin: markdown--><p><em><strong>Working title: You got Markdown in my LaTeX!</strong></em></p>
<p>I hate writing documents in Microsoft Word and Apple Pages. I spend way too much time fiddling with formatting, page layout, and typesetting before everything looks the way I want it. And writing math equations, even with Word's GUI equation editor, is tedious and takes too much clicking. I'm a programmer—just let me use LaTeX's equation format instead!</p>
<p><strong><code>tl;dr</code> If you want to write documents in Markdown, embed LaTeX, and generate PDFs, use <a href="http://johnmacfarlane.net/pandoc/">Pandoc</a>.<br>
Skip down to <em>Kung Fu Pandoc</em> to get started!</strong></p>
<h1 id="sojustuselatextheysaiditllbefuntheysaid">So just use LaTeX, they said. It'll be fun, they said.</h1>
<p>I like typesetting tools, and I like LaTeX... with reservations. Some of my complaints:</p>
<ul>
<li>The boilerplate needed to get a TeX document up and running is <a href="https://www.google.com/search?q=latex%20boilerplate">pretty massive</a>.</li>
<li>LaTeX is a <strong>pain in the ass</strong> to write. There is so much character overhead behind basic formatting.
<ul>
<li>Bold? <code>\textbf{bolded text}</code>.</li>
<li>Inline code? <code>\texttt{for (int i = 0; i &lt; 42; i++)}</code></li>
<li>Basic tables? <a href="http://en.wikibooks.org/wiki/LaTeX/Tables">Here's a short reference.</a></li>
</ul>
</li>
<li>Holy reserved characters, Batman! Here are things you can't write in LaTeX without escaping:</li>
</ul>
<pre><code># $ % ^ &amp; _ { } ~ \
</code></pre>
<p>It's not like I'd ever want to use a dollar sign in my budget report or an underscore in my C code.</p>
<ul>
<li>If you don't escape a character properly, you'll probably get a syntax error. LaTeX's syntax errors are cryptic and terrifying:
<ul>
<li><code>Missing $ inserted</code>: could mean just about anything, such as: you put too many lines inside an equation block, or you forgot to close a curly bracket.</li>
<li><code>No line here to end</code>: means that you tried to continue a line when LaTeX &quot;didn't expect it&quot;. <a href="http://www.tex.ac.uk/cgi-bin/texfaq2html?label=noline">When does LaTeX expect it? God only knows.</a></li>
<li>Not confusing enough for you? <a href="http://tex.stackexchange.com/questions/125399/how-to-trace-latex-errors-efficiently">There are more errors where those came from.</a></li>
</ul>
</li>
</ul>
<h1 id="wouldntitbeniceif">Wouldn't it be nice if...</h1>
<p>This semester, I tried to write an assignment for class and found out my LaTeX build chain in Sublime broke. Instead of trying to troubleshoot it, I started thinking about what I'd like to use instead.</p>
<p>Here's why I love LaTeX:</p>
<ul>
<li>It lets me write equations quickly. Its equation syntax makes sense to me, and it's easy to <s>steal</s> import equations from Wikipedia pages.</li>
<li>It's a typesetting program, not a WYSIWYG. No more screwing around with weird margin sliders and page layout tools and header settings: simply throw in your text, edit the settings once, and watch all your text reflow into place.</li>
<li>It's easy to generate a PDF from a LaTeX file.</li>
</ul>
<p>Here's why I prefer Markdown as a language to write formatted text:</p>
<ul>
<li>It's SUPER lightweight. <code>**bold**</code>, <code>*italic*</code>, ```inline code` ``.</li>
<li>GitHub-flavored Markdown is super cool. It adds support for syntax-highlighted code blocks and tables! I like it so much I built a tool to <a href="https://github.com/mplewis/csvtomd">generate Markdown tables from CSV files</a>.</li>
<li>You probably already know its syntax if you use GitHub or Reddit frequently.</li>
</ul>
<p>I asked myself: &quot;Self, wouldn't it be great if there were a typesetting tool that let you write documents in Markdown, embed LaTeX where you needed it, and generate PDFs?&quot; And it turns out that already exists.</p>
<h1 id="kungfupandoc">Kung-Fu Pandoc</h1>
<blockquote>
<p>If you need to convert files from one markup format into another, pandoc is your swiss-army knife.</p>
<p>—<cite>John MacFarlane, author of pandoc</cite></p>
</blockquote>
<p>We'll use this Swiss Army knife called Pandoc to compile and export our Markdown-LaTeX docs. Let's try it out!</p>
<h2 id="installpandocandlatex">Install Pandoc and LaTeX</h2>
<p>You'll need Pandoc and pdfTeX installed. If you can run <code>pandoc</code> and <code>pdflatex</code> from a terminal, you're probably good to go.</p>
<p>If you're on a Mac, install Pandoc using <a href="http://brew.sh/">Homebrew</a> (<code>brew install pandoc</code>) and <a href="https://tug.org/mactex/">install MacTeX</a> using their <code>.pkg</code> installer.</p>
<h2 id="getyoursourcedoc">Get Your Source Doc</h2>
<p><a href="http://mplewis.com/files/pandoc-md-latex/example.md">Here's a sample Markdown-plus-LaTeX document you can try to compile.</a> Save that file somewhere as <code>example.md</code>.</p>
<h2 id="compileyourdoc">Compile Your Doc</h2>
<p>Here's the command I used to compile <code>example.md</code> —&gt; <code>example.pdf</code>:</p>
<pre><code>pandoc -o example.pdf example.md
</code></pre>
<p>See? It's that easy. Now open your PDF and you should see something like this:</p>
<img alt="Markdown as PDF" src="http://mplewis.com/files/pandoc-md-latex/example.png" width="400" style="border: 1px solid #ccc">
<p>Awesome. You're one step closer to well-documented world domination.</p>
<h1 id="automatethatishwithsublimetextsbuildsystems">Automate That Ish with Sublime Text's Build Systems</h1>
<p>Great! Now you can build Pandoc Markdown docs manually from the command line.</p>
<p>If you use Sublime Text like me, you might use the <strong>Build</strong> command (<code>F7</code> or <code>Cmd+B</code>) to build and run your scripts. When I used <a href="https://github.com/SublimeText/LaTeXTools">LaTeXTools</a>, I got really used to checking how my LaTex looked when it was rendered by hitting <code>Cmd+B</code>. The LaTeX build command rendered my source document and opened a PDF viewer with the results.</p>
<p>I duplicated this in Sublime Text. Here's how you can too!</p>
<h2 id="createanewsublimebuildfile">Create a new Sublime-Build file</h2>
<p><strong>Sublime-Build</strong> files tell Sublime Text how you want to build a document when you hit Ctrl-B.</p>
<p>Create a new Sublime-Build file by selecting <code>Tools —&gt; Build System —&gt; New Build System...</code></p>
<p>You'll get a document named <code>untitled.sublime-build</code> that looks like this:</p>
<pre><code>{
    &quot;shell_cmd&quot;: &quot;make&quot;
}
</code></pre>
<h2 id="writeyourpandocbuildcommand">Write Your Pandoc Build Command</h2>
<p>Replace the contents of your new document with the following:</p>
<pre><code>{
    &quot;shell_cmd&quot;: &quot;pandoc -o \&quot;$file.pdf\&quot; \&quot;$file\&quot; &amp;&amp; open -a Preview \&quot;$file.pdf\&quot;&quot;,
    &quot;selector&quot;: &quot;text.html.markdown&quot;,
    &quot;path&quot;: &quot;/usr/texbin:$PATH&quot;
}
</code></pre>
<p>Then change a few things:</p>
<h3 id="ifyourenotonamacremovetheopenacommand">If you're not on a Mac, remove the <code>open -a</code> command.</h3>
<p><code>open -a Preview \&quot;$file.pdf\&quot;&quot;</code> is just for Macs—it opens the rendered file in Preview.app.<br>
If you're not on a Mac, strip off the <code>&amp;&amp;</code> characters and everything after them. Your <code>shell_cmd</code> will look like this:</p>
<pre><code>{
    &quot;shell_cmd&quot;: &quot;pandoc -o \&quot;$file.pdf\&quot; \&quot;$file\&quot;&quot;,
    ...
</code></pre>
<h3 id="removethepathsettingifyoudontwantiteasierjustleaveitin">Remove the <code>path</code> setting if you don't want it. Easier: just leave it in.</h3>
<p>I found my Sublime install couldn't find <code>pdflatex</code> unless I added this directory to the build system's path directly. You can probably leave it in—it shouldn't do any harm as long as Sublime can find <code>pdflatex</code>.</p>
<h2 id="saveyournewbuildcommand">Save Your New Build Command</h2>
<p>The default save location will be <code>Sublime Text 3/Packages/User</code>. Save the file you just created into that directory as <code>Markdown to PDF.sublime-build</code>.</p>
<h2 id="setbuildsystemtoautomatic">Set &quot;Build System&quot; to &quot;Automatic&quot;</h2>
<p>Select <code>Tools —&gt; Build System —&gt; Automatic</code> to ensure Sublime picks your new Markdown build system.</p>
<h2 id="buildamarkdownfile">Build a Markdown File!</h2>
<p>Open the <code>example.md</code> file you downloaded earlier in Sublime, then hit <code>F7</code> or <code>Cmd-B</code>. The Sublime Text console should open as it starts compiling your document, then print something like this when it's done:</p>
<pre><code>[Finished in 2.4s]
</code></pre>
<p>Check the directory holding <code>example.md</code> and look for a brand-new <code>example.md.pdf</code> file!</p>
<p>You did it! I am very proud of you.</p>
<h1 id="bonusroundcustomlatextemplates">Bonus Round: Custom LaTeX Templates</h1>
<p>You're a cool guy who knows cool stuff. Want to make your LaTeX docs even cooler? Add your own custom template.</p>
<p>Say I hate the default LaTeX monospace font and I want to add <code>\usepackage{inconsolata}</code> to fancy up my code blocks. Here's how I can do that:</p>
<ul>
<li>Save a LaTeX template somewhere on my computer</li>
<li>Edit that template and add the LaTeX packages I want</li>
<li>Ask Pandoc to use that template every time I compile my documents</li>
</ul>
<h2 id="getalatextemplate">Get a LaTeX template</h2>
<p>I used <a href="https://github.com/jgm/pandoc-templates/blob/master/default.latex">this <code>default.latex</code> template</a> provided by <a href="https://github.com/jgm">jgm</a>. Seems to work great!</p>
<p>I saved mine as <code>~/.pandoc/default.latex</code> because I think that's where Pandoc templates usually go.</p>
<h2 id="editthattemplate">Edit that template</h2>
<p>At <a href="https://github.com/jgm/pandoc-templates/blob/ec057f0ad3d191d18a2842e6a2fd41c471c6d97d/default.latex#L134">line 134</a>, I added some text to remind me where I can safely put <code>\usepackage</code> commands, as well as my custom command:</p>
<pre><code>%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ADD YOUR \usepackage{...} COMMANDS HERE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\usepackage{inconsolata}
</code></pre>
<h2 id="makepandocusethattemplate">Make Pandoc use that template</h2>
<p>I edited my <code>shell_cmd</code> inside my <code>.sublime-build</code> file from the following:</p>
<pre><code>&quot;shell_cmd&quot;: &quot;pandoc -o \&quot;$file.pdf\&quot; \&quot;$file\&quot; &amp;&amp; open -a Preview \&quot;$file.pdf\&quot;&quot;,
</code></pre>
<p>I added a command-line argument pointing Pandoc to my default template as shown:</p>
<pre><code>&quot;shell_cmd&quot;: &quot;pandoc --template=\&quot;/Users/mplewis/.pandoc/default.latex\&quot; -o \&quot;$file.pdf\&quot; \&quot;$file\&quot; &amp;&amp; open -a Preview \&quot;$file.pdf\&quot;&quot;,
</code></pre>
<p>Now Pandoc uses my new template and makes my typewriter text not suck. Hooray!</p>
<!--kg-card-end: markdown-->