# 14 March 2023

* L0 since 8 March
* Call w/ Genadi, dynamo, dahoum
* Diary
* Genadi Specifics
  * Began w/ the logic
* Homework
  * Fix the motion
  * Try to build a "state of labyringh" array and to display the labyrinth w/ it w/ css clipping.

# 16 March 2023
* Labyrinth visuals from sprite sheet `done`
* TODO:
  * Create class 'Tile' that will represent each tile in code and expose methods, managing it `done`

# 17 March 2023
* Homework
  * Add the pacman to the map
  * Try to think of ways to implement movement of the pacman.

# 18 March 2023
* Add Pacman to map `done`
* TODO:
  * Animate him
  * Add controller

# 19 March 2023
* Initial Pacman animation (only for right direction)
    Sprites for characters will/are drawn on a transparent canvas element, placed on top of the labytinth layer
* TODO:
  * 4-way animations `done` 
  * Add controller `done`
* <ins>Edit</ins>: Pacman now has a controller(WASD) and is animated. Both objects expose methods to the GameEngine that manages them
  * TODO:
    * Collision check with underlying labyrinth

# 20 March 2023
  Homework
  * Make the pacman to move only in allowed tiles{not walls}
  * Add ghosts to the map

# 22 March 2023
  * TODO: Change game to use HTML Canvas instead of two div 'layers' `done`
  * <ins>Edit</ins>:
    * Draw map on screen based on initial level matrix
    * TODO: 
      * Add visuals from sprite sheet `done`
      * Add pacman to map `done`
  * <ins>Edit</ins>:
    * Added visuals to map from spritesheet `done`
  * <ins>Edit</ins>: 
    * Propper collision `DONE!`
    * Pacman animations restored `done`
    * TODO:
      * Add score pellets to map `done`
  * <ins>Edit</ins>: 
    * Added score pellets to map
    * *Win condition*: eat all pellets to win
    
Overall, whole day involved changes to the codebase, ranging from minor refactoring to major redesign. Master branch up to date 

# 23 March 2023
Homework
  * Make the pacman to teleport to the other exit when going out from one of the exits. `done`
  * Add ghosts to the map 
  * Make them move in randoom directions
<ins>Edit</ins>
  * Pacman doesn't exit map when going through middle corridors
  * TODO:
    * Add ghosts