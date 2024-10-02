import { ResearchPublicationsCount } from "@/server/actions/researchPublicationsCounts";
import CounterWrapper from "@/components/counterWrapper";

interface ResearchInfo {
  value: number;
  description: string;
}

const CounterTiles = async () => {
  const data = await ResearchPublicationsCount();
  const researchInfo: ResearchInfo[] = [
    { value: data?.journalDocuments || 0, description: "Journals Published" },
    {
      value: data?.bookChapterDocuments || 0,
      description: "Book Chapters Published",
    },
    { value: data?.conferenceDocuments || 0, description: "Conference Papers" },
    { value: data?.patentsGrantedDocuments || 0, description: "Patents Granted" },
    { value: data?.patentsFiledDocuments || 0, description: "Patents Filed" },
    { value: data?.copyrightDocuments || 0, description: "Copyrights Granted" },
  ];

  return (
    <div className="flex justify-center px-5 md:px-10 py-20 w-full max-w-3xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {researchInfo.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 p-6 rounded-lg max-w-64 shadow-md transition-all duration-300 delay-300 hover:scale-105 bg-blush-pink"
          >
            <h2 className="h1-s text-matte-black">
              <CounterWrapper end={item?.value} />
            </h2>
            <p className="text-m text-center text-stone-gray">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterTiles;
