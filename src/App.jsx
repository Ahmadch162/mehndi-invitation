import React, { useEffect, useRef, useState } from "react";
import "./index.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Envelope + music
  const audioRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Runs inside the tap, which is what lets the browser play sound
  const handleOpen = () => {
    setOpened(true);

    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      audio.volume = 1;
      audio.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  // Hero text animates in as the envelope fades away
  useEffect(() => {
    if (!opened) return;

    const timer = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(timer);
  }, [opened]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Great+Vibes&display=swap');

        :root {
          --deep: #173b35;
          --deep-2: #0d2925;
          --green: #285c50;
          --sage: #a9c4a9;
          --cream: #fbf5e8;
          --cream-2: #f4ead6;
          --gold: #c9a45b;
          --gold-light: #e2c984;
          --maroon: #7b3040;
          --rose: #c98588;
          --white: #fffdf7;
          --text: #263832;
          --muted: #6e7972;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--cream);
          color: var(--text);
          font-family: "DM Sans", sans-serif;
          overflow-x: hidden;
        }

        button {
          font: inherit;
        }

        /* =========================
           MUSIC CONTROL
        ========================= */

        .music-control {
          position: fixed;
          z-index: 999;
          right: 24px;
          bottom: 24px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px solid rgba(226, 201, 132, .65);
          background: rgba(13, 41, 37, .94);
          color: var(--gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,.18);
          backdrop-filter: blur(10px);
          transition: transform .25s ease, background .25s ease;
        }

        .music-control:hover {
          transform: scale(1.08);
          background: var(--deep);
        }

        .music-control-icon {
          font-size: 19px;
          line-height: 1;
        }

        .music-label {
          position: absolute;
          right: 68px;
          white-space: nowrap;
          padding: 8px 12px;
          border-radius: 20px;
          background: rgba(13,41,37,.94);
          color: var(--cream);
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: 0;
          pointer-events: none;
          transform: translateX(5px);
          transition: .25s ease;
        }

        .music-control:hover .music-label {
          opacity: 1;
          transform: translateX(0);
        }

        /* =========================
           NAV
        ========================= */

        .nav {
          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;
          width: 100%;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6vw;
          background: rgba(251,245,232,.86);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(201,164,91,.22);
        }

        .nav-brand {
          color: var(--deep);
          font-family: "Cormorant Garamond", serif;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: .04em;
        }

        .nav-brand span {
          color: var(--gold);
          margin: 0 5px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links button {
          border: 0;
          background: none;
          color: var(--deep);
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          transition: color .25s ease;
        }

        .nav-links button:hover {
          color: var(--maroon);
        }

        .menu-button {
          display: none;
          border: 1px solid rgba(23,59,53,.2);
          background: transparent;
          color: var(--deep);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          cursor: pointer;
        }

        /* =========================
           HERO
        ========================= */

        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 120px 5vw 80px;
          background:
            linear-gradient(
              135deg,
              rgba(13,41,37,.93),
              rgba(35,82,71,.90)
            );
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-video-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              135deg,
              rgba(13,41,37,.91),
              rgba(35,82,71,.74)
            );
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: .13;
          background-image:
            radial-gradient(
              circle at 20% 30%,
              var(--gold-light) 0 2px,
              transparent 2.5px
            ),
            radial-gradient(
              circle at 80% 65%,
              var(--gold-light) 0 2px,
              transparent 2.5px
            );
          background-size: 85px 85px, 105px 105px;
          pointer-events: none;
        }

        .hero::before,
        .hero::after {
          content: "";
          position: absolute;
          z-index: 3;
          border: 1px solid rgba(226,201,132,.28);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero::before {
          width: 680px;
          height: 680px;
          left: -330px;
          top: -170px;
        }

        .hero::after {
          width: 600px;
          height: 600px;
          right: -290px;
          bottom: -260px;
        }

        .hero-inner {
          position: relative;
          z-index: 5;
          width: min(1200px, 100%);
          text-align: center;
        }

        .eyebrow {
          color: var(--gold-light);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .34em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-title {
          color: var(--cream);
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(54px, 8vw, 105px);
          font-weight: 500;
          line-height: .9;
          letter-spacing: -.025em;
        }

        .hero-title em {
          display: block;
          color: var(--gold-light);
          font-family: "Great Vibes", cursive;
          font-size: .58em;
          font-weight: 400;
          line-height: 1.15;
          margin: 8px 0;
        }

        .hero-subtitle {
          max-width: 620px;
          margin: 30px auto 0;
          color: rgba(251,245,232,.82);
          font-size: 14px;
          line-height: 1.9;
        }

        .hero-date {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          margin-top: 34px;
          color: var(--cream);
          font-family: "Cormorant Garamond", serif;
          font-size: 22px;
          letter-spacing: .05em;
        }

        .hero-date::before,
        .hero-date::after {
          content: "";
          width: 44px;
          height: 1px;
          background: var(--gold);
        }

        .scroll-cue {
          position: absolute;
          z-index: 5;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(251,245,232,.6);
          font-size: 9px;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .scroll-cue::after {
          content: "";
          display: block;
          width: 1px;
          height: 35px;
          margin: 10px auto 0;
          background: var(--gold);
        }

        /* =========================
           VIDEO SECTION
        ========================= */

        .video-section {
          background: var(--deep-2);
          padding: 100px 5vw;
          color: var(--cream);
        }

        .video-wrapper {
          position: relative;
          width: min(1050px, 100%);
          margin: auto;
          overflow: hidden;
          border: 1px solid rgba(226,201,132,.35);
          background: #071714;
          box-shadow: 0 30px 80px rgba(0,0,0,.28);
        }

        .video-wrapper::before {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(226,201,132,.18);
          z-index: 2;
          pointer-events: none;
        }

        .invitation-video {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          background: #071714;
        }

        .video-caption {
          position: absolute;
          left: 50%;
          bottom: 28px;
          z-index: 4;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          text-align: center;
          pointer-events: none;
        }

        .video-caption-small {
          color: var(--gold-light);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .3em;
          text-transform: uppercase;
        }

        .video-caption-title {
          margin-top: 7px;
          color: white;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(25px, 4vw, 42px);
        }

        /* =========================
           GENERAL
        ========================= */

        .section {
          position: relative;
          padding: 110px 5vw;
        }

        .section-inner {
          width: min(1100px, 100%);
          margin: auto;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-kicker {
          color: var(--maroon);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .3em;
          text-transform: uppercase;
          margin-bottom: 13px;
        }

        .section-title {
          color: var(--deep);
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 500;
          line-height: 1;
        }

        .section-copy {
          max-width: 580px;
          margin: 18px auto 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        /* =========================
           BRIDES
        ========================= */

        .brides-section {
          background:
            linear-gradient(
              rgba(251,245,232,.96),
              rgba(251,245,232,.96)
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 25px,
              rgba(40,92,80,.025) 25px,
              rgba(40,92,80,.025) 26px
            );
        }

        .brides-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .bride-card {
          position: relative;
          min-height: 530px;
          padding: 44px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: var(--white);
          border: 1px solid rgba(201,164,91,.35);
          box-shadow: 0 20px 55px rgba(23,59,53,.07);
        }

        .bride-card::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(201,164,91,.22);
          pointer-events: none;
        }

        .bride-card:first-child {
          border-radius: 90px 14px 14px 14px;
        }

        .bride-card:last-child {
          border-radius: 14px 90px 14px 14px;
        }

        .bride-card::after {
          content: "✦";
          position: absolute;
          top: 22px;
          color: var(--gold);
          font-size: 18px;
        }

        .bride-card:first-child::after {
          left: 28px;
        }

        .bride-card:last-child::after {
          right: 28px;
        }

        .portrait {
          position: relative;
          width: 185px;
          height: 185px;
          margin-bottom: 28px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background:
            radial-gradient(
              circle,
              var(--cream) 0 58%,
              transparent 59%
            ),
            conic-gradient(
              from 0deg,
              var(--gold),
              var(--rose),
              var(--gold-light),
              var(--gold)
            );
        }

        .portrait::before {
          content: "✿";
          color: var(--maroon);
          font-size: 48px;
          font-family: "Cormorant Garamond", serif;
        }

        .portrait::after {
          content: "";
          position: absolute;
          inset: -10px;
          border: 1px solid rgba(201,164,91,.45);
          border-radius: 50%;
        }

        .bride-number {
          color: var(--gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .bride-name {
          color: var(--deep);
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(43px, 5vw, 60px);
          font-weight: 500;
          line-height: .95;
        }

        .bride-name::after {
          content: "";
          display: block;
          width: 42px;
          height: 1px;
          background: var(--gold);
          margin: 20px auto;
        }

        .bride-note {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          max-width: 300px;
        }

        .ampersand {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 5;
          transform: translate(-50%, -50%);
          width: 66px;
          height: 66px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--deep);
          border: 5px solid var(--cream);
          color: var(--gold-light);
          font-family: "Cormorant Garamond", serif;
          font-size: 28px;
          font-style: italic;
          box-shadow: 0 10px 30px rgba(23,59,53,.2);
        }

        /* =========================
           INVITATION
        ========================= */

        .invitation-section {
          background: var(--deep);
          color: var(--cream);
          overflow: hidden;
        }

        .invitation-section::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(226,201,132,.13);
          border-radius: 50%;
          top: -300px;
          left: -150px;
        }

        .invitation-section .section-kicker {
          color: var(--gold-light);
        }

        .invitation-section .section-title {
          color: var(--cream);
        }

        .invitation-card {
          position: relative;
          max-width: 850px;
          margin: auto;
          padding: 70px 60px;
          text-align: center;
          border: 1px solid rgba(226,201,132,.35);
          background: rgba(255,255,255,.025);
        }

        .invitation-card::before,
        .invitation-card::after {
          content: "❋";
          position: absolute;
          color: var(--gold);
          font-size: 28px;
        }

        .invitation-card::before {
          top: 25px;
          left: 28px;
        }

        .invitation-card::after {
          bottom: 25px;
          right: 28px;
        }

        .invitation-script {
          color: var(--gold-light);
          font-family: "Great Vibes", cursive;
          font-size: 46px;
          line-height: 1.3;
        }

        .invitation-main {
          max-width: 650px;
          margin: 25px auto 0;
          color: var(--cream);
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(26px, 4vw, 38px);
          line-height: 1.35;
        }

        .invitation-small {
          margin-top: 25px;
          color: rgba(251,245,232,.64);
          font-size: 12px;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        /* =========================
           DETAILS
        ========================= */

        .details-section {
          background: var(--cream-2);
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .detail {
          min-height: 225px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 30px;
          background: rgba(255,255,255,.48);
          border: 1px solid rgba(201,164,91,.28);
        }

        .detail-icon {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          color: var(--maroon);
          font-size: 19px;
        }

        .detail-label {
          color: var(--muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .25em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .detail-value {
          color: var(--deep);
          font-family: "Cormorant Garamond", serif;
          font-size: 30px;
          font-weight: 600;
        }

        .detail-sub {
          color: var(--muted);
          font-size: 12px;
          margin-top: 6px;
        }

        /* =========================
           COUNTDOWN
        ========================= */

        .countdown-section {
          padding: 85px 5vw;
          background: var(--maroon);
          color: var(--cream);
          text-align: center;
        }

        .countdown-label {
          color: var(--gold-light);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .3em;
          text-transform: uppercase;
        }

        .countdown-grid {
          width: min(650px, 100%);
          margin: 30px auto 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .count-number {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(38px, 6vw, 60px);
          line-height: 1;
        }

        .count-name {
          margin-top: 8px;
          color: rgba(251,245,232,.63);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        /* =========================
           FOOTER
        ========================= */

        .footer {
          position: relative;
          padding: 90px 5vw 45px;
          text-align: center;
          background: var(--deep-2);
          color: var(--cream);
          overflow: hidden;
        }

        .footer-floral {
          color: var(--gold);
          font-size: 30px;
          margin-bottom: 22px;
        }

        .footer-title {
          font-family: "Great Vibes", cursive;
          color: var(--gold-light);
          font-size: clamp(44px, 7vw, 70px);
        }

        .footer-names {
          margin-top: 14px;
          font-family: "Cormorant Garamond", serif;
          font-size: 25px;
          letter-spacing: .05em;
        }

        .footer-date {
          margin-top: 20px;
          color: rgba(251,245,232,.55);
          font-size: 10px;
          letter-spacing: .25em;
          text-transform: uppercase;
        }

        .footer-bottom {
          margin-top: 65px;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.09);
          color: rgba(251,245,232,.35);
          font-size: 9px;
          letter-spacing: .12em;
        }

        /* =========================
           ANIMATION
        ========================= */

        .fade-up {
          opacity: 0;
          transform: translateY(25px);
          animation: fadeUp .9s cubic-bezier(.2,.7,.2,1) forwards;
        }

        .delay-1 {
          animation-delay: .15s;
        }

        .delay-2 {
          animation-delay: .3s;
        }

        .delay-3 {
          animation-delay: .45s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float {
          animation: floating 5s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        /* =========================
           MUSIC TOGGLE BUTTON
        ========================= */

        .music-toggle {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 9999;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 12px 18px;
          border: 1px solid rgba(255, 215, 120, 0.6);
          border-radius: 999px;

          background: rgba(42, 25, 18, 0.92);
          color: #f7d98b;

          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          font-weight: 600;

          cursor: pointer;

          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);

          backdrop-filter: blur(10px);

          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .music-toggle:hover {
          transform: translateY(-2px);
        }

        .music-icon {
          font-size: 18px;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 800px) {
          .nav {
            height: 68px;
            padding: 0 5vw;
          }

          .nav-links {
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            display: ${menuOpen ? "flex" : "none"};
            flex-direction: column;
            gap: 0;
            padding: 15px 5vw 22px;
            background: rgba(251,245,232,.97);
            border-bottom: 1px solid rgba(201,164,91,.25);
          }

          .nav-links button {
            width: 100%;
            padding: 15px;
          }

          .menu-button {
            display: block;
          }

          .hero {
            min-height: 90svh;
            padding-top: 105px;
          }

          .hero-title {
            font-size: clamp(52px, 16vw, 78px);
          }

          .brides-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .bride-card {
            min-height: 470px;
          }

          .ampersand {
            position: relative;
            left: 50%;
            top: auto;
            margin: -54px 0 -54px;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .detail {
            min-height: 185px;
          }

          .invitation-card {
            padding: 55px 28px;
          }

          .video-section {
            padding: 75px 5vw;
          }

          .video-caption {
            bottom: 20px;
          }
        }

        @media (max-width: 600px) {
          .music-toggle {
            right: 14px;
            bottom: 14px;
            padding: 10px 14px;
            font-size: 12px;
          }

          .music-icon {
            font-size: 16px;
          }
        }

        @media (max-width: 520px) {
          .section {
            padding: 78px 5vw;
          }

          .hero-subtitle {
            font-size: 13px;
          }

          .hero-date {
            font-size: 19px;
          }

          .bride-card {
            padding: 35px 20px;
            min-height: 430px;
          }

          .portrait {
            width: 155px;
            height: 155px;
          }

          .bride-name {
            font-size: 45px;
          }

          .invitation-script {
            font-size: 38px;
          }

          .countdown-grid {
            gap: 5px;
          }

          .count-number {
            font-size: 37px;
          }

          .music-control {
            right: 16px;
            bottom: 16px;
            width: 50px;
            height: 50px;
          }

          .music-label {
            display: none;
          }

          .video-wrapper::before {
            inset: 8px;
          }

          .video-caption {
            bottom: 13px;
          }

          .video-caption-small {
            font-size: 7px;
          }

          .video-caption-title {
            font-size: 22px;
          }
        }
      `}</style>

      {/* =========================
          ENVELOPE INTRO + MUSIC
      ========================= */}

      <EnvelopeIntro onOpen={handleOpen} />

      <audio ref={audioRef} src="/mehndi-song.mp3" loop preload="auto" />

      {opened && (
        <button
          className="music-toggle"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          <span className="music-icon">{isMuted ? "🔇" : "🎵"}</span>

          <span>{isMuted ? "Unmute Music" : "Mute Music"}</span>
        </button>
      )}

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="nav">
        <div className="nav-brand">
          Mehndi
        </div>

        <div className="nav-links">
          <button onClick={() => scrollToSection("brides")}>Brides</button>

          <button onClick={() => scrollToSection("video")}>Video</button>

          <button onClick={() => scrollToSection("details")}>Details</button>

          <button onClick={() => scrollToSection("invitation")}>
            Invitation
          </button>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </nav>

      {/* =========================
          HERO + AUTOPLAY VIDEO
      ========================= */}

      <header className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/mehndi-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-video-overlay" />
        <div className="hero-pattern" />

        <div className="hero-inner">
          <div className={`eyebrow ${loaded ? "fade-up" : ""}`}>
            With love, laughter & henna
          </div>

          <h1 className={`hero-title ${loaded ? "fade-up delay-1" : ""}`}>
            A Mehndi
            <em>Celebration</em>
            for Two Brides
          </h1>

          <p className={`hero-subtitle ${loaded ? "fade-up delay-2" : ""}`}>
            Two beautiful journeys, one joyful celebration. Join us as we gather
            at home to celebrate Sarosh and Zoya with an evening filled with
            colour, music, laughter and mehndi.
          </p>

          <div className={`hero-date ${loaded ? "fade-up delay-3" : ""}`}>
            16 October 2026
          </div>
        </div>

        <div className="scroll-cue">Discover</div>
      </header>

      {/* =========================
          VIDEO SECTION
      ========================= */}

      <section id="video" className="video-section">
        <div className="section-heading">
          <div className="section-kicker">A little glimpse</div>

          <h2 className="section-title" style={{ color: "var(--cream)" }}>
            Let the Celebration Begin
          </h2>

          <p
            className="section-copy"
            style={{ color: "rgba(251,245,232,.65)" }}
          >
            A glimpse into the colours, joy and beautiful moments surrounding
            Sarosh & Zoya's Mehndi.
          </p>
        </div>

        <div className="video-wrapper">
          <video
            className="invitation-video"
            src="/mehndi-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            // controls
            preload="auto"
          />

          <div className="video-caption">
            <div className="video-caption-small">Sarosh & Zoya</div>

            <div className="video-caption-title">
              Two Brides · One Celebration
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BRIDES
      ========================= */}

      <section id="brides" className="section brides-section">
        <div className="section-inner">
          <div className="section-heading">
            <div className="section-kicker">The celebration</div>

            <h2 className="section-title">Two Brides, One Beautiful Evening</h2>

            <p className="section-copy">
              This celebration is for both brides equally — two names, two
              stories and one unforgettable Mehndi gathering.
            </p>
          </div>

          <div className="brides-grid">
            <article className="bride-card float">
              <div className="portrait" />

              <div className="bride-number">Bride One</div>

              <h3 className="bride-name">Sarosh Abid</h3>

              <p className="bride-note">
                A beautiful bride-to-be, celebrated with love, colour and all
                the joy this evening has to offer.
              </p>
            </article>

            {/* <div className="ampersand">&</div> */}

            <article className="bride-card float">
              <div className="portrait" />

              <div className="bride-number">Bride Two</div>

              <h3 className="bride-name">Zoya Abid</h3>

              <p className="bride-note">
                A beautiful bride-to-be, celebrated with love, colour and all
                the joy this evening has to offer.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================
          INVITATION
      ========================= */}

      <section id="invitation" className="section invitation-section">
        <div className="section-inner">
          <div className="section-heading">
            <div className="section-kicker">You are invited</div>

            <h2 className="section-title" style={{ color: "var(--cream)" }}>
              Come Celebrate With Us
            </h2>
          </div>

          <div className="invitation-card">
            <div className="invitation-script">Bismillah</div>

            <p className="invitation-main">
              With hearts full of happiness, we invite you to join us for the
              Mehndi celebration of
              <br />
              <strong>Sarosh Abid</strong>
              <br />
              &
              <br />
              <strong>Zoya Abid</strong>
            </p>

            <p className="invitation-small">
              An evening of mehndi • music • memories • merriment
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          DETAILS
      ========================= */}

      <section id="details" className="section details-section">
        <div className="section-inner">
          <div className="section-heading">
            <div className="section-kicker">Mark your calendar</div>

            <h2 className="section-title">The Details</h2>

            <p className="section-copy">
              Everything you need to know for our special evening together.
            </p>
          </div>

          <div className="details-grid">
            <div className="detail">
              <div className="detail-icon">◷</div>

              <div className="detail-label">Date</div>

              <div className="detail-value">16 October</div>

              <div className="detail-sub">Friday · 2026</div>
            </div>

            <div className="detail">
              <div className="detail-icon">⌂</div>

              <div className="detail-label">Venue</div>

              <div className="detail-value">Home</div>

              <div className="detail-sub">Our warmest place</div>
            </div>

            <div className="detail">
              <div className="detail-icon">✦</div>

              <div className="detail-label">Occasion</div>

              <div className="detail-value">Mehndi</div>

              <div className="detail-sub">Celebrating two brides</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          COUNTDOWN
      ========================= */}

      <Countdown />

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">
        <div className="footer-floral">❋</div>

        <div className="footer-title">Until we celebrate</div>

        <div className="footer-names">
          Sarosh Abid <span>&</span> Zoya Abid
        </div>

        <div className="footer-date">16 · 10 · 2026 &nbsp; • &nbsp; Home</div>

        <div className="footer-bottom">With love, for two beautiful brides</div>
      </footer>
    </>
  );
}

/* ============================================================
   COUNTDOWN
   ============================================================ */

function Countdown() {
  const targetDate = new Date("2026-10-16T19:00:00");

  const calculateTime = () => {
    const now = new Date();

    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),

      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),

      minutes: Math.floor((difference / (1000 * 60)) % 60),

      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (value) => String(value).padStart(2, "0");

  return (
    <section className="countdown-section">
      <div className="countdown-label">Counting down to the celebration</div>

      <div className="countdown-grid">
        <div>
          <div className="count-number">{pad(time.days)}</div>

          <div className="count-name">Days</div>
        </div>

        <div>
          <div className="count-number">{pad(time.hours)}</div>

          <div className="count-name">Hours</div>
        </div>

        <div>
          <div className="count-number">{pad(time.minutes)}</div>

          <div className="count-name">Minutes</div>
        </div>

        <div>
          <div className="count-number">{pad(time.seconds)}</div>

          <div className="count-name">Seconds</div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ENVELOPE INTRO
   ============================================================ */

/**
 * EnvelopeIntro
 * Full-screen envelope shown on first load.
 * Tapping it opens the flap, lifts the card out, then fades away
 * to reveal the site underneath.
 *
 * Props:
 *   onOpen()  - called synchronously inside the tap handler.
 *               Start your background music here (browsers only allow
 *               audio with sound if it starts from a user gesture).
 */
function EnvelopeIntro({ onOpen }) {
  // closed -> opening -> leaving -> gone
  const [phase, setPhase] = useState("closed");
  const timers = useRef([]);

  // Lock scroll while the envelope is showing
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (phase === "leaving") document.body.style.overflow = "";
  }, [phase]);

  const handleOpen = () => {
    if (phase !== "closed") return;

    // Must run inside the tap so the browser allows audio
    onOpen?.();

    setPhase("opening");
    timers.current.push(setTimeout(() => setPhase("leaving"), 2000));
    timers.current.push(setTimeout(() => setPhase("gone"), 3100));
  };

  if (phase === "gone") return null;

  return (
    <div className={`ei ei--${phase}`} aria-hidden={phase !== "closed"}>
      <style>{envelopeCss}</style>

      <div className="ei-rings" />

      <p className="ei-kicker">You are invited</p>

      <button
        type="button"
        className="ei-button"
        onClick={handleOpen}
        aria-label="Open the invitation"
      >
        <span className="ei-envelope">
          <span className="ei-back" />

          <span className="ei-card">
            <span className="ei-card-script">Bismillah</span>
            <span className="ei-card-names">
              Sarosh <i>&amp;</i> Zoya
            </span>
            <span className="ei-card-line" />
            <span className="ei-card-event">Mehndi Celebration</span>
            <span className="ei-card-date">16 October 2026</span>
          </span>

          <span className="ei-left" />
          <span className="ei-right" />
          <span className="ei-bottom" />

          <span className="ei-flap">
            <span className="ei-flap-out" />
            <span className="ei-flap-in" />
          </span>

          <span className="ei-seal">
            <span>Tap to Open</span>
          </span>
        </span>
      </button>
    </div>
  );
}

const envelopeCss = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Great+Vibes&display=swap');

  .ei {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 34px;
    overflow: hidden;
    touch-action: none;
    background: radial-gradient(circle at 50% 42%, #235247 0%, #173b35 45%, #0d2925 100%);
    opacity: 1;
    transition: opacity .9s ease;
  }

  .ei--leaving {
    opacity: 0;
    pointer-events: none;
  }

  .ei-rings::before,
  .ei-rings::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(226, 201, 132, .22);
    border-radius: 50%;
    pointer-events: none;
  }

  .ei-rings::before {
    width: 680px;
    height: 680px;
    left: -330px;
    top: -170px;
  }

  .ei-rings::after {
    width: 600px;
    height: 600px;
    right: -290px;
    bottom: -260px;
  }

  .ei-kicker {
    position: relative;
    color: #e2c984;
    font-family: "Great Vibes", cursive;
    font-size: clamp(36px, 9vw, 54px);
    line-height: 1.1;
    text-align: center;
    transition: opacity .4s ease;
  }

  .ei-hint {
    position: relative;
    color: rgba(251, 245, 232, .78);
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-size: 20px;
    letter-spacing: .03em;
    transition: opacity .4s ease;
    animation: ei-breathe 2.4s ease-in-out infinite;
  }

  .ei--opening .ei-kicker,
  .ei--opening .ei-hint,
  .ei--leaving .ei-kicker,
  .ei--leaving .ei-hint {
    opacity: 0;
    animation: none;
  }

  /* ---------- Envelope ---------- */

  .ei-button {
    position: relative;
    display: block;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .ei-button:focus-visible {
    outline: 2px solid #e2c984;
    outline-offset: 14px;
  }

  .ei-envelope {
    --w: min(420px, 84vw);
    position: relative;
    display: block;
    width: var(--w);
    height: calc(var(--w) * .7);
    font-size: calc(var(--w) / 26);
    perspective: 1400px;
  }

  .ei-envelope > span {
    display: block;
  }

  .ei-back {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: #e3cf9f;
    box-shadow: 0 30px 60px rgba(0, 0, 0, .38);
  }

  .ei-left,
  .ei-right,
  .ei-bottom,
  .ei-flap {
    position: absolute;
  }

  .ei-left,
  .ei-right,
  .ei-bottom {
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  .ei-left {
    background: #f1e4c4;
    clip-path: polygon(0 0, 50.4% 52%, 0 100%);
  }

  .ei-right {
    background: #ead9b1;
    clip-path: polygon(100% 0, 49.6% 52%, 100% 100%);
  }

  .ei-bottom {
    background: #f8eed3;
    clip-path: polygon(0 100%, 50% 47%, 100% 100%);
  }

  /* ---------- Flap (two faces so the inside shows once opened) ---------- */

  .ei-flap {
    left: 0;
    top: 0;
    width: 100%;
    height: 55%;
    z-index: 4;
    transform-origin: top center;
    transform-style: preserve-3d;
    transition: transform .9s cubic-bezier(.5, 0, .2, 1);
  }

  .ei-flap-out,
  .ei-flap-in {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .ei-flap-out {
    background: linear-gradient(180deg, #faf1d9, #f2e5c2);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }

  .ei-flap-in {
    background: linear-gradient(180deg, #cdb984, #dcc99a);
    clip-path: polygon(0 100%, 100% 100%, 50% 0);
    transform: rotateX(180deg);
  }

  .ei--opening .ei-flap,
  .ei--leaving .ei-flap {
    transform: rotateX(180deg);
    z-index: 1;
    transition:
      transform .9s cubic-bezier(.5, 0, .2, 1),
      z-index 0s linear .45s;
  }

  /* ---------- Card inside ---------- */

  .ei-card {
    position: absolute;
    left: 6%;
    top: 6%;
    width: 88%;
    height: 88%;
    z-index: 2;
    box-sizing: border-box;
    padding-top: 9%;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 3px;
    background: #fffdf7;
    box-shadow: 0 -4px 18px rgba(0, 0, 0, .12);
    transition: transform 1s cubic-bezier(.3, .1, .2, 1) .55s;
  }

  .ei-card::before {
    content: "";
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(201, 164, 91, .5);
    border-radius: 2px;
    pointer-events: none;
  }

  .ei--opening .ei-card,
  .ei--leaving .ei-card {
    transform: translateY(-66%);
  }

  .ei-card-script {
    color: #c9a45b;
    font-family: "Great Vibes", cursive;
    font-size: 2.2em;
    line-height: 1.15;
  }

  .ei-card-names {
    margin-top: .1em;
    color: #173b35;
    font-family: "Cormorant Garamond", serif;
    font-size: 2.3em;
    font-weight: 600;
    line-height: 1.1;
    white-space: nowrap;
  }

  .ei-card-names i {
    color: #7b3040;
    font-weight: 500;
    padding: 0 .1em;
  }

  .ei-card-line {
    width: 3em;
    height: 1px;
    margin: .8em 0 .6em;
    background: #c9a45b;
  }

  .ei-card-event {
    color: #7b3040;
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-size: 1.3em;
    line-height: 1.2;
  }

  .ei-card-date {
    margin-top: .3em;
    color: #6e7972;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.15em;
    letter-spacing: .04em;
  }

  /* ---------- Wax seal ---------- */

  .ei-seal {
    position: absolute;
    left: 50%;
    top: 55%;
    z-index: 6;
    width: 4.2em;
    height: 4.2em;
    display: grid !important;
    place-items: center;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle at 35% 30%, #a24b5c, #7b3040 55%, #5a2230);
    box-shadow:
      0 6px 14px rgba(60, 20, 30, .45),
      inset 0 0 0 .16em rgba(226, 201, 132, .6);
    color: #e2c984;
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-size: 1.25em;
    font-weight: 600;
    transition: opacity .35s ease, transform .5s ease;
  }

  .ei-seal::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(226, 201, 132, .8);
    border-radius: 50%;
    animation: ei-pulse 2.2s ease-out infinite;
  }

  .ei--opening .ei-seal,
  .ei--leaving .ei-seal {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.35);
  }

  .ei--opening .ei-seal::after,
  .ei--leaving .ei-seal::after {
    animation: none;
  }

  @keyframes ei-pulse {
    0%   { transform: scale(1);   opacity: .9; }
    100% { transform: scale(1.9); opacity: 0; }
  }

  @keyframes ei-breathe {
    0%, 100% { opacity: .55; }
    50%      { opacity: 1; }
  }

  @media (max-width: 520px) {
    .ei { gap: 28px; }
    .ei-rings::before { width: 480px; height: 480px; left: -260px; }
    .ei-rings::after  { width: 440px; height: 440px; right: -240px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ei-seal::after,
    .ei-hint { animation: none; }
  }
`;