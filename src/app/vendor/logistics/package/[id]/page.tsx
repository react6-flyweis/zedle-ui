import packagesBgImage from "../../assets/package-bg.jpg";
import { PackageDetailsForm } from "../../components/PackageDetailsForm";

export default function PackageDetailsPage() {
  return (
    <div className="">
      <div
        className="h-72 bg-cover flex flex-col justify-center items-center bg-center text-white"
        style={{ backgroundImage: `url(${packagesBgImage.src})` }}
      >
        <h1 className="text-5xl font-bold ">Package Details</h1>
        <p className="text-xl mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full p-8">
          <PackageDetailsForm />
        </div>
      </div>
    </div>
  );
}
