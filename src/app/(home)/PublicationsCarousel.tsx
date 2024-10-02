"use client"
import React, { useEffect, useState } from "react";
import Carousel from "@/components/carousel/carousel";
import { HOST_URL } from "@/env";

const PublicationsCarousel = () => {
  const [publicationInfos, setPublicationInfos] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(`${HOST_URL}/api/publications/journals/getTopJournals`); 
        const data = await response.json();
        if (data.success && data.data.topJournals) {
          setPublicationInfos(data.data.topJournals);
        }
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };

    fetchPublications();
  }, []);

  const description = (
    <>
      <span className="h6-s text-matte-black">Drive innovation. Pursue excellence.</span>{" "}
      <span className="text-crimson-red h6-s">MIT-WPU</span>, a leading
      university, offers diverse programs in{" "}
      <span className="h6-s text-matte-black">Engineering, Management, Design</span>, and
      more. Unlock your potential at MIT-WPU. Explore a variety of programs
      across Engineering, Management, Design, and beyond.
    </>
  );

  return (
    <Carousel
      items={publicationInfos}
      type="publication"
      bgColor="bg-blue-50"
      title="Our Prestigious Publications"
      description={description}
    />
  );
};

export default PublicationsCarousel;