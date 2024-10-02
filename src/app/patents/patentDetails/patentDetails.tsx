"use client";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Patent from "../patents";
import { patentInfo } from "../patents";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import PublicationList from "../faculties/profile/PublicationList";
// import PublicationList from '../../PublicationList';

interface Inventor {
  _id: string;
  name: string;
  avatarSrc: string;
  school: string;
}

interface Patent {
  _id: string;
  type: string;
  title: string;
  inventors: Inventor[];
  patentStatus: string;
  patentNumber: string;
  appliedCountry: string;
  filedDate: string;
  publishedDate: string;
  grantedDate: string;
}

const PatentDetails: React.FC = () => {
  const router = useRouter();
  const { patentId } = router.query;
  const selectedPatent = patentInfo.find(
    (patent: Patent) => patent._id === patentId
  );

  if (!selectedPatent) {
    return <div>Patent not found</div>;
  }

  return (
    <div className="w-full flex flex-col py-12 px-10 bg-slate-100 gap-y-16">
      <div className="w-full grid grid-cols-7 gap-x-10 ">
        <div className=" col-span-5 gap-y-5">
          <div className="bg-white py-8 px-16 gap-y-6 ">
            <div className=" gap-y-3">
              <p className=" text-red-600 text-s">{selectedPatent.type}</p>
              <h2 className=" text-2xl font-semibold">
                {selectedPatent.title}
              </h2>
              <div>
                {selectedPatent.inventors.map(
                  (inventor: Inventor, index: number) => (
                    <span key={inventor._id} className=" text-p underline">
                      <Link
                        href={`/faculty/${inventor._id}`}
                        className="text-s hover:underline hover:cursor-pointer"
                      >
                        {inventor.name}
                      </Link>
                      {index !== selectedPatent.inventors.length - 1 && ", "}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className=" gap-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-x-3">
                <p className="text-s bg-purple-100 w-fit py-2 px-3 rounded-md">
                  {selectedPatent.patentStatus}
                </p>
                <p className="text-s bg-purple-100 w-fit py-2 px-3 rounded-md">
                  {selectedPatent.patentNumber}
                </p>
                <p className="text-s bg-purple-100 w-fit py-2 px-3 rounded-md">
                  {selectedPatent.appliedCountry}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-x-3">
                <p className="text-s bg-amber-100 w-full py-2 px-3 rounded-md">
                  Filed Date <br /> {selectedPatent.filedDate}
                </p>
                <p className="text-s bg-amber-100 w-full py-2 px-3 rounded-md">
                  Published Date <br /> {selectedPatent.publishedDate}
                </p>
                <p className="text-s bg-amber-100 w-full py-2 px-3 rounded-md">
                  Granted Date <br /> {selectedPatent.grantedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white py-8 px-16 gap-y-10">
            <div className="flex flex-col gap-y-4">
              <h2 className="h5-p text-2xl">Abstract</h2>
              <p className=" lb-p font-normal text-slate-500 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                excepturi unde perspiciatis. Natus itaque recusandae est.
                Necessitatibus temporibus error nobis rem accusantium
                consequuntur magnam voluptate aspernatur, qui quos autem ut.
                Illum dicta laudantium fuga reiciendis natus voluptatem nemo
                nobis? Ab, perferendis impedit! Ipsum doloribus eligendi
                excepturi quisquam cumque vel animi fugit! Quidem iste
                reiciendis fugiat nobis quo, voluptas ullam suscipit.
                Consectetur quae mollitia totam iusto nobis cupiditate magni
                soluta magnam. Dolorem ipsam molestiae repellat repellendus
                eveniet eligendi? Mollitia ad voluptatibus autem obcaecati, nisi
                molestiae quidem doloremque harum illum, quis nesciunt?
              </p>
            </div>
            <div className="btn grid gap-y-5 md:flex-row md:gap-x-5 md:gap-y-0 z-10">
              <Button variant="default" size="default" className="col-span-1">
                Request full text
              </Button>
            </div>
          </div>
        </div>

        <div className=" col-span-2 justify-center items-center bg-white gap-y-6 py-8 px-10">
          <p className="h5-p text-xl text-center tracking-widest">
            Contributors
          </p>

          {selectedPatent.inventors.map((inventor: Inventor, index: number) => (
            <div
              key={inventor._id}
              className="w-full flex flex-col gap-y-3 justify-center items-center px-6 py-5 rounded-lg shadow-md bg-white border border-gray-200"
            >
              <Image
                src={inventor.avatarSrc}
                alt=""
                width={96}
                height={96}
                className="w-24 h-24 border-2 rounded-full border-gray-300"
              />
              <div className=" flex flex-col justify-center items-center text-center">
                <span className="h5-p text-center">
                  <Link
                    href={`/faculty/${inventor._id}`}
                    className="hover:underline hover:cursor-pointer"
                  >
                    {inventor.name}
                  </Link>
                  {index !== selectedPatent.inventors.length - 1 && ", "}
                </span>
                <p className="text-s">{inventor.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-8">
        <h2 className="h5-p text-2xl">Cutting-Edge Patents</h2>
        {/* <PublicationList /> */}
      </div>
    </div>
  );
};

export default PatentDetails;
