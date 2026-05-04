import { useEffect, useRef, useState } from "react";
import "./DestinationSelector.css";

/**
 * DestinationSelector
 *
 * Lightweight popover positioned next to the "+" button when the user
 * clicks to add a track without an active playlist.
 *
 * Features:
 * - Smart positioning: prefers right, falls back to left
 * - Handles viewport overflow
 * - Smooth entrance/exit animations
 * - Keyboard accessible (Escape, Tab, Arrow keys)
 * - Close on scroll
 * - prefers-reduced-motion support
 *
 * Props:
 *   anchorElement   – the "+" button element for positioning
 *   onNewPlaylist   – () => void  — user chose "New playlist"
 *   onMyPlaylists   – () => void  — user chose "My playlists"
 *   onCancel        – () => void  — user dismissed (Escape, click outside, or scroll)
 */
function DestinationSelector({
  anchorElement,
  onNewPlaylist,
  onMyPlaylists,
  onCancel,
}) {
  const firstButtonRef = useRef(null);
  const popoverRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
    side: "right", // "right" or "left"
    caretTop: 0, // Dynamic vertical position of caret (relative to popover)
  });

  // Handle closing with animation
  const handleClose = () => {
    setIsClosing(true);
  };

  // Wrapped handlers to trigger close animation first
  const handleNewPlaylistClick = () => {
    setIsClosing(true);
    setTimeout(onNewPlaylist, 0);
  };

  const handleMyPlaylistsClick = () => {
    setIsClosing(true);
    setTimeout(onMyPlaylists, 0);
  };

  // Calculate optimal popover position based on anchor element and viewport
  useEffect(() => {
    if (!anchorElement || !popoverRef.current) {
      return;
    }

    const calculatePosition = () => {
      const anchorRect = anchorElement.getBoundingClientRect();
      const popoverRect = popoverRef.current?.getBoundingClientRect() || {
        width: 200,
        height: 150,
      };

      const gap = 8; // Space between button and popover
      const viewportPadding = 8; // Minimum distance from viewport edge
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Try right side first
      let left = anchorRect.right + gap;
      let side = "right";

      // Check if popover overflows right edge
      if (left + popoverRect.width > windowWidth - viewportPadding) {
        // Fall back to left side
        left = anchorRect.left - gap - popoverRect.width;
        side = "left";

        // If left side also overflows, clamp to viewport
        if (left < viewportPadding) {
          left = viewportPadding;
        }
      }

      // Clamp left to viewport bounds
      left = Math.max(
        viewportPadding,
        Math.min(left, windowWidth - popoverRect.width - viewportPadding),
      );

      // Position vertically: align top with button, adjust if overflows
      let top = anchorRect.top;

      // Check if popover overflows bottom edge
      if (top + popoverRect.height > windowHeight - viewportPadding) {
        // Shift up to stay in viewport
        top = Math.max(
          viewportPadding,
          windowHeight - popoverRect.height - viewportPadding,
        );
      }

      // Calculate caret position: point to center of anchor button
      // Caret centerY = anchorButton.centerY relative to popover top
      const anchorCenterY = anchorRect.top + anchorRect.height / 2;
      let caretTop = anchorCenterY - top;

      // Clamp caret to stay within popover bounds (8px from edges)
      const caretMinTop = 8;
      const caretMaxTop = popoverRect.height - 8;
      caretTop = Math.max(caretMinTop, Math.min(caretTop, caretMaxTop));

      setPopoverPosition({ top, left, side, caretTop });
    };

    // Calculate on mount
    calculatePosition();

    // Recalculate on window resize
    const resizeObserver = new ResizeObserver(() => {
      calculatePosition();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [anchorElement]);

  // Move focus to first button on mount
  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);

  // Escape closes the selector
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      // Don't close if clicking the anchor button (prevents immediate re-open)
      if (anchorElement && anchorElement.contains(e.target)) {
        return;
      }

      // Close if clicking outside popover
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        anchorElement &&
        !anchorElement.contains(e.target)
      ) {
        handleClose();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [anchorElement]);

  // Close on scroll — popover is contextual to anchor, so scrolling breaks the connection
  useEffect(() => {
    function handleScrollClose() {
      // Only close if not already closing
      if (!isClosing) {
        handleClose();
      }
    }

    // Use capture phase to catch scroll events from nested scroll containers (e.g., results list)
    // Only add listener if popover is open (not closing)
    if (!isClosing) {
      window.addEventListener("scroll", handleScrollClose, true);
      return () =>
        window.removeEventListener("scroll", handleScrollClose, true);
    }
  }, [isClosing]);

  return (
    <div
      ref={popoverRef}
      className={`destSelectorPopover${isClosing ? " isClosing" : ""}`}
      data-side={popoverPosition.side}
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
        "--caret-top": `${popoverPosition.caretTop}px`,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dest-selector-title"
      onAnimationEnd={() => {
        if (isClosing) {
          onCancel();
        }
      }}
    >
      <p className="destSelectorLabel">Add to:</p>

      <div className="destSelectorActions">
        <button
          ref={firstButtonRef}
          type="button"
          className="destOptionButton"
          onClick={handleNewPlaylistClick}
        >
          <span className="destOptionTitle">New playlist</span>
        </button>

        <button
          type="button"
          className="destOptionButton"
          onClick={handleMyPlaylistsClick}
        >
          <span className="destOptionTitle">My playlists</span>
        </button>
      </div>
    </div>
  );
}

export default DestinationSelector;
