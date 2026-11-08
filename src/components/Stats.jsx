"use client";

import CountUp from "react-countup";
import { useEffect, useState } from "react";

const stats=[
    {
        num:+1,
        text: "Years of experience"
    },
    {
        num:5,
        text: "Projects completed"
    },
    {
        num:7,
        text: "Technologies mastered"
    },
   
]

const Stats = () => {
  const [githubStats, setGithubStats] = useState({
    commits: null,
    unavailable: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const loadGithubStats = async () => {
      try {
        const response = await fetch("/api/github-stats", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch GitHub stats.");
        }

        if (active) {
          setGithubStats({
            commits: result.data.contributions,
            unavailable: false,
          });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch GitHub stats error:", error);
          if (active) {
            setGithubStats({ commits: null, unavailable: true });
          }
        }
      }
    };

    loadGithubStats();
    const intervalId = window.setInterval(loadGithubStats, 15 * 60 * 1000);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const displayStats = [
    ...stats,
    {
      num: githubStats.commits,
      text: "Total contributions",
      dynamic: true,
    },
  ];

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
            {displayStats.map((item,index)=>{
                return(
                    <div className="flex mt-5 gap-4 items-center justify-center xl:justify-items-start"
                    key={index}
                    
                    >
                        {item.dynamic && item.num === null ? (
                          <span
                            className="text-2xl xl:text-3xl font-extrabold"
                            aria-live="polite"
                          >
                            {githubStats.unavailable ? "N/A" : "..."}
                          </span>
                        ) : (
                          <CountUp
                            end={item.num}
                            duration={5}
                            delay={2}
                            className="text-4xl xl:text-6xl font-extrabold"
                          />
                        )}
                        <p className={`${item.text.length <15 ? "max-w-25":"max-w-37.5"} leading-snug dark:text-white/80`}>{item.text}</p>
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  )
}

export default Stats
