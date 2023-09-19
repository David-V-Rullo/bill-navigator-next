import React from "react";
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
  twitter_account,
  facebook_account,
  youtube_account,
  url,
  rss_url,
}) => {
  return (
    <div>
      <ul className="flex flex-col gap-3 p-3 items-start justify-between w-full h-1/2 text-sm ">
        {url && (
          <li className="flex items-start gap-2">
            <FaLink />{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url.toUpperCase()}
            </a>
          </li>
        )}
        {twitter_account && (
          <li className="flex items-center gap-3">
            <FaTwitter size="25" />{" "}
            <a
              href={`https://twitter.com/${twitter_account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{twitter_account}
            </a>
          </li>
        )}
        {facebook_account && (
          <li className="flex items-center gap-3">
            {" "}
            <FaFacebook
              size="25"
              color="blue"
              title="FaceBook link for Members page"
            />
            <a
              href={`https://facebook.com/${facebook_account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {facebook_account}
            </a>
          </li>
        )}
        {youtube_account && (
          <li className="flex items-center gap-2">
            <FaYoutube color="red" title="YouTube link for member channel" />{" "}
            <a
              href={`https://youtube.com/user/${youtube_account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {youtube_account.toUpperCase()}
            </a>
          </li>
        )}
        {rss_url && (
          <li className="flex items-center gap-2">
            <FaRss color="orange" title="Rss icon for member feed" />{" "}
            <a href={rss_url} target="_blank" rel="noopener noreferrer">
              {rss_url.toUpperCase()}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SocialMediaLinks;
