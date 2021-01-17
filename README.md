# Conway's "Game of Life"

[![Build Status](https://travis-ci.org/ivan-gerasin/game-of-life.svg?branch=master)](https://travis-ci.org/ivan-gerasin/game-of-life)

**Status:** _in development_, no any releases yet.

## Highlights:

-   This repo contains implementation of "Game of life" written in typescript
-   Goal of this project - bit of practice in OOP and architecting inspired by [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert Martin
-   This project is supposed to easily make&run new rules and etc
-   It runs in browser via Canvas, but should be easily to adopt for other rendering engines
-   But generally, main goal for me - is to have fun :)

## Current state

-   Game engine is complete in definition that it can run classic rules
-   It does not interactive
-   Driven only by code
-   Allow to write cells set with custom rules
-   Allow to code initial state with simple symbol array

## Install:

This project was tested only on linux, but I think it also can be easily run in other systems.

-   You need to have installed `nodejs` (with `npm`), at least 12 version.
-   Clone or download this repo, and run `npm i` inside directory with `package.json`

## Run:

Please, make sure that you're using latest version of your browser.
Just run `npm run server` and it start small dev-server.
You can open it at `http://localhost:1234`.

It will start pre-defined game with no any control at this moment.
Right now you need dive into the code by yourself to adjust it to your needs.

## Plans:

### For first release

-   Enrich code with documentation
-   Add developers guide
-   Increase coverage with unit tests
-   Add interactive stuff (GUI)

    -   choose rule set
    -   place/remove cells by mouse click
    -   time control - interval between generation, start/stop

### For future releases

-   Probably add some CI things
-   Preset library - pick element from library and place it on field
-   Rotate/mirror preset when placing it
-   Save/load world state
-   Detecting no changes between generations - notify and auto stop
-   Detecting cycled worlds - calculate it period.
