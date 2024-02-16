import React from "react";

// components
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import Footer from "components/Footers/Footer.js";

// assets
import bg from "assets/img/services.png";

export default function Services() {
  return (
    <>
      <HomeNavbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <h1 className="text-white font-semibold text-5xl">
                  Our Services
                </h1>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-18 pt-20 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">
                      <i className="fas fa-building mr-2 text-lg text-blueGray-400"></i>
                      Buildings
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      We have good and affordable apartments for rent.
                      Our apartments can be leased out for long term or short term.
                      You can access all the facilities in the complex as part of our contract.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:pt-18 pt-20 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">
                      <i className="fas fa-tree mr-2 text-lg text-blueGray-400"></i>
                      Gardens
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      We provide residents with gardens for events.<br/>
                      The gardens are opened 24/7 for residents.<br/>
                      We rent out the gardens to thrid parties for events.<br/>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:pt-18 pt-20 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">
                      <i className="fas fa-swimming-pool mr-2 text-lg text-blueGray-400"></i>
                      Pools
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Our pools can be leased out for external events.
                      We organize picnics, parties and swimming for pool enthusiast.
                      We provide pools for both residents and non residents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
