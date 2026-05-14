import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

function LandingPage({ onLogin, onDemo }) {
  return (
    <main className="app landingPage" id="main-content" tabIndex="-1">
      <section className="welcomeHome" aria-labelledby="welcome-title">
        <div className="logoContainer">
          <span className="logoIcon">🎧</span>
          <h1 className="logoTitle">
            Ja<span className="logoHighlight">mmm</span>ing
          </h1>
        </div>
        <p id="welcome-title" className="welcomeHeadline">
          Create the perfect playlist
        </p>
        <p className="welcomeSubtitle">
          Search millions of songs, build your dream playlist, and save it
          directly to your Spotify account.
        </p>

        <div className="featuresContainer" aria-label="App features">
          <div className="featureItem">
            <span className="featureIcon" aria-hidden="true">
              🔍
            </span>
            <span className="featureText">Search songs</span>
          </div>
          <div className="featureItem">
            <span className="featureIcon" aria-hidden="true">
              ✨
            </span>
            <span className="featureText">Build playlists</span>
          </div>
          <div className="featureItem">
            <span className="featureIcon" aria-hidden="true">
              💾
            </span>
            <span className="featureText">Save to Spotify</span>
          </div>
        </div>

        <p className="privacyNote">
          Playlist creation only. Your data is never shared.
        </p>

        <div className="authButtons">
          <button
            type="button"
            className="connectButton"
            onClick={onLogin}
            aria-label="Connect your Spotify account"
          >
            <span className="connectButtonInner">
              <FontAwesomeIcon
                icon={faSpotify}
                className="spotifyIcon"
                aria-hidden="true"
              />
              <span className="connectText">Connect to Spotify</span>
            </span>
          </button>

          <button
            type="button"
            className="demoButton"
            onClick={onDemo}
            aria-label="Create a playlist with sample songs — no account needed"
          >
            Create a playlist
            <span className="demoBadge">Sample songs</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
