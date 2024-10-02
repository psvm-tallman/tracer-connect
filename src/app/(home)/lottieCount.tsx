
import { AllCount } from "@/server/actions/allCount";
import LottieCounter from "@/components/ui/lottieCounter";
import publicationIcon from "../../../public/publicationIcon.json";
import facultiesIcon from "../../../public/facultiesIcon.json";
import patentsIcon from "../../../public/patentsIcon.json";

const LottieCount = async () => {
  const allCount = await AllCount();

  const lotties = [
    { label: "Total Research Publications", animationData: publicationIcon, count: allCount?.publicationsCount, },
    { label: "Faculties", animationData: facultiesIcon, count: allCount?.userCounts, },
    { label: "Granted Patents", animationData: patentsIcon, count: allCount?.patentsCount, },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-12 px-5 gap-10 w-full">
      <header className="flex flex-col gap-2.5 items-center justify-center">
        <h2 className="h2-s text-matte-black text-center">
          Shaping Tomorrow&apos;s Discoveries
        </h2>

        <p className="h6-m text-center text-stone-gray">
          Lets empower curious minds to push the boundaries and unlock the
          potential of tomorrow.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-5 lg:gap-5 p-5 text-center max-w-screen-2xl w-full text-matte-black ">
        {lotties.map((item, index) => (
          <LottieCounter
            key={index}
            animationData={item.animationData}
            count={item.count}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default LottieCount;
