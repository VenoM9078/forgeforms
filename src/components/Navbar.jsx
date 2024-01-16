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

  const otherFeatures = [
    {
      "name": "Home",
      "link": "/"
    },
    {
      "name": "Tools",
      "link": "https://axiomkit.com/tools"
    },
    {
      "name": "Features",
      "link": "https://axiomkit.com/features"
    },
    {
      "name": "Pricing",
      "link": "https://axiomkit.com/pricing"
    },
    {
      "name": "About Us",
      "link": "https://axiomkit.com/about"
    }
  ]


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

            {otherFeatures.map((ele, index) => {
              return <a
                href={ele.link}
                key={index}
                className="text-sm font-semibold leading-6 dark-text-grey text-gray-900"
              >
                {ele.name}
              </a>
            })}
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
                className="text-sm tracking-wider mr-6 font-semibold leading-6 bg-purple-500 rounded-md text-white px-3 py-2"
              >
                {user?.total_credits || 0} credits left
              </button>{" "}
              <div className="mt-1">
                <UserButton
                  afterSignOutUrl="/"
                  afterMultiSessionSingleSignOutUrl="/"
                  showName={false}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/"
                afterSignUpUrl="/">
                <button className="text-sm tracking-wider font-semibold leading-6 bg-purple-400 rounded-md text-white px-3 py-2">
                  Log in <span aria-hidden="true">→</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            {/* Background backdrop, show/hide based on slide-over state. */}
            <div className="fixed inset-0 z-10" />
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="https://axiomkit.com" className="-m-1.5 p-1.5">
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
                    {otherFeatures.map((ele, index) => {
                      return <a
                        href={ele.link}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark-text-grey text-gray-900"
                      >
                        {ele.name}
                      </a>
                    })}

                  </div>
                  <div className="py-6">
                    <SignedIn afterSignInUrl="/"
                      afterSignUpUrl="/">
                      <UserButton />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton afterSignInUrl="/"
                        afterSignUpUrl="/">
                        <p className="text-white">Sign In</p>
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
