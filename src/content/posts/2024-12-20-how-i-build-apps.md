---
title: How I Build Frontend Apps
slug: how-i-build-frontend-apps
date: 2024-12-20T14:27:34-07:00
---

I've written a bit about [how I deliver software](/how-i-ship-it), and now I
want to share some of the details around how I build the browser side of web
applications when I'm in charge of the project.

# Language: TypeScript

My main tool is [TypeScript](https://www.typescriptlang.org/), which I use
whenever it's feasible. I think that writing your projects in TS is the obvious
best decision for the vast majority of webapps for several reasons:

- **Just use one language.** TypeScript and npm packages work great on both
  frontend and backend.
- **Great frontend/backend interop story.** Frameworks like
  [RedwoodJS](https://redwoodjs.com/) provide type safety across your frontend
  clients and backend APIs, and they make it easy to define templates to be
  rendered at various points in your app lifecycle: pre-rendered static bits,
  dynamic on content load, etc. Full-stack TS frameworks do a much better job of
  updating partially dynamic content in statically rendered HTML without
  requiring the entire app to be a big blob of single-page JavaScript
  application.
- **Massive ecosystem.** The new data format you're trying to work with probably
  has an npm package. If you're solving something that three or more developers
  have ever had to solve – structured logging, ANSI terminal colors,
  authentication, data validation – npm almost certainly has a package for you.

TypeScript does have a couple of drawbacks which occasionally make Go the better
language to solve some problems:

- **Poor compute concurrency.** Node.js runs CPU-intensive tasks in a
  single-threaded event loop. If you are doing a lot of parallel computation or
  managing big stacks of deferred tasks, Goroutines solve your problems better.
- **Complex runtime.** Setting up a TypeScript project is non-trivial: you need
  to configure tsc, set up `package.json` scripts, decide between ESModules or
  CommonJS, set up linting rules and formatters... and then to run your project
  on a remote machine, you need Node.js installed. The Go language comes with
  those tools out of the box and compiles your program into a static binary with
  no dependency requirements.

# Components: Astro & React

For my static sites, [Astro](https://astro.build/) is my framework of choice. It
comes with the
[Astro component language](https://docs.astro.build/en/reference/astro-syntax/),
as well as a bunch of other helpful components which work best in Astro. For
example, the
[`<Image>` and `<Picture>` components](https://docs.astro.build/en/guides/images/)
make it easy to drop your images into your repo and let the framework resize
your images to the appropriate size for your target browsers. For work that
doesn't include a lot of frontend logic, Astro provides enough for you to build
an adequate compmonent-based architecture.

When I need interactivity, I add [React](https://react.dev/) to my Astro apps. I
first started using React in 2013 when it was released, and shortly after that,
I discovered [Vue v1](https://v1.vuejs.org/guide/index.html) which I found was
more effective. Vue provided "batteries included" features like state management
and styling which React wasn't really prepared to solve yet. But as React has
grown, it's become a real competitor: its integrations with state and styling
libraries are now excellent. The main reason I like modern React is its
functional components with [hooks](https://react.dev/reference/react/hooks).
With these tools, I find it very easy to reason about the data flow through a
function which returns a JSX blob which ends up in my page.

# State Management: Jotai

Sometimes passing state up and down from component to parent and back gets
cluttered and unwieldy. [Jotai](https://jotai.org/) is a minimal library which
provides _atoms,_ singletons that encapsulate a piece of stateful data. Atoms
are defined globally and can be used throughout your app, allowing you to
teleport important data wherever it needs to appear in the DOM. It also supports
[storage](https://jotai.org/docs/utilities/storage), so you can use the atomic
paradigm to persist data such as session tokens between page loads. Most
importantly, it works very well with React via the
[`useAtom` hook](https://jotai.org/docs/core/use-atom).

# Styling: Tailwind

To make my UI usable, I use [Tailwind](https://tailwindcss.com/), a CSS
framework with great tooling based on utility classes. In the past, I've used
[Bulma](https://bulma.io/) to build my apps. It's a great CSS framework with
opinions included, but eventually I find that I want more flexibility over my
design language, and Tailwind provides this for me.

Using Tailwind for your styling brings many advantages:

- **Comprehensive coverage.** An extensive
  [docs library](https://tailwindcss.com/docs/installation) includes every
  single CSS feature, from flexbox to grid to `max-width` containers with
  screen-sized breakpoints. With a well-selected library of
  [named custom colors](https://tailwindcss.com/docs/customizing-colors), you
  may not even have to open a hex picker.
- **Skip writing CSS.** No, really – 99% of what you need to do in your app can
  be done by adding classes to an HTML element. You mostly don't need to write
  CSS by hand to implement a desired design.
- **Editor integration and linting.** VSCode can help you autocomplete valid
  Tailwind classes and warn you when you're making mistakes like overwriting
  Y-axis padding values `py-3` with `py-4`.
- **Theming and plugins.** Tailwind lets you customize the class names available
  for use by configuring the [theme](https://tailwindcss.com/docs/theme). Your
  custom names are available across your class: creating `fontFamily.funky`
  automatically creates the `text-funky` class, even in your IDE's autocomplete.
- **Performant builds.** Tailwind automatically optimizes its production build
  to only include the class definitions which are directly relevant to your
  application. If you don't use a feature, it isn't included in the final CSS.

It also adds a few complications:

- **Component systems are required.** Copying `px-2 py-3 my-4` into all of your
  `<Button>`s is tedious at best and a source of mistakes at worst. If you're
  using a system that is primarily doing server-side HTML templating and makes
  it hard for you to compose your app out of components, using only CSS utility
  classes may create more problems than it solves.
- **Build system integration.** You need to configure Tailwind to work with your
  app's build system. If you have to do this by hand, you might be in for pain.
  Luckily,
  [Astro](https://docs.astro.build/en/guides/integrations-guide/tailwind/) and
  [RedwoodJS](https://docs.redwoodjs.com/docs/tutorial/intermission/#using-your-current-codebase)
  both include plugins for Tailwind support.
