import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MainNav } from "@/components/ui/main-nav";
import BarGraph from "@/components/ui/bar-graph";
import { RadarGraph } from "@/components/ui/radar-graph";
import FacultyCard from "@/components/faculty-card/faculty-card";
import PublicationList from "@/app/publications/publicationList";

const overviewCards = [
  { title: "Total Publications", value: "140" },
  { title: "Total Patents", value: "+2350" },
  { title: "Citations", value: "+12,234" },
  { title: "H-Index", value: "+573" },
  { title: "R&D Projects", value: "+573" },
  { title: "Consultancy", value: "+573" },
  { title: "Copyrights", value: "+573" },
  { title: "Books", value: "+573" },
];

const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-4 sm:p-6 lg:p-4">
        <div className="grid gap-4 grid-cols-1 ">
          <div className="col-span-1 pt-8 px-4">
            <FacultyCard />
          </div>
        </div>

        <Tabs defaultValue="overview" className="gap-y-4">
          <TabsContent value="overview" className="">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
              {overviewCards.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between gap-y-0 pb-2">
                    <p className="text-r">{card.title}</p>
                  </CardHeader>
                  <CardContent>
                    <span className="h5-s">{card.value}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7 px-4">
              <Card className="col-span-1 lg:col-span-4">
                <CardContent>
                  <BarGraph />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardContent>
                  <RadarGraph />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <div className="flex flex-col sm:flex-row items-center justify-center sticky top-0 z-10 bg-white border-b px-4 py-2 sm:h-16">
        <MainNav className="mt-2 sm:mt-0 sm:mx-6" />
      </div>
      <div className="p-4">
        <PublicationList />
      </div>
    </div>
  );
};

export default FacultyDashboard;
