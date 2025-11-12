# Rock · Paper · Scissors (React)

An interactive remake of the classic playground game built for CSC 372 Assignment 8. The app uses modular React components, hooks, and accessible UI patterns to let a player battle the computer with animated throws and persistent scoring.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the dev server**
   ```bash
   npm run dev
   ```
3. Open the printed local URL in your browser (default: `http://localhost:5173`).

## Gameplay Flow

- Click any throw (rock, paper, or scissors) in the Player panel.
- The Computer panel shows a question mark, then shuffles through all throws every 500 ms for 3 seconds before locking in a random choice.
- The Result panel announces whether you won, lost, or tied.
- The Scoreboard tracks cumulative wins, losses, and ties until you press **Reset Game**, which clears both the score and the current round.

## Component Breakdown

- `App`: Owns game state, orchestrates animation timing, and shares props with child components.
- `PlayerThrow`: Shows clickable throw options, highlights the current selection, and emits user actions.
- `ComputerThrow`: Displays the computer's animated shuffle and final selection.
- `ResultDisplay`: Announces round outcomes while meeting semantic and accessibility requirements.
- `ScoreBoard`: Aggregates wins/losses/ties for extra-credit tracking.
- `ResetButton`: Exposes a single action to reset rounds and scoreboard data.

## Implementation Reflection

- **State Management:** I leaned on `useState` for discrete bits of state (player choice, computer choice, result, score, animation flag). The animation timing stays predictable by kicking off one `setInterval` and one `setTimeout` per round and cleaning them up inside `useEffect`.
- **Gameplay Guarantees:** All nine throw combinations are covered by a simple lookup map (`WIN_RULES`). This makes the win/lose logic easy to verify and extend.
- **Accessibility & Styling:** Every image includes an `alt` description, buttons advertise `aria-pressed`, and responsive styles ensure keyboard users can play comfortably. Styling lives in external CSS (`App.css` / `index.css`) per assignment requirements, with responsive grids for smaller screens.
- **Extras:** The scoreboard and reset button complete the optional extra-credit features.

## Link To The Demo Video

- https://uncg-my.sharepoint.com/:v:/r/personal/jnmayes_uncg_edu/Documents/CSC%20372%20Projects/CSC-372-Assignment-8-Demo.mp4?csf=1&web=1&e=aBffg9&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D
