
"use client";

import { motion } from "motion/react";
import { useState } from "react";

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
  "h-12 w-full min-w-0 rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground shadow-none transition-colors focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent";

const Contact = () => {
  const [service, setService] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const isSubmitting = submissionStatus === "submitting";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionStatus("submitting");
    setFeedback("");

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service,
          message: formData.get("message"),
        }),
      });
      const result = await response.json();

      if (result.saved) {
        form.reset();
        setService("");
      }

      if (!response.ok || !result.success) {
        setSubmissionStatus(result.saved ? "warning" : "error");
        setFeedback(result.message || "Unable to send your message.");
        return;
      }

      form.reset();
      setService("");
      setSubmissionStatus("success");
      setFeedback(result.message);
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmissionStatus("error");
      setFeedback("Unable to send your message right now. Please try again later.");
    }
  };

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
      className="flex min-h-[80vh] items-center py-7 sm:py-14 lg:py-16"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main layout */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.9fr)] lg:gap-10 xl:gap-14">

          {/* Contact form */}
          <div className="order-2 min-w-0 lg:order-1">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-gray-900/5 sm:p-8 lg:p-9"
            >
              {/* Form heading */}
              <div className="space-y-3">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  Let&apos;s work together
                </h1>

                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  Have a project in mind? Tell me about your
                  ideas, goals, or requirements. Let&apos;s build
                  something meaningful together.
                </p>
              </div>

              {/* Personal information */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First name
                  </label>

                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    maxLength={100}
                    required
                    className={inputStyles}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last name
                  </label>

                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    maxLength={100}
                    required
                    className={inputStyles}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={320}
                    required
                    className={inputStyles}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone number
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </label>

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91"
                    autoComplete="tel"
                    maxLength={50}
                    className={inputStyles}
                  />
                </div>
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-foreground"
                >
                  Service
                </label>

                <Select value={service || null} onValueChange={(value) => setService(value || "")}>
                  <SelectTrigger
                    id="service"
                    className={`${inputStyles} justify-between text-card-foreground`}
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
                  className="text-sm font-medium text-foreground"
                >
                  Your message
                </label>

                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  maxLength={5000}
                  className="min-h-36 w-full resize-y rounded-lg border border-border bg-card px-4 py-3 text-sm leading-6 text-card-foreground placeholder:text-muted-foreground shadow-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent sm:min-h-40"
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p
                  aria-live="polite"
                  className={`text-xs leading-5 ${
                    submissionStatus === "success"
                      ? "text-green-400"
                      : submissionStatus === "error" || submissionStatus === "warning"
                        ? "text-amber-300"
                        : "text-muted-foreground"
                  }`}
                >
                  {feedback || "I'll get back to you as soon as possible."}
                </p>

                <Button
                  type="submit"
                  size="md"
                  disabled={isSubmitting}
                  className="group w-full gap-3 rounded-full px-6 py-1 font-semibold sm:w-fit"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                  {!isSubmitting && (
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  )}
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

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Let&apos;s start a conversation.
              </h2>

              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Whether you have a project idea, a question,
                or an opportunity, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {info.map((item) => {
                const content = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-lg text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground sm:h-14 sm:w-14">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">
                        {item.title}
                      </p>

                      <p className="mt-1 wrap-break-word text-sm font-semibold leading-6 text-foreground sm:text-base">
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
                        className="group flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-accent/50 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-card/70 p-4">
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Availability card */}
            <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />

                <p className="text-sm font-semibold text-foreground">
                  Open to opportunities
                </p>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
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
