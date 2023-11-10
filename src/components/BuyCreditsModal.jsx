import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function BuyCreditsModal({
  showCreditsModal,
  setShowCreditsModal,
  user,
}) {
  return (
    <>
      <Transition.Root show={showCreditsModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          // initialFocus={cancelButtonRef}
          onClose={() => setShowCreditsModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-30 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className="px-4 py-2 rounded-full bg-pink-400 flex items-center gap-2 text-white font-medium"
                        style={{ fontFamily: "FigTree" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fff"
                          viewBox="0 0 256 256"
                        >
                          <path d="M197.58,129.06l-51.61-19-19-51.65a15.92,15.92,0,0,0-29.88,0L78.07,110l-51.65,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0l19-51.61,51.65-19a15.92,15.92,0,0,0,0-29.88ZM140.39,163a15.87,15.87,0,0,0-9.43,9.43l-19,51.46L93,172.39A15.87,15.87,0,0,0,83.61,163h0L32.15,144l51.46-19A15.87,15.87,0,0,0,93,115.61l19-51.46,19,51.46a15.87,15.87,0,0,0,9.43,9.43l51.46,19ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path>
                        </svg>
                        Axiom Credits
                      </div>

                      <h2
                        className="text-3xl mt-6 font-bold"
                        style={{ fontFamily: "FigTree" }}
                      >
                        You have {user?.total_credits} credits!
                      </h2>
                    </div>
                    <div className="inline-flex items-center justify-center w-full">
                      <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                      <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#A9A9A9"
                          className="w-4 h-4 text-gray-400"
                          viewBox="0 0 256 256"
                        >
                          <path d="M239.37,70.1A13.16,13.16,0,0,0,227.9,61l-37.22-3.15L176.16,24a13.24,13.24,0,0,0-24.31,0L137.33,57.86,100.1,61a13.13,13.13,0,0,0-7.49,23.06l28.16,24-8.43,35.73a13.1,13.1,0,0,0,5,13.58,13.25,13.25,0,0,0,14.63.7l32-19,32,19a13.25,13.25,0,0,0,14.63-.7,13.09,13.09,0,0,0,5-13.58l-8.43-35.73,28.15-24A13.07,13.07,0,0,0,239.37,70.1Zm-43.86,27a13.06,13.06,0,0,0-4.26,13l7.31,31-27.78-16.51a13.24,13.24,0,0,0-13.56,0L129.44,141l7.31-31a13,13,0,0,0-4.25-13L108.24,76.38l32.09-2.72a13.16,13.16,0,0,0,11-7.94L164,36.24l12.64,29.48a13.18,13.18,0,0,0,11,7.94l32.09,2.72ZM85.66,125.66l-56,56a8,8,0,0,1-11.32-11.32l56-56a8,8,0,0,1,11.32,11.32Zm16,56-56,56a8,8,0,0,1-11.32-11.32l56-56a8,8,0,0,1,11.32,11.32Zm72-11.32a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32-11.32l56-56A8,8,0,0,1,173.66,170.34Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-6">
                      <h2
                        className="text-lg text-center w-64 text-zinc-500  font-medium"
                        style={{ fontFamily: "FigTree" }}
                      >
                        Your Axiom credits can be used in all of our products!
                      </h2>

                      <a
                        href={`https://axiomkit.lemonsqueezy.com/checkout/buy/0c73ee3a-1b9f-41ef-b67d-255c2816a17b?media=0&desc=0&discount=0`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-600 via-purple-700 to-pink-800 flex items-center gap-2 text-white font-medium"
                        style={{ fontFamily: "FigTree" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          sad="16"
                          height="16"
                          fill="#fff"
                          viewBox="0 0 256 256"
                        >
                          <path d="M197.58,129.06l-51.61-19-19-51.65a15.92,15.92,0,0,0-29.88,0L78.07,110l-51.65,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0l19-51.61,51.65-19a15.92,15.92,0,0,0,0-29.88ZM140.39,163a15.87,15.87,0,0,0-9.43,9.43l-19,51.46L93,172.39A15.87,15.87,0,0,0,83.61,163h0L32.15,144l51.46-19A15.87,15.87,0,0,0,93,115.61l19-51.46,19,51.46a15.87,15.87,0,0,0,9.43,9.43l51.46,19ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path>
                        </svg>
                        Add Credits
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
