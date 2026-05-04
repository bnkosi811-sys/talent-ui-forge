# Fix Navigation Obstruction and Interactive Booking Dates

This plan addresses the issue where navigation buttons are obstructed by other UI elements and implements interactive date/time selection in the booking flow.

## 1. Fix Navigation Obstruction in `src/App.tsx`
- Increase the `z-index` of the bottom navigation bar to `z-[110]` to ensure it is always above all overlays (modals, profile view, notifications).
- Update the navigation logic to clear all overlay states (`selectedTalent`, `showPaywall`, `showBooking`, `showNotifications`) when a navigation button is clicked.
- This ensures that navigation buttons are always accessible and functional regardless of the current view.

## 2. Implement Interactive Booking Dates in `src/components/profile/Profile.tsx`
- In the `BookingModal` component:
  - Add state for `selectedDate` (number) and `selectedTime` (string).
  - Replace the static mapping of dates/times with interactive buttons that update the state.
  - Apply active styling (e.g., border color, background glow) to the selected date and time.
  - Ensure the "Confirm Request" button remains functional and can theoretically use the selected data.

## 3. Verification
- Verify that the bottom navigation bar is visible and clickable even when the Profile or Booking modal is open.
- Verify that clicking a navigation button correctly switches the view and closes any open overlays.
- Verify that dates and times in the Booking modal can be selected and show visual feedback.
