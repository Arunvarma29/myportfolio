"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import Link from "next/link";

const socialIcons = {
  github: FaGithub,
  fagithub: FaGithub,
  linkedin: FaLinkedinIn,
  linkedinin: FaLinkedinIn,
  falinkedinin: FaLinkedinIn,
  instagram: FaInstagram,
  fainstagram: FaInstagram,
};

const Socials = ({ containerStyles, iconStyles }) => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("/api/social-links", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Failed to fetch social links.");
        }

        setSocialLinks(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch social links error:", error);
        }
      }
    };

    fetchSocialLinks();
    return () => controller.abort();
  }, []);

  return (
    <div className={containerStyles}>
      {socialLinks.map((item) => {
        let url;

        try {
          url = new URL(item.url);
        } catch {
          console.error("Invalid social link URL:", item.url);
          return null;
        }

        if (url.protocol !== "https:" && url.protocol !== "http:") {
          console.error("Unsupported social link URL protocol:", item.url);
          return null;
        }

        const iconName = String(item.icon || item.platform || "")
          .toLowerCase()
          .replace(/[\s_-]/g, "");
        const Icon = socialIcons[iconName] || FiLink;

        return (
          <Link
            key={item.id}
            href={url.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.platform}
            className={iconStyles}
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
