import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

// Components
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <>
      <section className="h-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between mx-20 xl:pt-8 xl:pb-24">
            {/* text */}
            <div className="text-center mt-3 xl:text-left order-2 xl:order-0">
              <span className="text-xl font-semibold">Software Developer</span>
              <h1 className="h1 mb-6">
                Hello I'm <br /> <span className="text-accent">Arun Varma</span>
              </h1>
              <p className="max-w-125 mb-9 dark:text-white/80 ">
                A minimalist builder solving complex problems. Turning cluttered
                ideas into simple, working software.
              </p>

              {/* btn and social media links */}

              <div className="flex flex-col xl:flex-row items-center justify-items-start gap-8">
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
              <Photo/>
              </div>
          </div>
        </div>
        <Stats/>
      </section>
    </>
  );
};

export default Home;
