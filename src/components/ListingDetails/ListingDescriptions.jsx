import { AiOutlineRight } from "react-icons/ai";
import ListingDescriptionPopup from "../popUp/ListingDescriptionPopup";

/* eslint-disable react/prop-types */
const ListingDescriptions = ({ listingData, author }) => {
  return (
    <>
      <div className=" flex flex-row justify-between items-center max-h-16">
        <div className=" flex flex-col gap-1 text-[#222222]">
          <h2 className=" text-[22px] font-medium">
            Entire Cabin is hosted by {author?.name?.firstName}
          </h2>
          <p className=" text-base">
            {listingData?.floorPlan?.guests} guests ·{" "}
            {listingData?.floorPlan?.bedrooms} bedroom ·{" "}
            {listingData?.floorPlan?.beds} beds ·{" "}
            {listingData?.floorPlan?.bathroomsNumber} bath
          </p>
        </div>
        {/* profile img */}
        <div>
          {author?.profileImg ? (
            <img
              src={author?.profileImg}
              alt="user"
              className=" w-16 rounded-full"
            />
          ) : (
            <div className=" w-14 h-14 bg-[#222222] flex items-center justify-center rounded-full">
              <p className=" text-[#efefef] text-lg font-semibold">
                {author?.name?.firstName?.slice(0, 1)}
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className=" h-[1.2px] w-full bg-[#dddddd] my-8" />
      {/* description in short */}
      <div>
        <p className=" whitespace-pre-wrap">
          {listingData?.description.slice(0, 300)}...
        </p>
      </div>
      {/* modal button */}
      <button
        className=" flex pt-7 underline text-black font-medium items-center gap-1"
        onClick={() => document.getElementById("listing_modal").showModal()}
      >
        Show more
        <AiOutlineRight size={18} />
      </button>

      {/* full description modal */}
      <ListingDescriptionPopup description={listingData?.description} />
    </>
  );
};

export default ListingDescriptions;