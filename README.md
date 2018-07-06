# project1_World_DOM-ination
A map based domination game.


This game will be similar to Risk where the point is to dominate the whole map against adversaries. 


                                           *Game Synopsis.*
                                    
Each player will start with 2 territories randomly and will receive 3 turns to move to either expand
and or battle for control of the whole map.

Battling has different outcomes based on chance! When you battle for a square you could win/lose or win and also steal a square from player. So when you battle the board could change pretty dramaticaly based on if you steal some squares.

```

                                     *battle*

When two armies meet they can battle for the ownership of a territory and it's precious +1 army on refresh.

If a player has 1 army on a territory then the player can neither attack or defend.
This player will always lose if attacked.

to keep it interesting there will be a random battle selector to determine if the armies win/lose or draw.


                                  *Battle Logic*
```
4 outcoems:
  1/4 chance of: player 1 losing the battle
  1/4  chance of: player 2 losing the battle
  1/10 chance of: player 1 losing an EXTRA random square :(
  1/10 chance of: player 2 losing an EXTRA random square :(
```

                                           *How to Win?*

Control all the squares.. but becareful about battling too much because you may end up losing more of your squares
than you bargained for.


Thanks!

