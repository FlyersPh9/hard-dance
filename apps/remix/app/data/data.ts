import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { getFlag } from "../utils/flag";

type EventMarkdown = {
  layout: string;
  category: string;
  title: string;
  date: string;
  datestart: string;
  dateend?: string;
  location: string;
  hosts: string[];
  is_online?: boolean;
  featured?: boolean;
  image: string;
  isForegroundBlack?: boolean;
  video?: boolean;
  country?: string;
};

// TODO: If this type becomes big, have smaller subsets to prevent sending large amounts of data to the client.
export type Event = {
  id: string;
  title: string;
  datestart: string; // TODO: Should this be date or string?
  datestartDate: Date;
  dateend?: string;
  dateendDate?: Date;
  location: string;
  hosts: string[];
  is_online?: boolean;
  featured?: boolean;
  image: string;
  isForegroundBlack?: boolean;
  video?: boolean;
  country?: string;
  flag?: string;
};

export const markdownToEvent = (markdownFilePath: string): Event => {
  const markdownFileContent = fs.readFileSync(markdownFilePath, "utf8");
  const parsedMarkdown = matter(markdownFileContent);
  const fileName = path.basename(markdownFilePath);

  const {
    title,
    datestart,
    dateend,
    location,
    hosts,
    featured,
    is_online,
    video,
    country,
    image,
  } = parsedMarkdown.data as EventMarkdown;

  return {
    id: fileName.replace(".md", "").substring("yyyy-mm-dd-".length),
    title,
    datestart,
    datestartDate: new Date(datestart),
    dateend,
    dateendDate: dateend ? new Date(dateend) : undefined,
    location,
    hosts,
    featured,
    is_online,
    video,
    flag: getFlag(location ?? ""),
    image,
  };
};
