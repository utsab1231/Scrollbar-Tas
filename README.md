# ScrollableComponent Documentation

## Overview
This Next.js component implements an infinite scroll feature that transitions between vertical and horizontal scrolling based on specific element milestones. The component dynamically loads numbered elements (1 to 50) as the user scrolls, switching from vertical to horizontal scrolling between elements 21 and 30, and back to vertical afterward. It uses React hooks for state management and scroll detection, with smooth scrolling to new elements at specific points (20 and 31).

## Approach
- **State Management**: Uses `useState` to manage the list of elements, loading state, and scroll transition flags. `useRef` tracks the container and last element for scroll manipulation.
- **Scroll Detection**: Two `useEffect` hooks handle scroll events:
  - The first listens for near-end scrolling (vertical or horizontal) to trigger data fetching.
  - The second ensures smooth scrolling to the newest element at specific milestones (20 and 31) and triggers additional fetches if at the exact end.
- **Dynamic Styling**: Tailwind CSS classes toggle between vertical (`flex-col`) and horizontal (`flex-row`) layouts based on the current element number.
- **Mock API**: Simulates data fetching with a 500ms delay, adding the next number in sequence until reaching the defined limit (50).
- **Environment Variables**: Configurable scroll boundaries (`SCROLLBAR_FINISH`, `HORIZONTAL_SCROLLBAR_LOWER`, `HORIZONTAL_SCROLLBAR_UPPER`) with defaults of 50, 21, and 30, respectively.
- **Loading and Completion**: Displays a loading spinner during fetches and a "Finished" message when the element limit is reached.

## Instructions to Run
1. **Clone the Repository**:
   - Clone the GitHub repository containing the project:
     ```bash
     git clone https://github.com/utsab1231/Scrollbar-Tas.git
     ```
   - Navigate to the project directory:
     ```bash
     cd <repository-name>
     ```
2. **Set Up Environment Variables**:
   - Create a `.env.local` file in the project root and add the following variables (optional, as defaults are provided):
     ```env
     SCROLLBAR_FINISH=50   -- max number to be scrolled to .
     HORIZONTAL_SCROLLBAR_LOWER=21  -- where to start horizontal scrolling from
     HORIZONTAL_SCROLLBAR_UPPER=30  -- where to end horizontal scrolling
     ```
3. **Install Dependencies**:
   - Ensure Node.js and npm are installed.
   - Run the following command to install dependencies:
     ```bash
     npm install
     ```
4. **Run the Application**:
   - Start the Next.js development server:
     ```bash
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:3000` to view the component.
5. **Interaction**:
   - Scroll vertically to load elements 1–20.
   - At element 20, the component switches to horizontal scrolling (elements 21–30).
   - At element 31, it switches back to vertical scrolling until reaching element 50, where a "Finished" message appears.

## Assumptions
- The component runs in a browser environment compatible with Next.js and React.
- Tailwind CSS is configured in the project, as the component relies on Tailwind classes.
- Environment variables are optional; defaults are provided if not set.
- The mock API delay (500ms) simulates real-world API latency; no actual external API is called.
- The component assumes a minimum container size (`w-3/4 h-48`) for proper rendering, adjustable via CSS.

## Limitations
- **Mock API**: The component uses a simulated API response. In a production environment, replace the `fetchData` function with a real API call.
- **Scroll Behavior**: Smooth scrolling at milestones (20 and 31) may not work perfectly in all browsers or devices due to variations in scroll behavior support.
- **Responsive Design**: The component’s size is fixed (`w-3/4 h-48`). For smaller screens, additional responsive Tailwind classes or media queries may be needed.
- **Environment Variables**: If environment variables are not set, defaults are used, which may not suit all use cases.
- **Error Handling**: Basic error logging is included, but no user-facing error messages are displayed.
