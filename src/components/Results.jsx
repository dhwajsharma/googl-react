import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.slice(0, 30) + "..." : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ link: { href, title } }, image, index) => (
            <a
              className="sm:p-3 p-5"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {results?.entries?.map(({ id, links, source, title }) => (
            <div key={id} className="md:w-2/5 w-full ">
              <a href={links?.[0].href} target="_blank" rel="noreferrer " className="hover:underline ">
                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
              </a>
              <div className="flex gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source?.href}</a>
              </div>
            </div>
          ))}
        </div>
      );

    case "/videos":
      return (
         <div className="flex flex-wrap">
          {results?.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={video.additional_links[0].href} controls width="355px" height="200px" />
            </div>
          ))}
         </div>
      )

    default:
      return "error";
  }
};

export default Results;
