import { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { DateRange } from "react-date-range";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// date range selector css
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

/* eslint-disable react/prop-types */
const ReservationCard = ({ listingData }) => {
  // refs
  const calendarRef = useRef();
  const dropdownRef = useRef();

  // handling outside click
  const { state: calendarState, setState: setCalendarState } =
    useOutsideClick(calendarRef);
  const { state: showDropdown, setState: setShowDropdown } =
    useOutsideClick(dropdownRef);

  // guests number is calculated here
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [childrenNumber, setChildrenNumber] = useState(0);
  const [totalGuest, setTotalGuest] = useState(guestsNumber + childrenNumber);
  // const [showDropdown, setShowDropdown] = useState(false);

  // dates saving and showing to the dateRange calendar calculation here
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // calculating how many nights guest is staying
  const [nightsStaying, setNightStaying] = useState(1);

  console.log(nightsStaying, typeof nightsStaying, "nights");

  // formatted dates to save in the db
  const formattedStartDate = selectedDates[0]?.startDate?.toISOString();
  const formattedEndDate = selectedDates[0]?.endDate?.toISOString();

  // local dates from fromatted date to show in the ui
  const localStartDate = new Date(formattedStartDate).toLocaleDateString();
  const localEndDate = new Date(formattedEndDate).toLocaleDateString();

  console.log(
    new Date(formattedStartDate).toLocaleDateString(),
    formattedEndDate,
    selectedDates,
    "dates"
  );
  // Function to handle date selection
  const handleSelect = (ranges) => {
    setSelectedDates([ranges.selection]);
  };

  // side effects and logic
  useEffect(() => {
    const daysInMiliSec = Math.ceil(
      selectedDates[0]?.endDate - selectedDates[0]?.startDate
    );
    setNightStaying(daysInMiliSec / (1000 * 60 * 60 * 24));
  }, [selectedDates]);

  useEffect(() => {
    setTotalGuest(guestsNumber + childrenNumber);
  }, [guestsNumber, childrenNumber]);

  return (
    <>
      <div className=" w-full min-h-[315px] rounded-xl border border-[#dddddd] sticky top-32 shadow-customShadow p-6">
        <div className=" flex felx-row justify-between items-start">
          <div className=" flex flex-col">
            <h3 className=" text-[22px] text-[#222222] font-semibold">
              ${listingData?.basePrice}
            </h3>
            <p className=" text-[#313131] text-sm">Total before taxes</p>
          </div>
          <span className=" text-sm text-[#222222] flex flex-row gap-1 items-center mt-2">
            <AiFillStar size={18} />
            {listingData?.ratings ? listingData?.ratings : "New"}
            {listingData?.reviews && (
              <span>
                <span>·</span>
                <span>{listingData?.reviews}</span>
              </span>
            )}
          </span>
        </div>
        {/* calender section */}

        {!calendarState && (
          <div className=" rounded-tl-lg rounded-tr-lg border border-[#b9b9b9] w-full min-h-[60px] mt-6 relative flex flex-col">
            {/* dates & calendar & guests here */}
            <div>
              <div
                onClick={() => {
                  setCalendarState(true);
                }}
                className=" grid grid-cols-2 cursor-pointer"
              >
                <div className="px-3 py-3">
                  <p className=" text-[10px] text-black font-semibold uppercase">
                    check-in
                  </p>
                  <p className=" text-sm text-[#222222]">{localStartDate}</p>
                </div>
                <div className="px-3 py-3 border-l border-[#b9b9b9]">
                  <p className=" text-[10px] text-black font-semibold uppercase">
                    checkout
                  </p>
                  <p className=" text-sm text-[#222222]">{localEndDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* guest selection */}

        {!calendarState && (
          <div
            ref={dropdownRef}
            onClick={() => {
              setShowDropdown((prev) => !prev);
            }}
          >
            <div className=" rounded-bl-lg rounded-br-lg border border-[#b9b9b9] w-full min-h-[50px] cursor-pointer relative">
              {/* guests data */}
              <div className="px-3 py-3 flex flex-row items-center justify-between">
                <div className=" flex flex-col">
                  <p className=" text-[10px] text-black font-semibold uppercase">
                    guests
                  </p>
                  <p className=" text-sm text-[#222222]">
                    {totalGuest} {totalGuest === 1 ? "guest" : "guests"}
                  </p>
                </div>
                <div>
                  {showDropdown ? (
                    <MdKeyboardArrowUp size={26} />
                  ) : (
                    <MdKeyboardArrowDown size={26} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* guests data dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="min-h-[200px] w-72 shadow-lg border absolute z-[90] bg-white px-4 py-5 rounded-md"
          >
            <div className=" flex flex-col gap-5">
              <div className=" flex felx-row items-center justify-between">
                {/* adults number here */}
                <span>
                  <p className=" text-base text-[#222222] font-medium">
                    Adults
                  </p>
                  <p className=" text-sm text-[#313131]">Age 13+</p>
                </span>
                {/* icons */}
                <span className=" flex flex-row-reverse items-center gap-2">
                  <button
                    onClick={() => {
                      setGuestsNumber((prev) => prev + 1);
                    }}
                    disabled={listingData?.floorPlan?.guests === totalGuest}
                    className={` p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20`}
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                  <p className=" w-[30px] flex justify-center">
                    {guestsNumber}
                  </p>

                  <button
                    onClick={() => {
                      setGuestsNumber((prev) => prev - 1);
                    }}
                    disabled={guestsNumber === 1}
                    className=" p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    <AiOutlineMinus size={16} />
                  </button>
                </span>
              </div>
              <div className=" flex felx-row items-center justify-between">
                {/* children number here */}
                <span>
                  <p className=" text-base text-[#222222] font-medium">
                    Children
                  </p>
                  <p className=" text-sm text-[#313131]">Ages 2-12</p>
                </span>
                {/* icons */}
                <span className=" flex flex-row-reverse items-center gap-2">
                  <button
                    onClick={() => {
                      setChildrenNumber((prev) => prev + 1);
                    }}
                    disabled={listingData?.floorPlan?.guests === totalGuest}
                    className=" p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                  <p className=" w-[30px] flex justify-center">
                    {childrenNumber}
                  </p>

                  <button
                    onClick={() => {
                      setChildrenNumber((prev) => prev - 1);
                    }}
                    disabled={childrenNumber === 0}
                    className=" p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    <AiOutlineMinus size={16} />
                  </button>
                </span>
              </div>
            </div>
            {/* close btn */}
            <div className=" flex justify-end absolute bottom-3 right-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                }}
                className="underline text-base text-[#222222] font-medium px-3 py-2 rounded-lg hover:bg-[#f5f5f5]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* reservation button */}
        {!showDropdown && !calendarState && (
          <div className=" mt-6 flex justify-center rounded-md">
            <button className="capitalize py-3 w-full bg-[#ff385c] hover:bg-[#d90b63] transition duration-200 ease-in text-white font-medium text-sm rounded-md">
              reserve
            </button>
          </div>
        )}

        {/* calendar & date picker */}
        {!calendarState ? null : (
          <div
            ref={calendarRef}
            className=" absolute border-b-[1.2px] border-neutral-200 left-[2px] shadow-md"
          >
            <DateRange
              rangeColors={["#262626"]}
              date={new Date()}
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={selectedDates}
              // disabledDates={bookedDates}
              direction="vertical"
              showDateDisplay={false}
              minDate={new Date()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ReservationCard;