# project1_World_DOM-ination
A map based domination game.


This game will be similar to Risk where the point is to dominate the whole map against adversaries. 


                                           *Game Synopsis.
                                    
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
This examples assume
  Player 1 -> attacks -> Player 1
    1. (TW) total win no loss in army. Player 1 gains territory.
    2. (TL) total loss.
                   Player 1 is left with 1 army on the same territory.
                   Player 1 loses all their armies used for attack.
                   Player 2 doesn't lose any armies and retains control of their territory.

    3. (PW) partial win. Player 1 wins territory but loses 1/2 of armies.
    Player 2 loses territory and armies.

    4. (PL) partial loss. Player 1 and Player 2 keep territories but lose 1/2 of armies.
```
                        *Possible outcomes // assumes 1 territory*  
```								 
Player 1 (1 army) -> attacks -> player 2 (1 army)
  - no outcome. 1 army can't attack.

Player 1 (2 army) -> attacks -> player 2 (1 army)
  - Total Win
      1. P1 Gains P2 territory and keeps all armies.
      2. P1 - 2 territories with 1 army on each
      3. P2 - 0 territories with 0 armies on each.
  - Total Loss
      1. P1 doesn't gain P2 territory and is left with 1 army.
      2. P1 - 1 army on 1 territory
      3. P2 - 1 army on 1 territory
  - Draw
      1. No change with P1 & P2

Player 1 (3 army ) -> attacks -> player 2 (2 army)
  - Total Win
    1. P1 Gains P2 territory and keeps all armies
    2. P1 - 2 territories with two armies on the conquered territory
       and 1 army on the original territory for (3 armies) 
    3. p2 - 0 territory and 0 armies.
  - Total Loss
    1. P1 loses 2 armies used in attack and gains no territory.
    2. p1 - 1 army on 1 territory
    3. p2 - 2 armyon 1 territory.
  - Partial Win.
    1. P1 gains p2 territors but loses 1/2 of their armies (rounded)
    2. p1 - 2 territories but only 1 army on each (rounded from 3).
    3.p2 - 0 territories and 0 armies
  - Partial Loss
    1. p1 loses some armies in attack and p2 loses some armies.
    2. no territory change.
    3. p1 - 2 army and 1 territory
    4. p2 - 1 army and 1 territory.
  - Draw
    1. No change with p1 & p2 
```

                           *army generation / end of turn *
Once your turn has ended you are eligble for new armies to spawn equal to the # of territories you are in control of.

player 1 has 5 territories and 10 armies ( 2 per territory) = at end of turn p1 will have 5 additional armies (15 total).
the additional 5 will be put near the 'front line'.

Once multiple territories have been won the new armies will generate on the 'front line'.
the 'front line' is last selected territories from turn. This will make sure new armies generate where you need them.

                                  *How to win*

Control all the squares.

Once all players have played their turn then 
The game ends with a player winning all territories.


To prototype the beginning. I will try to make just a random army generator from 1-2 to be added to each square of each player. Then I will try to implement the tiered total win, partial win, partial loss, & draw functionality to make game play more interesting.


Thanks!

