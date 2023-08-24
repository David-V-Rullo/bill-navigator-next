import React from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaRss,
  FaLink,
} from "react-icons/fa";

interface SocialMediaLinksProps {
  first_name: string;
  last_name: string;
  twitter_account?: string | null;
  facebook_account?: string | null;
  youtube_account?: string | null;
  url?: string | null;
  rss_url?: string | null;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  first_name,
  last_name,
  twitter_account,
  facebook_account,
  youtube_account,
  url,
  rss_url,
}) => {
  return (
    <div>
      <h3>Social Media Links</h3>
      <ul className="flex flex-col gap-3 items-start justify-between w-full">
        {url && (
          <li className="flex items-center gap-3">
            <Link href={url} />
            <FaLink /> Website
          </li>
        )}
        {twitter_account && (
          <li className="flex items-center gap-3">
            <Link href={`https://twitter.com/${twitter_account}`} />
            <FaTwitter /> @{twitter_account}
          </li>
        )}
        {facebook_account && (
          <li className="flex items-center gap-3">
            <Link href={`https://facebook.com/${facebook_account}`} />{" "}
            <FaFacebook /> {facebook_account}
          </li>
        )}
        {youtube_account && (
          <li className="flex items-center gap-3">
            <Link href={`https://youtube.com/user/${youtube_account}`} />
            <FaYoutube /> YouTube
          </li>
        )}
        {rss_url && (
          <li className="flex items-center gap-2">
            <Link href={rss_url} />
            <FaRss /> RSS Feed
          </li>
        )}
      </ul>
    </div>
  );
};

export default SocialMediaLinks;