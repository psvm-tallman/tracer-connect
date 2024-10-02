import Carousel from "@/components/carousel/carousel";

const PatentCarousel = () => {
  const patentInfo = [
    {
      title:
        "Fuzzy Classifications and Decision Tree based Estimation of Phishing Messages and URLs and Height",
      authors: [
        { name: "Radhakrishnan Subramanian", _id: 1 },
        { name: "Bhanudas Shankarao Kuchekar", _id: 2 },
        { name: "Swati Changdeo Jagdale", _id: 3 },
      ],
      appliedCountry: "India",
      patentNumber: "2234988762109",
      patentCategory: "Machine Learning",
    },
    {
      title:
        "Fuzzy Classifications and Decision Tree based Estimation of Phishing Messages and URLs and Height",
      authors: [
        { name: "Radhakrishnan Subramanian", _id: 1 },
        { name: "Bhanudas Shankarao Kuchekar", _id: 2 },
        { name: "Swati Changdeo Jagdale", _id: 3 },
      ],
      appliedCountry: "India",
      patentNumber: "2234988762109",
      patentCategory: "Machine Learning",
    },
    {
      title:
        "Fuzzy Phishing Messages and URLs and Height Fuzzy Phishing Messages and URLs and Height Fuzzy Phishing",
      authors: [
        { name: "Radhakrishnan Subramanian", _id: 1 },
        { name: "Bhanudas Shankarao Kuchekar", _id: 2 },
        { name: "Swati Changdeo Jagdale", _id: 3 },
      ],
      appliedCountry: "India",
      patentNumber: "2234988762109",
      patentCategory: "Machine Learning",
    },
  ];

  const description = (
    <>
      <span className="h6-s text-matte-black">
        Ignite creativity. Embrace distinction.
      </span>{" "}
      <span className="text-crimson-red h6-s">MIT-WPU</span>, a
      premier institution, presents a spectrum of courses in{" "}
      <span className="h6-s text-matte-black">Engineering, Management, Design</span>
      , and beyond. Unleash your capabilities at MIT-WPU. Discover an array
      of programs spanning Engineering, Management, Design, and more.
    </>
  );
  

  return (
    <Carousel
      items={patentInfo}
      type="patent"
      bgColor="bg-cloud-blue"
      title="Our Prestigious Patents"
      description={description}
    />
  );
};

export default PatentCarousel;
