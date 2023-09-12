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
      <ul className="flex flex-col gap-3 items-start justify-between w-full h-1/2">
        {url && (
          <li className="flex items-center gap-3">
            <Link href={url} />
            <FaLink /> {url.toUpperCase()}
          </li>
        )}
        {twitter_account && (
          <li className="flex items-center gap-3">
            <Link href={`https://twitter.com/${twitter_account}`} />
            <FaTwitter size="25" /> @{twitter_account}
          </li>
        )}
        {facebook_account && (
          <li className="flex items-center gap-3">
            <Link href={`https://facebook.com/${facebook_account}`} />{" "}
            <FaFacebook
              size="25"
              color="blue"
              title="FaceBook link for Members page"
            />{" "}
            {facebook_account}
          </li>
        )}
        {youtube_account && (
          <li className="flex items-center gap-3">
            <Link href={`https://youtube.com/user/${youtube_account}`} />
            <FaYoutube
              color="red"
              title="YouTube link for member channel"
            />{" "}
            {youtube_account.toUpperCase()}
          </li>
        )}
        {rss_url && (
          <li className="flex items-center gap-2">
            <Link href={rss_url} />
            <FaRss color="orange" title="Rss icon for member feed" />{" "}
            {rss_url.toUpperCase()}
          </li>
        )}
      </ul>
    </div>
  );
};

export default SocialMediaLinks;
