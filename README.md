# Space Invaders

A classic **Space Invaders** game built using **HTML, CSS, and Vanilla JavaScript (ES6 Modules)**.

This project was developed to practice JavaScript game development concepts such as the game loop, collision detection, object-oriented programming, timers, state management, and DOM manipulation.

---

## Features

- 🎮 Player movement
- 🚀 Player shooting
- 👾 Multiple enemy types
- 🛸 UFO bonus enemy
- 💥 Collision detection
- 🛡️ Defensive shields
- ⏸️ Pause menu
- 🏆 Win screen
- 💀 Game Over screen
- 🎯 Score tracking
- ✨ Explosion animations

---

## Project Structure

```text
.
├── app
│   ├── bullet.js          # Bullet logic
│   ├── collision.js       # Collision detection
│   ├── draw.js            # Rendering game objects
│   ├── genertorHTML.js    # Creates game HTML elements
│   ├── input.js           # Keyboard input handling
│   ├── mob.js             # Enemy classes and behavior
│   ├── player.js          # Player class
│   ├── scene.js           # Create enemies, shields and game scene
│   ├── state.js           # Global game state
│   ├── switcherHTML.js    # Switch between game screens
│   └── timer.js           # Timer utility
│
├── assets
│   ├── css
│   │   ├── game.css
│   │   ├── gameOver.css
│   │   ├── global.css
│   │   ├── pause.css
│   │   ├── start.css
│   │   └── YouWin.css
│   │
│   └── img
│       ├── background.png
│       ├── bullet_player.png
│       ├── crab_1.png
│       ├── crab_2.png
│       ├── exp.png
│       ├── missile.png
│       ├── octpus_1.png
│       ├── octpus_2.png
│       ├── player_exp.png
│       ├── player.png
│       ├── squid_1.png
│       ├── squid_2.png
│       ├── ufo.png
│       └── ufo_exp.png
│
├── game.js                # Main game mechanics
├── main.js                # Application entry point
├── index.html             # Main HTML page
└── README.md
```

---

## Technologies

- HTML5
- CSS3
- JavaScript (ES6 Modules)

---

## How the Game Works

The game follows a classic game loop powered by `requestAnimationFrame()`.

Every frame the game:

1. Reads keyboard input.
2. Updates the player.
3. Moves enemies.
4. Updates bullets.
5. Checks collisions.
6. Removes destroyed objects.
7. Draws the next frame.

---

## Main Modules

### `main.js`

The application's entry point.

Responsible for:

- Initializing the game
- Starting the game loop
- Connecting all modules together

---

### `game.js`

Contains the core gameplay logic.

Examples include:

- Enemy movement
- Bullet movement
- Shooting
- Explosion cleanup
- Game updates

---

### `app/player.js`

Implements the player object.

Responsibilities:

- Player movement
- Shooting bullets
- Player state

---

### `app/mob.js`

Contains all enemy behavior.

Responsibilities:

- Enemy movement
- Enemy shooting
- Enemy animations
- UFO behavior

---

### `app/bullet.js`

Handles bullet creation and updates.

Supports:

- Player bullets
- Enemy bullets

---

### `app/collision.js`

Detects collisions between game objects.

Checks interactions between:

- Bullets ↔ Enemies
- Bullets ↔ Player
- Bullets ↔ Shields
- UFO ↔ Bullets

---

### `app/input.js`

Tracks keyboard input.

Keys used:

| Key | Action |
|------|--------|
| ← | Move Left |
| → | Move Right |
| Space | Shoot |

---

### `app/scene.js`

Builds the initial game scene.

Creates:

- Enemy formations
- Shields
- Initial game objects

---

### `app/draw.js`

Responsible for rendering and updating visual game objects.

---

### `app/state.js`

Stores the global game state.

Examples:

- Current score
- Player instance
- Enemy list
- Bullets
- Timers
- Current game status

---

### `app/timer.js`

Provides a reusable timer class used throughout the project.

Used for:

- Enemy movement
- Enemy shooting
- UFO spawning
- Animation timing

---

### `app/genertorHTML.js`

Creates the HTML elements required by the game dynamically.

---

### `app/switcherHTML.js`

Controls switching between screens such as:

- Start
- Pause
- Game Over
- Victory

---

## Assets

### CSS

The project separates styles into multiple files:

- `global.css` — Global styles
- `game.css` — Gameplay styles
- `start.css` — Start screen
- `pause.css` — Pause menu
- `gameOver.css` — Game over screen
- `YouWin.css` — Victory screen

### Images

The `assets/img` folder contains:

- Player sprite
- Enemy sprites
- UFO
- Bullets
- Missiles
- Explosion sprites
- Background

---

## Concepts Practiced

This project demonstrates:

- ES6 Modules
- Object-Oriented Programming (OOP)
- Game Loop
- `requestAnimationFrame`
- Collision Detection (AABB)
- State Management
- DOM Manipulation
- Keyboard Events
- Timers
- Animation
- JavaScript Classes
- Modular Project Structure

---

## Running the Project

Clone the repository:

```bash
git clone https://github.com/your-username/space-invaders.git
```

Go to the project folder:

```bash
cd space-invaders
```

Run a local server.

Example using Python:

```bash
python -m http.server
```

Then open:

```
http://localhost:8000
```

Or simply use the **Live Server** extension in VS Code.



## Author

**Mohammed Sarar**

A learning project created to improve JavaScript programming and game development skills.

---

## License

This project is licensed under the MIT License.