This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## CV download

The homepage's **Download CV** button fetches the configured object from Neon Object Storage through the server-side `/api/cv` route. Configure these variables in `.env` and in your deployment environment:

```env
AWS_ENDPOINT_URL_S3=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
NEON_STORAGE_BUCKET=
NEON_CV_OBJECT_KEY=
NEON_AVATAR_KEY=
NEON_HEAD_IMAGE_OBJECT_KEY=
```

Upload the CV, avatar image, and head icon to the configured bucket, then set `NEON_CV_OBJECT_KEY`, `NEON_AVATAR_KEY`, and `NEON_HEAD_IMAGE_OBJECT_KEY` to their object keys (including any folder paths). The avatar is served through `/api/avatar`, and the head icon used in the browser tab is served through `/api/head-icon`. Storage credentials are used only on the server and are not exposed to the browser.

## Social links

The homepage loads social links from the `social_links` table through `/api/social-links`. Add rows with a `platform`, `url`, and optional icon name (`github`, `linkedin`, or `instagram`); links are ordered by `sort_order`.

## Resume data

The resume page loads profile details, experience, education, skills, and GitHub link data from the `about_me`, `experience`, `education`, `skills`, and `social_links` tables through `/api/resume`.

## Contact form

Contact submissions are saved to Neon `contact_messages`. Apply the database changes with `npm run db:migrate:up`, then configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM` locally and in the deployment environment. `CONTACT_EMAIL_TO` optionally overrides the recipient; by default the contact address in `about_me` is used. `SMTP_NO_REPLY_TO` optionally sets the reply-to address for automated confirmations. After saving a submission, the server sends you a notification and the sender an automated thank-you confirmation. SMTP credentials must only be configured server-side.

## GitHub commit stats

The homepage shows your lifetime commit-contribution total from GitHub's contribution history, including private contributions, from account creation through the current year. The server-side `/api/github-stats` route refreshes every 15 minutes. This uses GitHub's contribution-graph rules and is not a raw count of every commit object across all branches. Set `GITHUB_USERNAME` and `GITHUB_TOKEN_API` in `.env` and your deployment environment. The token must belong to that GitHub account to include private contributions, and must never use a `NEXT_PUBLIC_` prefix.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
