import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchResults from "../components/SearchResults/SearchResults";

// Mock TrackList — it has its own concerns and is not under test here.
// We only need to confirm SearchResults renders the right states.
vi.mock("../components/TrackList/TrackList", () => ({
  default: ({ tracks }) => (
    <ul aria-label="track list">
      {tracks.map((t) => (
        <li key={t.id}>{t.name}</li>
      ))}
    </ul>
  ),
}));

const defaultProps = {
  tracks: [],
  addTrack: vi.fn(),
  searchTerm: "",
  hasSearched: false,
  isLoading: false,
  searchError: null,
};

describe("SearchResults", () => {
  it("shows the initial prompt before any search is performed", () => {
    render(<SearchResults {...defaultProps} />);
    expect(screen.getByText(/search for tracks/i)).toBeInTheDocument();
  });

  it("shows a loading indicator while searching", () => {
    render(<SearchResults {...defaultProps} isLoading hasSearched />);
    // The loading container has aria-label="Searching for tracks"
    expect(
      screen.getByRole("status", { name: /searching for tracks/i }),
    ).toBeInTheDocument();
  });

  it("shows the error message and a retry button on search failure", async () => {
    const onRetry = vi.fn();
    render(
      <SearchResults
        {...defaultProps}
        hasSearched
        searchError="Network error"
        onRetrySearch={onRetry}
      />,
    );

    // error lives in role="alert"
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows the no-results message when search returns an empty list", () => {
    render(<SearchResults {...defaultProps} hasSearched tracks={[]} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("renders the track list when results are available", () => {
    const tracks = [
      { id: "1", name: "Track One", uri: "spotify:track:1" },
      { id: "2", name: "Track Two", uri: "spotify:track:2" },
    ];
    render(<SearchResults {...defaultProps} hasSearched tracks={tracks} />);
    expect(
      screen.getByRole("list", { name: /track list/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Track One")).toBeInTheDocument();
    expect(screen.getByText("Track Two")).toBeInTheDocument();
  });
});
