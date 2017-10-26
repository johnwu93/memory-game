# Memory Game
This web-based game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:
- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, they are revealed up until the player flips another card

The game ends once all cards have been correctly matched.

The game can be played in on
https://johnwu93-memory-game.herokuapp.com/ 


## Installation
This project requires multiple dependencies. In order to get these dependencies, you need to install 
[npm](https://www.npmjs.com/). Details for installing this package can be found on this
[link](https://www.npmjs.com/get-npm). After installing `npm`,  run the following to get all module
dependencies on the terminal:

```
npm install
```

Afterwards, you will need to install a some Ruby dependencies for this project, such as [SASS](http://sass-lang.com/) 
by using the package manager, Bundler. You can find more information about this manager on this link,
[link](https://github.com/bundler/bundler).

If you have a MacOsX, you can install `bundler` with the following command:

```
sudo gem install bundler
bundle install
```

If you do not have the binaries, `gem` or `ruby`, you may need to install 
`ruby` from this [link](https://www.ruby-lang.org/en/documentation/installation/) and `gem` from this [link](https://rubygems.org/gems/rubygems-update-2.6.14.gem) 

## Usages

With these installed modules, you will need to all the bundled all the javascript files into one file with the 
following command on the terminal:

```
npm run-script build
```

The project can be viewed by first running it on a local server with the 
following command;

```
npm run-script watch
```

The website should pop up automatically. If it doesn't, look at the terminal window that called the previous task.
It will tell you what is the localhost url. Copy and paste that url link to your browser. The url should look something like
this:

```
http://localhost:3000
```

If you have any trouble running this project or have some concerns, 
please notify me through my email, johnwu93@gmail.com

## Architecture
All the style sheets are written in `.scss` and can be found in `src/styles`. They are organized based
on the views that uses them.

The MVC pattern guided the structure of the project
which, in real-life should not be the case according to the book, [Clean Code](https://www.safaribooksonline.com/library/view/clean-architecture-a/9780134494272/)).

The project is divided by views and models. The model drives the logic of the game.
The views gets input from the user and then sends them to the models. The views will also get notifications from the 
models on how it should be updated.
They are tied together using the controllers, which binds notifiers from the model and the controllers to talk to each other 
without them knowing each other's implementations. This is done by using callbacks.

The model is the most important component of the project as it drives the business logic of the game.
`model/game` is the main channel that processes all the moves of the game and updates the recorded statistics of the game.
The logic is delegated by the abstract class `model/gameengine`.

We can see from the game that there are three primary states/context:
1. Player is selecting the first card of a pair
2. Player is selecting the second card of a pair after selecting the first
3. Player has two mismatched cards
The implementation of this can be found in `model/gamecontext`.
`model/gameengineimpl` implements the logic for the game and dictates how one state will transition to another state
using the games rules. 

The logic of the game can be demonstrated through the test cases. under `test/`

Please feel free to comment on the organization of this project. I would love to hear them. 

## Bugs and Issues [Important!]
If you click on the icons very fast, then it can cause some data races, which can
lead to unexpected behavior for the game. It is advised to wait until all the animations
have been rendered before making a turn. 

These issues will less likely to occur if it is played on a local machine. 

Also, you may have issues running the app on your local machine. There was issue were the css was
not processed correctly. If the game is not processed correctly, then please check the heroku-hosted
app, https://johnwu93-memory-game.herokuapp.com/. This is the production version of the app.
