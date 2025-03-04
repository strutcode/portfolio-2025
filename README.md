# About Me

I'm a motivated self-started with over two decades of combined experience in a wealth of technologies. For more info why not [check my portfolio out live](https://strutcode.dev)?

# About This Project

This portfolio represents a collection of a few of my favorite technologies that I felt suit the purpose well. Below is a short list with explanation of my reasoning for each.

**Bun**

For raw speed. This project runs on a minimal server and resource consumption is important to me here. Practical benchmarks revealed that for the simple HTTP server use case here Bun is simply faster, plus native Typescript support and better module handling are nice bonuses.

**TypeScript**

A given. If I'm going to work in a browser ecosystem TypeScript is my language of choice to transpile into JavaScript. The minimal deviation from existing JavaScript APIs combined with the practical if not slightly limited type safety and error checking features make it a no-brainer.

**Vite**

One of my favorite tools as a low configuration and feature-rich layer on top of the fabulous `esbuild` core. It makes setup painless and lets me focus on rapid development.

**Vue**

Hands down the best reactive frontend framework out there. I find it to be the best compromise between the openness and inefficiency of React versus the raw speed but rigidity of something like Svelte.

**Biome + Prettier**

I like to be clean even with personal projects, which means having good formatting and linting rules. Biome is a convenient easy to configure alternative to the classic ESLint when the large ecosystem isn't as necessary.

Similarly, Prettier provides pretty good formatting with just enough available configuration for smaller code bases.

**Babylon.js**

WebGL is fun and makes for some very visually interesting effects.
Babylon is one of my favorite frameworks to use for the purpose as it
provides a lot of out of the box features while maintaining enough raw
power to not bog down on less capable devices.

# Usage

| Command         | Description                                             |
| --------------- | ------------------------------------------------------- |
| `bun install`   | Installs all the dependencies required for the project. |
| `bun run dev`   | Starts the development server.                          |
| `bun run build` | Builds the project for production.                      |
| `bun run serve` | Previews the production build locally.                  |
| `./server.sh`   | Starts the companion server.                            |

# Deployment Strategy

The eagle-eyed reviewer would notice that the web server is running insecurely over http; that's because in production it will be running behind a pre-configured reverse-proxy server with authentic certificates.

In practice all ports except 80 and 443 will be closed, and the reverse proxy will also be responsible for serving pre-built files from the `dist` folder. The Vite dev server is not to be used in production.
