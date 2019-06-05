# NgTicTacToe

- by Anthony L. Leotta

## Generating the project

1. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

1. First do a dry-run.

  ```
  ng new ngtictactoe --routing=true --skipGit=true --style=scss --directory=.	--dryRun=true
  ```

1. Next actually create the Application 

  ```
  ng new ngtictactoe --routing=true --skipGit=true --style=scss --directory=.	--dryRun=true
  ```

## Design 

1. Player Model
1. Board Component
1. Moves Component
1. Move Item Component
1. Game Control Component
  1. Reset Game
  1. Take back last move
  1. Hint
1. Scores Component
1. Score Item Component

## Creation Steps

1. First create the game board itself.

  ```
  ng generate component game-board --style=scss
  ```

1. Next create the the playing spaces

  ```
  ng generate component game-space --style=scss
  ```

1. Control the game with a service

  ```
  ng generate service game
  ```

1. Create a Player Class

  ```
  ng generate class player
  ```

1. Create a control panel

  Allow user to reset the game.  Display victory and score.
  ```
  ng generate component game-controls --style=scss
  ```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
