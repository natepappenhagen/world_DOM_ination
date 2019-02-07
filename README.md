# World DOM-ination

### Summary

  * Turn Based 2 player (not-full stack) Risk-like game where the point is to dominate & _traverse_ the whole map.
  
### Description and Game-Play:
  - Each refresh of the page will re-load the game and will give each player two 'starting-points' on the map. These are random.
  
  - Each player will start with 2 territories randomly and will receive 3 turns to expand and attack. Once you have used your available moves then the next player turn will click their "player" button at which point that players available moves will be shown.
  
  - Battling has different outcomes based on chance! When you battle for a square you could win/lose or win and also steal a square from player. So when you battle the board could change pretty dramaticaly based on if you steal some squares. To make the game less deterministic I included a probability property to the 'battle function' that goes like:

    - 1/4 chance of: player 1 losing the battle
    - 1/4  chance of: player 2 losing the battle
    - 1/10 chance of: player 1 losing an EXTRA random square
    - 1/10 chance of: player 2 losing an EXTRA random square

### How to win?

Control all the squares! But be careful about battling too much because you may end up losing more of your squares than you bargained for.

### Next Steps

    * Tune the game play to be more interesting and not take so long to win/lose
    * Make this a full-stack game with the ability to save scores and usernames.
    * Create a proper AI computer for game play.
    * Re-build with react and no jQuery
