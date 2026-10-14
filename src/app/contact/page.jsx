
"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+91 82618 82236",
    href: "tel:+918261882236",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "varmaarun580@gmail.com",
    href: "mailto:varmaarun580@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Maharashtra, India",
    href: null,
  },
];

const inputStyles =
  "h-12 w-full min-w-0 rounded-lg border border-white/10 bg-[#1c1b22] px-4 text-sm text-white placeholder:text-white/45 shadow-none transition-colors focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent";

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.3,
          duration: 0.4,
          ease: "easeOut",
        },
      }}
      className="flex min-h-[80vh] items-center py-10 sm:py-14 lg:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main layout */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.9fr)] lg:gap-10 xl:gap-14">

          {/* Contact form */}
          <div className="order-2 min-w-0 lg:order-1">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col gap-6 rounded-2xl border border-white/5 bg-[#27272c] p-5 shadow-lg shadow-black/5 sm:p-7 lg:p-8"
            >
              {/* Form heading */}
              <div className="space-y-3">
                <h1 className="text-2xl font-bold tracking-tight text-accent sm:text-3xl lg:text-4xl">
                  Let's work together
                </h1>

                <p className="text-sm leading-6 text-white/65 sm:text-base">
                  Have a project in mind? Tell me about your
                  ideas, goals, or requirements. Let's build
                  something meaningful together.
                </p>
              </div>

              {/* Personal information */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-white/80"
                  >
                    First name
                  </label>

                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    required
                    className={inputStyles}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-white/80"
                  >
                    Last name
                  </label>

                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    required
                    className={inputStyles}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white/80"
                  >
                    Email address
                  </label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className={inputStyles}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-white/80"
                  >
                    Phone number
                    <span className="ml-1 text-white/40">
                      (optional)
                    </span>
                  </label>

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91"
                    autoComplete="tel"
                    className={inputStyles}
                  />
                </div>
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-white/80"
                >
                  Service
                </label>

                <Select name="service">
                  <SelectTrigger
                    id="service"
                    className={`${inputStyles} justify-between`}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available services</SelectLabel>

                      <SelectItem value="web-development">
                        Web Development
                      </SelectItem>

                      <SelectItem value="full-stack">
                        Full-Stack Development
                      </SelectItem>

                      <SelectItem value="ai-development">
                        AI & Generative AI
                      </SelectItem>

                      <SelectItem value="ui-ux">
                        UI/UX Development
                      </SelectItem>

                      <SelectItem value="other">
                        Other
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/80"
                >
                  Your message
                </label>

                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  className="min-h-36 w-full resize-y rounded-lg border border-white/10 bg-[#1c1b22] px-4 py-3 text-sm leading-6 text-white placeholder:text-white/45 shadow-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent sm:min-h-40"
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-white/45">
                  I'll get back to you as soon as possible.
                </p>

                <Button
                  type="submit"
                  size="md"
                  className="group w-full gap-2 rounded-full px-6 font-semibold sm:w-fit"
                >
                  Send message
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>

          {/* Contact information */}
          <aside className="order-1 flex min-w-0 flex-col justify-center gap-7 lg:order-2 lg:gap-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Get in touch
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Let's start a conversation.
              </h2>

              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Whether you have a project idea, a question,
                or an opportunity, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {info.map((item) => {
                const content = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#27272c] text-lg text-accent transition-colors group-hover:bg-accent group-hover:text-[#17171c] sm:h-14 sm:w-14">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">
                        {item.title}
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-950 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </>
                );

                return (
                  <div key={item.title} className="min-w-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex min-w-0 items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex min-w-0 items-center gap-4">
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Availability card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />

                <p className="text-sm font-semibold text-gray-950">
                  Open to opportunities
                </p>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Available to discuss full-stack development,
                software engineering, and AI-powered projects.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
