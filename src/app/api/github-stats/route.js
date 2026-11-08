
import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/graphql";
const CACHE_DURATION = 15 * 60 * 1000;

let cachedStats = null;
let cachedUntil = 0;
let pendingRequest = null;

const QUERY = `
  query(
    $username: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    user(login: $username) {
      contributionsCollection(
        from: $from
        to: $to
      ) {
        totalCommitContributions
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

async function fetchGithubStats(username, token, from, to) {
  const response = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "mydeveloperportfolio",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        username,
        from,
        to,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  const collection = result.data?.user?.contributionsCollection;

  if (!collection) {
    throw new Error("Unable to retrieve contribution data.");
  }

  return {
    commits: collection.totalCommitContributions,
    contributions: collection.contributionCalendar.totalContributions,
  };
}

async function calculateStats(username, token, startDate) {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const now = new Date();

  if (Number.isNaN(start.getTime()) || start > now) {
    throw new Error("Invalid contribution start date.");
  }

  let totalCommits = 0;
  let totalContributions = 0;

  const firstYear = start.getUTCFullYear();
  const currentYear = now.getUTCFullYear();

  for (let year = firstYear; year <= currentYear; year++) {
    const from = year === firstYear
      ? start
      : new Date(Date.UTC(year, 0, 1));

    const yearEnd = new Date(
      Date.UTC(year + 1, 0, 1) - 1
    );

    const to = year === currentYear
      ? now
      : yearEnd;

    const stats = await fetchGithubStats(
      username,
      token,
      from.toISOString(),
      to.toISOString()
    );

    totalCommits += stats.commits;
    totalContributions += stats.contributions;
  }

  return {
    commits: totalCommits,
    contributions: totalContributions,
    startDate,
    updatedAt: now.toISOString(),
  };
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME?.trim();
  const token = process.env.GITHUB_TOKEN_API;
  const startDate = process.env.GITHUB_STATS_START_DATE;

  if (!username || !token || !startDate) {
    return NextResponse.json(
      {
        success: false,
        message: "GitHub configuration is missing.",
      },
      { status: 503 }
    );
  }

  if (cachedStats && Date.now() < cachedUntil) {
    return NextResponse.json({
      success: true,
      data: cachedStats,
    });
  }

  try {
    pendingRequest ??= calculateStats(
      username,
      token,
      startDate
    );

    cachedStats = await pendingRequest;
    cachedUntil = Date.now() + CACHE_DURATION;

    return NextResponse.json({
      success: true,
      data: cachedStats,
    });
  } catch (error) {
    console.error("GitHub stats error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch GitHub contributions.",
      },
      { status: 502 }
    );
  } finally {
    pendingRequest = null;
  }
}
