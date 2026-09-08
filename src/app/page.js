import RotatingRole from "@/app/components/RotatingRole";
import Image from "next/image";
import ProjectAccordion from "@/app/components/AccordionComponent";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="home-page">
      {/*hero section*/}
      <section className="home-main grid gap-8 md:grid-cols-2 md:items-center">
        <h1 className="home-heading max-w-lg">
          Hi, I&apos;m Dwaine! I&apos;m
          <br /> <RotatingRole />.
        </h1>
        <div className="relative w-full max-w-56 md:justify-self-end">
          <div className="absolute -right-2 -bottom-2 h-full w-full rounded-full border border-pink-600/60" />
          <div className="relative rounded-full border border-purple-500 bg-zinc-900/50 p-2 shadow-2xl dark:border-zinc-700">
            <Image
              src="/WIN_20230720_15_00_04_Pro.jpg"
              alt="Dwaine Brannon"
              width={400}
              height={400}
              priority
              className="block aspect-square w-full rounded-full object-cover"
            />
          </div>
        </div>
      </section>

      {/*page break*/}
      <hr className="w-full border-zinc-300 dark:border-zinc-700" />

       {/* About section */}
      <section id="about" className="w-full md:w-1/2 px-6 py-20 md:px-16">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="mt-4 max-w-2xl">
          I make music, act, program, write, <br /> <br />I Create.
          </p>
      </section> 
      {/* Projects section */}
      <section id="projects" className="w-full px-6 py-20 md:px-16">
        <h2 className="text-3xl font-bold">Projects</h2>

        <div className="mt-6 max-w-3xl">
          <ProjectAccordion projects={projects} />
        </div>
      </section>
    </main>
  );
}