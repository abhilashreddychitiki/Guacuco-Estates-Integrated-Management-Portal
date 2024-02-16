/*eslint-disable*/
import React from "react";

import HomeNavbar from "components/Navbars/HomeNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <HomeNavbar fixed />
      <section className="header relative pt-8 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Welcome to Terrazas de Guacuco!
              </h2>
              <h2 className="font-semibold text-xl text-blueGray-600">
                Elegance Complex designed with Love
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Terrazas de Guacuco is a residential complex located on the island of Margarita, which is a part of the Nueva Esparta state in Venezuela.
                The complex is situated in the northeastern part of the island, near to the town of Guacuco.
              </p>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern.png").default}
          alt="Background Image"
        />
      </section>
      <Footer />
    </>
  );
}
