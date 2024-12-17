---
title: Submitting a Python CLI Tool to PyPI
slug: submitting-a-python-cli-tool-to-pypi
date: 2014-07-21T00:19:15.000Z
---
<!--kg-card-begin: markdown--><p>Last week, I built a command-line tool, <a href="https://github.com/mplewis/csvtomd">csvtomd</a>, to help me write documentation for my personal and work projects. Building Markdown tables by hand can be tedious and often involves lots of manual spacing tweaks to make the source code look just as good as the rendered table. With csvtomd, you can build a table in Excel or Numbers, export it as CSV, and convert the CSV to a Markdown table.</p>
<p>I wrote this tool in Python 3 and wanted to make it available to other developers. The best way to distribute Python 3 packages is to upload your package to the <a href="https://pypi.python.org/pypi">Python Package Index, or PyPI</a>. Once a package is on PyPI, other developers can install your package with a simple command:</p>
<pre><code>pip3 install csvtomd
</code></pre>
<h1 id="helpfulhelp">Helpful Help</h1>
<p>Here are a few of the articles that helped me put my package online:</p>
<ul>
<li><a href="http://guide.python-distribute.org/creation.html">The Hitchhiker's Guide to Packaging</a></li>
<li><a href="https://coderwall.com/p/qawuyq">Use Markdown READMEs in Python modules</a></li>
</ul>
<p>The most useful tutorial I found was <a href="https://hynek.me/articles/sharing-your-labor-of-love-pypi-quick-and-dirty/">Sharing Your Labor of Love: PyPI Quick And Dirty</a> by <a href="http://hynek.me">Hynek Schlawack</a>. It's a great, simple introduction to getting your Python code ready for PyPI and uploading it as a standalone package.</p>
<h1 id="pypiandcliscripts">PyPI and CLI Scripts</h1>
<p>One of the hiccups I discovered while trying to install my CLI app was that all the tutorials I found involved creating packages for use in other Python scripts. I had to figure out how to set the entry point to my application so that I could run it properly from the command line.</p>
<p>My solution was to add this <code>entry_points</code> line to my <code>setup.py</code>:</p>
<pre><code class="language-python">setup(
    ...
    entry_points={
        'console_scripts': [
            'csvtomd = csvtomd:main'
        ]
    },
    ...
)
</code></pre>
<p>To make this entry point work, I had to modify my <code>csvtomd.py</code> script. Originally, my script's main module code—parsing arguments, running the conversion—was located outside a function and ran in the body of the main script. I had to move that code into a <code>main()</code> function.</p>
<p>For convenience, I added a runner for executing the script standalone:</p>
<pre><code>if __name__ == '__main__':
    main()
</code></pre>
<h1 id="pypiandmarkdown">PyPI and Markdown</h1>
<p>Will McKenzie came up with <a href="https://coderwall.com/p/qawuyq">a nifty solution</a> for using Markdown READMEs in PyPI packages. Here's the problem:</p>
<ul>
<li>PyPI uses ReStructuredText to render READMEs</li>
<li>GitHub uses Markdown to render READMEs</li>
</ul>
<p>Will's solution was to do the following:</p>
<ol>
<li>Create a wrapper called <code>register.py</code></li>
<li>Have <code>register.py</code> convert <code>README.md</code> (Markdown) to <code>README.txt</code> (ReStructuredText)</li>
<li>Have <code>setup.py</code> read the <code>README.txt</code> file as its <code>long_description</code> property on PyPI</li>
</ol>
<p>I had problems with the pyandoc library, so I took Will's idea and rebuilt it slightly differently into <code>setup_wrap.py</code>:</p>
<pre><code class="language-python">import sys
import os
import subprocess
import pypandoc

with open('README.rst', 'w') as dest:
    long_description = pypandoc.convert('README.md', 'rst')
    dest.write(long_description)

args = ['python3', 'setup.py'] + sys.argv[1:]
subprocess.call(args)

os.remove('README.rst')
</code></pre>
<p><code>setup_wrap.py</code> does the following:</p>
<ol>
<li>Converts <code>README.md</code> to <code>README.rst</code> using <a href="https://github.com/bebraw/pypandoc">pypandoc</a></li>
<li>Runs <code>python3 setup.py</code> and passes along its own arguments</li>
<li>Deletes <code>README.rst</code> after <code>setup.py</code> is done</li>
</ol>
<p>Additionally, I added the following to <code>setup.py</code>:</p>
<pre><code class="language-python">with open('README.rst') as f:
    long_description = f.read()

setup(
	...
    long_description=long_description,
    ...
)
</code></pre>
<p>So now, instead of running <code>python3 setup.py sdist</code>, just run <code>python3 setup_wrap.py sdist</code> and you'll have a very pretty README on both GitHub and PyPI.</p>
<!--kg-card-end: markdown-->