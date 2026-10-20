"use client"
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

// Components
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { useEffect, useState } from "react";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    const controller=new AbortController();

    const fetchProfile = async () =>{
      try {
        const response = await fetch('/api/about_me',{
          method:"GET",
          cache:"no-store",
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success){
          throw new Error (
            result.message || "Failed to fetch profile"
          );
        }
        setProfile(result.data);

      }catch(err){
        if(err.name !== "AbortError"){
          console.error("Fetch profile error:",err);
          setError("Unable to load your profile.");
        }
      }finally{
        if(!controller.signal.aborted){
          setLoading(false);
        }
      }
    };
    fetchProfile();
    return ()=>controller.abort();

  },[]);

  return (
    <>
      <section className="h-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-7 xl:pb-16">
            {/* text */}
            <div className="text-center xl:text-left order-2 xl:order-0">
              <span className="text-xl font-semibold">{loading
                  ? "Loading..."
                  : profile?.headline || ""}</span>
              <h1 className="h1 mb-6 font-bold">
                Hello I'm <br /> <span className="text-accent">{loading
                    ? "Loading..."
                    : profile?.full_name || ""}</span>
              </h1>
              <p className="h3 max-w-125 mb-9 dark:text-white/80 ">
                {/* A minimalist builder solving complex problems. Turning cluttered
                ideas into simple, working software. */}

                {loading
                  ? "Loading profile..."
                  : profile?.short_bio ||
                    profile?.bio ||
                    ""}
              </p>

              {/* btn and social media links */}

              <div className="flex flex-col xl:flex-row items-center justify-items-start gap-8 ">
                <Button
                  varient="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span className="px-2">Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>

                <div className="">
                  <Socials
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="order-1 xl:order-0 mb-8 xl:mb-0">
              <Photo />
            </div>
          </div>
        </div>
        <Stats />
      </section>
    </>
  );
};

export default Home;
