import Logo from "../assets/ASKSQL.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, showCreditsModal, setShowCreditsModal }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen, menuRef]);

  const tools = [
    {
      title: "Transcript AI",
      description: "Get Subtitles from any MP3, MP4 or YouTube Video",
      svgPath: () => (
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
      ),
    },
    {
      title: "Text 2 SQL",
      description: "Generate SQL Queries from Natural Language",
      svgPath: () => (
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
    {
      title: "Text Shot AI",
      description: "Extract text from any YouTube frame!",
      svgPath: () => (
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
          />
        </svg>
      ),
    },
    {
      title: "Brandite",
      description: "Generate brandable names for your business with keywords",
      svgPath: () => (
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
    },
    {
      title: "SmartSlides AI",
      description: "Generate brandable names for your business with keywords",
      svgPath: () => (
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
    },
    {
      title: "QuoteSense",
      description: "Generate aesthetically pleasing Images from Quotes",
      svgPath: () => (
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
          />
        </svg>
      ),
    },
    // ... add other tools here
  ];


  return (
    <>
      <header
        className="bg-transparent relative z-50"
        style={{ zIndex: "99999 !important" }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Axiom Toolkit</span>
              <img src={Logo} style={{ width: "200px" }} />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 dark-text-grey text-gray-900"
                aria-expanded="false"
              >
                <span>Tools</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute left-1/3 z-10 mt-5 flex w-screen max-w-5xl -translate-x-1/2 px-4">
                  <div className="w-screen max-w-3xl flex-auto overflow-hidden rounded-3xl bg-white border border-gray-200 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                    <div className="grid grid-cols-1 gap-x-3 gap-y-1 p-4 lg:grid-cols-3">
                      {tools.map((tool) => (
                        <div
                          className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                          key={tool.title}
                        >
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <tool.svgPath />
                          </div>
                          <div>
                            <a href="#" className="font-semibold text-gray-900">
                              {tool.title}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="text-sm font-semibold leading-6 dark-text-grey text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm font-semibold leading-6 dark-text-grey text-gray-900">
              Marketplace
            </a>
            <Link
              to="/#"
              className="text-sm font-semibold leading-6 dark-text-grey text-gray-900"
            >
              Contact
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedIn>
              <button
                onClick={() => {
                  setShowCreditsModal(true);
                }}
                style={{
                  fontFamily: "FigTree",
                }}
                className="text-sm tracking-wider mr-6 font-semibold leading-6 bg-neutral-900 rounded-md text-white px-3 py-2"
              >
                {user?.total_credits} credits left
              </button>{" "}
              <UserButton
                afterSignOutUrl="/"
                afterMultiSessionSingleSignOutUrl="/"
                showName={false}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-semibold leading-6 text-gray-900">
                  Log in <span aria-hidden="true">→</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        {/* Mobile menu, show/hide based on menu open state. */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            {/* Background backdrop, show/hide based on slide-over state. */}
            <div className="fixed inset-0 z-10" />
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Axiom Toolkit</span>
                  <img className="h-8 w-auto" src={Logo} alt="" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 dark-text-grey text-gray-900"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <div className="-mx-3">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 dark-text-grey text-gray-900"
                        aria-controls="disclosure-1"
                        aria-expanded="false"
                        onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                      >
                        Tools
                        <svg
                          className="h-5 w-5 flex-none"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {isMobileToolsOpen && (
                        <div className="mt-2 space-y-2" id="disclosure-1">
                          {tools.map((tool) => (
                            <a
                              href="#"
                              key={tool.title}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark-text-grey text-gray-900"
                            >
                              {tool.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark-text-grey text-gray-900"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark-text-grey text-gray-900"
                    >
                      Marketplace
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark-text-grey text-gray-900"
                    >
                      Contact
                    </a>
                  </div>
                  <div className="py-6">
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton>
                        <p className="dark-text-grey text-gray-900">Sign In</p>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
