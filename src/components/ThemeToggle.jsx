"use client";

import { useEffect, useRef, useState } from "react";

const skyStops = [
  {
    hour: 0,
    background: "#11182a",
    foreground: "#f0effa",
    accent: "#b2a1ff",
    accentForeground: "#17142b",
    card: "#1b2238",
    border: "#34344d",
    mutedForeground: "#b6b5c9",
    skyTop: "#182846",
    skyBottom: "#302641",
  },
  {
    hour: 4.5,
    background: "#24223c",
    foreground: "#f8e9e5",
    accent: "#f0a184",
    accentForeground: "#2b1923",
    card: "#302b48",
    border: "#504059",
    mutedForeground: "#d0bcca",
    skyTop: "#35365f",
    skyBottom: "#77465c",
  },
  {
    hour: 6.5,
    background: "#eee0d5",
    foreground: "#352f42",
    accent: "#a44d43",
    accentForeground: "#fff8f1",
    card: "#f7eee7",
    border: "#d8c6ba",
    mutedForeground: "#746b75",
    skyTop: "#f2ae83",
    skyBottom: "#e5b3aa",
  },
  {
    hour: 9,
    background: "#e8f1ef",
    foreground: "#263d4a",
    accent: "#236977",
    accentForeground: "#f5ffff",
    card: "#f4f8f5",
    border: "#c5d8d5",
    mutedForeground: "#61757b",
    skyTop: "#b4dced",
    skyBottom: "#d4e4dd",
  },
  {
    hour: 12,
    background: "#edf2ef",
    foreground: "#293d4b",
    accent: "#216779",
    accentForeground: "#f5ffff",
    card: "#f7f9f6",
    border: "#cbd8d4",
    mutedForeground: "#65767a",
    skyTop: "#9bcbe6",
    skyBottom: "#e2e8d9",
  },
  {
    hour: 16,
    background: "#f0e5d8",
    foreground: "#403747",
    accent: "#89523c",
    accentForeground: "#fff8f1",
    card: "#f8f0e7",
    border: "#d9c8b9",
    mutedForeground: "#746974",
    skyTop: "#e9bd89",
    skyBottom: "#e6c6b8",
  },
  {
    hour: 18.5,
    background: "#e6c9c1",
    foreground: "#3d3044",
    accent: "#82445e",
    accentForeground: "#fff7f2",
    card: "#f1ded6",
    border: "#d1b3b0",
    mutedForeground: "#75636f",
    skyTop: "#dc8b78",
    skyBottom: "#a65c77",
  },
  {
    hour: 20.5,
    background: "#242039",
    foreground: "#f4edf1",
    accent: "#e89a9a",
    accentForeground: "#321d2c",
    card: "#302940",
    border: "#514356",
    mutedForeground: "#c6b8c5",
    skyTop: "#4b416d",
    skyBottom: "#733d58",
  },
  {
    hour: 24,
    background: "#11182a",
    foreground: "#f0effa",
    accent: "#b2a1ff",
    accentForeground: "#17142b",
    card: "#1b2238",
    border: "#34344d",
    mutedForeground: "#b6b5c9",
    skyTop: "#182846",
    skyBottom: "#302641",
  },
];

const colorProperties = {
  background: "--background",
  foreground: "--foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  card: "--card",
  border: "--border",
  mutedForeground: "--muted-foreground",
  skyTop: "--sky-top",
  skyBottom: "--sky-bottom",
};

const parseColor = (color) => {
  if (color.startsWith("#")) {
    return color.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16));
  }

  return color.match(/[\d.]+/g).slice(0, 3).map(Number);
};

const formatColor = (channels) => `rgb(${channels.map(Math.round).join(" ")})`;

const interpolateColor = (from, to, amount) => {
  const start = parseColor(from);
  const end = parseColor(to);
  const channels = start.map((value, index) =>
    Math.round(value + (end[index] - value) * amount),
  );

  return formatColor(channels);
};

const luminanceWeights = [0.2126, 0.7152, 0.0722];

const getLuminance = (color) =>
  parseColor(color).reduce((luminance, channel, index) => {
    const value = channel / 255;
    const linear =
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    return luminance + linear * luminanceWeights[index];
  }, 0);

const getContrastRatio = (first, second) => {
  const luminance = [getLuminance(first), getLuminance(second)].sort(
    (a, b) => b - a,
  );
  return (luminance[0] + 0.05) / (luminance[1] + 0.05);
};

const getMinimumContrast = (color, surfaces) =>
  Math.min(...surfaces.map((surface) => getContrastRatio(color, surface)));

const getReadableColor = (surfaces) => {
  const blackContrast = getMinimumContrast("#000000", surfaces);
  const whiteContrast = getMinimumContrast("#ffffff", surfaces);

  return blackContrast >= whiteContrast ? "#000000" : "#ffffff";
};

const ensureContrast = (color, surfaces, minimum = 4.5) => {
  if (getMinimumContrast(color, surfaces) >= minimum) return color;

  const target = getReadableColor(surfaces);
  const start = parseColor(color);
  const end = parseColor(target);
  let low = 0;
  let high = 1;

  for (let iteration = 0; iteration < 16; iteration += 1) {
    const amount = (low + high) / 2;
    const candidate = formatColor(
      start.map((channel, index) => channel + (end[index] - channel) * amount),
    );

    if (getMinimumContrast(candidate, surfaces) >= minimum) {
      high = amount;
    } else {
      low = amount;
    }
  }

  return formatColor(
    start.map((channel, index) => channel + (end[index] - channel) * high),
  );
};

const getSkyColors = (hour) => {
  const nextIndex = skyStops.findIndex((stop) => stop.hour > hour);
  const next = skyStops[nextIndex];
  const previous = skyStops[nextIndex - 1];
  const progress = (hour - previous.hour) / (next.hour - previous.hour);

  const colors = Object.fromEntries(
    Object.keys(colorProperties).map((key) => [
      key,
      interpolateColor(previous[key], next[key], progress),
    ]),
  );
  const surfaces = [colors.background, colors.card];
  const accent = ensureContrast(colors.accent, surfaces);

  return {
    ...colors,
    foreground: getReadableColor(surfaces),
    accent,
    accentForeground: getReadableColor([accent]),
    mutedForeground: ensureContrast(colors.mutedForeground, surfaces),
  };
};

const getDayPhase = (hour) => {
  if (hour < 5 || hour >= 21) return "NIGHT";
  if (hour < 7) return "DAWN";
  if (hour < 11) return "MORNING";
  if (hour < 15) return "DAYLIGHT";
  if (hour < 18) return "GOLDEN HOUR";
  if (hour < 19.5) return "DUSK";
  return "TWILIGHT";
};

const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");

const ThemeToggle = () => {
  const [now, setNow] = useState(null);
  const [manualTheme, setManualTheme] = useState(null);
  const [automaticNight, setAutomaticNight] = useState(false);
  const clockRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date();
      const hour =
        currentTime.getHours() +
        currentTime.getMinutes() / 60 +
        currentTime.getSeconds() / 3600;
      const isNight = hour < 5.5 || hour >= 19.5;
      const palette = getSkyColors(manualTheme === null ? hour : manualTheme ? 0 : 12);
      const root = document.documentElement;

      setAutomaticNight(isNight);
      root.classList.toggle("dark", manualTheme ?? isNight);
      root.classList.toggle("theme-manual", manualTheme !== null);

      Object.entries(colorProperties).forEach(([key, property]) => {
        root.style.setProperty(property, palette[key]);
      });

      if (clockRef.current) {
        const seconds = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;
        const minutes = currentTime.getMinutes() + seconds / 60;
        const hours = (currentTime.getHours() % 12) + minutes / 60;

        clockRef.current.style.setProperty("--hour-angle", `${hours * 30}deg`);
        clockRef.current.style.setProperty("--minute-angle", `${minutes * 6}deg`);
        clockRef.current.style.setProperty(
          "--second-angle",
          `${seconds * 6}deg`,
        );
      }

      setNow(currentTime);
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(timer);
  }, [manualTheme]);

  const time = now ? formatTime(now) : "--:--:--";
  const hour = now ? now.getHours() + now.getMinutes() / 60 : 12;
  const isNight = manualTheme ?? automaticNight;
  const dayPhase =
    manualTheme === null
      ? getDayPhase(hour)
      : isNight
        ? "NIGHT MODE"
        : "DAY MODE";

  return (
    <button
      ref={clockRef}
      type="button"
      onClick={() =>
        setManualTheme((currentTheme) => !(currentTheme ?? automaticNight))
      }
      aria-label={`Local time ${time}. ${dayPhase}. Switch to ${isNight ? "day" : "night"} mode.`}
      title={`Local time · ${dayPhase} · Click to switch to ${isNight ? "day" : "night"} mode`}
      className="theme-clock"
    >
      <svg
        className="theme-clock__dial"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <circle className="theme-clock__rim" cx="20" cy="20" r="18" />
        {Array.from({ length: 12 }, (_, index) => (
          <line
            key={index}
            className="theme-clock__tick"
            x1="20"
            y1="3.5"
            x2="20"
            y2="6.3"
            transform={`rotate(${index * 30} 20 20)`}
          />
        ))}
        <line
          className="theme-clock__hand theme-clock__hand--hour"
          x1="20"
          y1="21"
          x2="20"
          y2="12"
          style={{ transform: "rotate(var(--hour-angle, 0deg))" }}
        />
        <line
          className="theme-clock__hand theme-clock__hand--minute"
          x1="20"
          y1="21"
          x2="20"
          y2="8.5"
          style={{ transform: "rotate(var(--minute-angle, 0deg))" }}
        />
        <line
          className="theme-clock__hand theme-clock__hand--second"
          x1="20"
          y1="21"
          x2="20"
          y2="6.5"
          style={{ transform: "rotate(var(--second-angle, 0deg))" }}
        />
        <circle className="theme-clock__pin" cx="20" cy="20" r="1.5" />
      </svg>
      <span className="theme-clock__readout">
        <span className="theme-clock__time" aria-hidden="true">
          {time}
        </span>
        <span className="theme-clock__phase" aria-hidden="true">
          {dayPhase}
        </span>
      </span>
      <span className="sr-only">Click to switch between day and night themes</span>
    </button>
  );
};

export default ThemeToggle;
