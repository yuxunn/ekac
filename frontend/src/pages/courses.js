import React from "react";
import raspberrytart from "../assets/raspberrytart.jpg";
import blueberrypie from "../assets/blueberry-pie.jpg";
import EventCard from "../components/eventcard";
import SimpleMap from "../components/map";
import strawberrycake from "../assets/strawberrycake.png";
import "leaflet/dist/leaflet.css";

const Courses = () => {
  const events = [
    {
      image: raspberrytart,
      title: "Raspberry Tart Intermediate Class",
      date: "Wed, 24 Jul, 18:30",
      location: "georges @ The Waterfront",
      price: "From $50 ++",
      link: "#",
      position: [1.29027, 103.851959],
    },
    {
      image: blueberrypie,
      title: "Blueberry Tart For Beginners",
      date: "Wed, 24 Jul, 18:30",
      location: "Marina Bay",
      price: "From $30 ++",
      link: "#",
      position: [1.28385, 103.86051],
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="shadow">
        <div className="max-w-7xl rounded-lg py-4 px-4 flex items-center">
          <div className="flex items-center">
            <img className="ml-2 w-8 h-8" src={strawberrycake} alt="logo" />
            <h1 className="font-bold ml-2 text-gray-600 mr-6">E.KAC</h1>
          </div>
          <div className=" flex space-x-4">
            <button
              className=" hover:bg-pink-100 text-black font-bold py-2 px-4 rounded"
              onClick={() => (window.location.href = "/home")}
            >
              Home
            </button>
            <button
              className="hover:bg-pink-100 text-black font-bold py-2 px-4 rounded"
              onClick={() => (window.location.href = "/profile")}
            >
              Profile
            </button>
            <button
              className=" hover:bg-pink-100 text-black font-bold py-2 px-4 rounded"
              onClick={() => (window.location.href = "/community")}
            >
              Community
            </button>
            <button
              className=" hover:bg-pink-100 text-black font-bold py-2 px-4 rounded"
              onClick={() => (window.location.href = "/login")}
            >
              Logout
            </button>
            <div className="ml-4">
              <input
                type="text"
                placeholder="Search events"
                className="ml-4 mt-1 block w-64 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex bg-pink-100">
        <aside className="border-hidden h-screen w-1/6 bg-pink-100 p-4 shadow">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="mt-4">
            <h3 className="text-md font-medium">Category</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Baking</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Cooking</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Healthy</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Beginner-friendly</span>
                </label>
              </li>
              <li>
                <button className="text-blue-500 mt-2">View more</button>
              </li>
            </ul>
            <h3 className="text-md font-medium mt-6">Date</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="radio" name="date" className="form-radio" />
                  <span className="ml-2">Today</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="radio" name="date" className="form-radio" />
                  <span className="ml-2">Tomorrow</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="radio" name="date" className="form-radio" />
                  <span className="ml-2">This weekend</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="radio" name="date" className="form-radio" />
                  <span className="ml-2">Pick a date...</span>
                </label>
              </li>
              <li>
                <button className="text-blue-500 mt-2">View more</button>
              </li>
            </ul>
          </div>
        </aside>

        <section className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {events.map((event, index) => (
              <EventCard
                key={index}
                image={event.image}
                title={event.title}
                date={event.date}
                location={event.location}
                price={event.price}
                link={event.link}
              />
            ))}
          </div>
        </section>
        <div>
          <SimpleMap />
        </div>
      </main>
    </div>
  );
};

export default Courses;
