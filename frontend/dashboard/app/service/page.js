import { Chart, Pie, Line } from "./chart";
import { Table } from "./table";
import { Footer } from "./footer";
import { Navatas } from "./navbar";
import { Video } from "./video";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navatas />
        <div className="relative">
          <div className="pt-8 bg-blue-800 overflow-hidden relative z-1" style={{ height: "900px" }}>
            <Video />
          </div>
          <div className="-mt-72 pb-2 md:p-5 flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 justify-center relative z-10">
            <Chart />
            <Pie />
          </div>
        </div>
        <div className="flex p-2 mt-6 flex-col items-center">
          <div className="mb-6">
            <Line />
          </div>
          <div className="mb-5">
            <Table />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
