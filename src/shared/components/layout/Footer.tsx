import * as lucideReact from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-[108px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">Company</h3>
            <ul className="space-y-3 text-neutral-gray-CB font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  about us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  order status
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">Info</h3>
            <ul className="space-y-3 text-neutral-gray-CB font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  How it works?
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  our promises
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">Contact us</h3>
            <ul className="space-y-3 text-neutral-gray-CB font-light">
              <li className="flex items-start gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0004 11.8083C8.22539 11.8083 6.77539 10.3666 6.77539 8.5833C6.77539 6.79997 8.22539 5.36664 10.0004 5.36664C11.7754 5.36664 13.2254 6.80831 13.2254 8.59164C13.2254 10.375 11.7754 11.8083 10.0004 11.8083ZM10.0004 6.61664C8.91706 6.61664 8.02539 7.49997 8.02539 8.59164C8.02539 9.6833 8.90872 10.5666 10.0004 10.5666C11.0921 10.5666 11.9754 9.6833 11.9754 8.59164C11.9754 7.49997 11.0837 6.61664 10.0004 6.61664Z"
                    fill="#CBCBCB"
                  />
                  <path
                    d="M9.99941 18.9666C8.76608 18.9666 7.52441 18.4999 6.55775 17.5749C4.09941 15.2082 1.38275 11.4332 2.40775 6.94156C3.33275 2.86656 6.89108 1.04156 9.99941 1.04156C9.99941 1.04156 9.99942 1.04156 10.0077 1.04156C13.1161 1.04156 16.6744 2.86656 17.5994 6.9499C18.6161 11.4416 15.8994 15.2082 13.4411 17.5749C12.4744 18.4999 11.2327 18.9666 9.99941 18.9666ZM9.99941 2.29156C7.57441 2.29156 4.45775 3.58323 3.63275 7.21656C2.73275 11.1416 5.19941 14.5249 7.43275 16.6666C8.87441 18.0582 11.1327 18.0582 12.5744 16.6666C14.7994 14.5249 17.2661 11.1416 16.3827 7.21656C15.5494 3.58323 12.4244 2.29156 9.99941 2.29156Z"
                    fill="#CBCBCB"
                  />
                </svg>
                <span>123 Main Street, Anytown,USA</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.542 18.9582C13.6003 18.9582 12.6087 18.7332 11.5837 18.2999C10.5837 17.8749 9.57533 17.2916 8.59199 16.5832C7.61699 15.8666 6.67532 15.0666 5.78366 14.1916C4.90033 13.2999 4.10033 12.3582 3.39199 11.3916C2.67533 10.3916 2.10033 9.39156 1.69199 8.4249C1.25866 7.39156 1.04199 6.39156 1.04199 5.4499C1.04199 4.7999 1.15866 4.18323 1.38366 3.60823C1.61699 3.01656 1.99199 2.46657 2.50033 1.99156C3.14199 1.35823 3.87533 1.04156 4.65866 1.04156C4.98366 1.04156 5.31699 1.11656 5.60033 1.2499C5.92532 1.3999 6.20033 1.6249 6.40032 1.9249L8.33366 4.6499C8.50866 4.89156 8.64199 5.1249 8.73366 5.35823C8.84199 5.60823 8.90032 5.85823 8.90032 6.0999C8.90032 6.41656 8.80866 6.7249 8.63366 7.01656C8.50866 7.24156 8.31699 7.48323 8.07532 7.7249L7.50866 8.31656C7.51699 8.34156 7.52532 8.35823 7.53366 8.3749C7.63366 8.5499 7.83366 8.8499 8.21699 9.2999C8.62532 9.76656 9.00866 10.1916 9.39199 10.5832C9.88366 11.0666 10.292 11.4499 10.6753 11.7666C11.1503 12.1666 11.4587 12.3666 11.642 12.4582L11.6253 12.4999L12.2337 11.8999C12.492 11.6416 12.742 11.4499 12.9837 11.3249C13.442 11.0416 14.0253 10.9916 14.6087 11.2332C14.8253 11.3249 15.0587 11.4499 15.3087 11.6249L18.0753 13.5916C18.3837 13.7999 18.6087 14.0666 18.742 14.3832C18.867 14.6999 18.9253 14.9916 18.9253 15.2832C18.9253 15.6832 18.8337 16.0832 18.6587 16.4582C18.4837 16.8332 18.267 17.1582 17.992 17.4582C17.517 17.9832 17.0003 18.3582 16.4003 18.5999C15.8253 18.8332 15.2003 18.9582 14.542 18.9582ZM4.65866 2.29156C4.20033 2.29156 3.77533 2.49156 3.36699 2.89156C2.98366 3.2499 2.71699 3.64157 2.55033 4.06657C2.37533 4.4999 2.29199 4.95823 2.29199 5.4499C2.29199 6.2249 2.47533 7.06657 2.84199 7.93323C3.21699 8.81657 3.74199 9.73323 4.40866 10.6499C5.07533 11.5666 5.83366 12.4582 6.66699 13.2999C7.50032 14.1249 8.40032 14.8916 9.32532 15.5666C10.2253 16.2249 11.1503 16.7582 12.067 17.1416C13.492 17.7499 14.8253 17.8916 15.9253 17.4332C16.3503 17.2582 16.7253 16.9916 17.067 16.6082C17.2587 16.3999 17.4087 16.1749 17.5337 15.9082C17.6337 15.6999 17.6837 15.4832 17.6837 15.2666C17.6837 15.1332 17.6587 14.9999 17.592 14.8499C17.567 14.7999 17.517 14.7082 17.3587 14.5999L14.592 12.6332C14.4253 12.5166 14.2753 12.4332 14.1337 12.3749C13.9503 12.2999 13.8753 12.2249 13.592 12.3999C13.4253 12.4832 13.2753 12.6082 13.1087 12.7749L12.4753 13.3999C12.1503 13.7166 11.6503 13.7916 11.267 13.6499L11.042 13.5499C10.7003 13.3666 10.3003 13.0832 9.85866 12.7082C9.45866 12.3666 9.02532 11.9666 8.50032 11.4499C8.09199 11.0332 7.68366 10.5916 7.25866 10.0999C6.86699 9.64156 6.58366 9.2499 6.40866 8.9249L6.30866 8.6749C6.25866 8.48323 6.24199 8.3749 6.24199 8.25823C6.24199 7.95823 6.35033 7.69156 6.55866 7.48323L7.18366 6.83323C7.35032 6.66656 7.47532 6.50823 7.55866 6.36656C7.62532 6.25823 7.65033 6.16656 7.65033 6.08323C7.65033 6.01656 7.62533 5.91656 7.58366 5.81657C7.52533 5.68323 7.43366 5.53323 7.31699 5.3749L5.38366 2.64156C5.30032 2.5249 5.20033 2.44156 5.07533 2.38323C4.94199 2.3249 4.80033 2.29156 4.65866 2.29156ZM11.6253 12.5082L11.492 13.0749L11.717 12.4916C11.6753 12.4832 11.642 12.4916 11.6253 12.5082Z"
                    fill="#CBCBCB"
                  />
                  <path
                    d="M15.4167 8.12504C15.075 8.12504 14.7917 7.84171 14.7917 7.50004C14.7917 7.20004 14.4917 6.57504 13.9917 6.04171C13.5 5.51671 12.9583 5.20837 12.5 5.20837C12.1583 5.20837 11.875 4.92504 11.875 4.58337C11.875 4.24171 12.1583 3.95837 12.5 3.95837C13.3083 3.95837 14.1583 4.39171 14.9 5.18337C15.5917 5.92504 16.0417 6.83337 16.0417 7.50004C16.0417 7.84171 15.7583 8.12504 15.4167 8.12504Z"
                    fill="#CBCBCB"
                  />
                  <path
                    d="M18.3333 8.1249C17.9917 8.1249 17.7083 7.84157 17.7083 7.4999C17.7083 4.6249 15.375 2.29156 12.5 2.29156C12.1583 2.29156 11.875 2.00823 11.875 1.66656C11.875 1.3249 12.1583 1.04156 12.5 1.04156C16.0583 1.04156 18.9583 3.94157 18.9583 7.4999C18.9583 7.84157 18.675 8.1249 18.3333 8.1249Z"
                    fill="#CBCBCB"
                  />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0003 17.7083H5.83366C2.79199 17.7083 1.04199 15.9583 1.04199 12.9166V7.08329C1.04199 4.04163 2.79199 2.29163 5.83366 2.29163H14.167C17.2087 2.29163 18.9587 4.04163 18.9587 7.08329V9.58329C18.9587 9.92496 18.6753 10.2083 18.3337 10.2083C17.992 10.2083 17.7087 9.92496 17.7087 9.58329V7.08329C17.7087 4.69996 16.5503 3.54163 14.167 3.54163H5.83366C3.45033 3.54163 2.29199 4.69996 2.29199 7.08329V12.9166C2.29199 15.3 3.45033 16.4583 5.83366 16.4583H10.0003C10.342 16.4583 10.6253 16.7416 10.6253 17.0833C10.6253 17.425 10.342 17.7083 10.0003 17.7083Z"
                    fill="#CBCBCB"
                  />
                  <path
                    d="M9.99998 10.725C9.29998 10.725 8.59165 10.5084 8.04998 10.0667L5.44164 7.98336C5.17498 7.76669 5.12498 7.37503 5.34165 7.10837C5.55831 6.8417 5.94997 6.80004 6.21664 7.00837L8.82497 9.09171C9.45831 9.60004 10.5333 9.60004 11.1666 9.09171L13.775 7.00837C14.0416 6.79171 14.4333 6.83337 14.65 7.10837C14.8666 7.37503 14.825 7.77502 14.55 7.98336L11.9416 10.0667C11.4083 10.5084 10.7 10.725 9.99998 10.725Z"
                    fill="#CBCBCB"
                  />
                  <path
                    d="M13.1833 18.15C12.8666 18.15 12.5666 18.0333 12.35 17.8166C12.0916 17.5583 11.975 17.1833 12.0333 16.7916L12.1916 15.6666C12.2333 15.375 12.4083 15.025 12.6166 14.8166L15.5666 11.8666C15.9666 11.4666 16.3583 11.2583 16.7833 11.2166C17.3 11.1666 17.8166 11.3833 18.3 11.8666C18.7833 12.35 19 12.8583 18.95 13.3833C18.9083 13.8 18.6916 14.2 18.3 14.6L15.35 17.55C15.1416 17.7583 14.7916 17.9333 14.5 17.975L13.375 18.1333C13.3083 18.1416 13.25 18.15 13.1833 18.15ZM16.925 12.4583C16.9166 12.4583 16.9083 12.4583 16.9 12.4583C16.7833 12.4666 16.625 12.575 16.45 12.75L13.5 15.7C13.475 15.725 13.4333 15.8083 13.4333 15.8416L13.2833 16.8833L14.325 16.7333C14.3583 16.725 14.4416 16.6833 14.4666 16.6583L17.4166 13.7083C17.5916 13.525 17.7 13.375 17.7083 13.2583C17.725 13.0916 17.5583 12.8916 17.4166 12.75C17.2833 12.6166 17.0916 12.4583 16.925 12.4583Z"
                    fill="#CBCBCB"
                  />
                  <path
                    d="M17.4338 15.2083C17.3755 15.2083 17.3171 15.1999 17.2671 15.1833C16.1671 14.8749 15.2922 14 14.9838 12.9C14.8922 12.5666 15.0838 12.2249 15.4171 12.1249C15.7505 12.0333 16.0922 12.2249 16.1838 12.5583C16.3755 13.2416 16.9171 13.7833 17.6005 13.9749C17.9338 14.0666 18.1255 14.4166 18.0338 14.75C17.9588 15.025 17.7088 15.2083 17.4338 15.2083Z"
                    fill="#CBCBCB"
                  />
                </svg>
                <span className="break-all">TechHeimSupport@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">
              Sign up for News and updates
            </h3>
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg border border-neutral-gray-F9 bg-transparent">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                  fill="#F9F9F9"
                />
                <path
                  d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                  fill="#F9F9F9"
                />
              </svg>
              <input
                type="email"
                placeholder="E-mail Address"
                className="flex-1 bg-transparent border-none outline-none text-neutral-gray-F9 font-light placeholder:text-neutral-gray-F9"
              />
              <lucideReact.ArrowRight className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-primary-900 transition-colors"
              >
                <lucideReact.Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-primary-900 transition-colors"
              >
                <lucideReact.Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-primary-900 transition-colors"
              >
                <lucideReact.Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-primary-900 transition-colors"
              >
                <lucideReact.Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-primary-900 bg-primary-900">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[108px] py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-neutral-gray-CB">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z"
                stroke="#CBCBCB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.8802 15C14.1702 15.62 13.2502 16 12.2402 16C10.0302 16 8.24023 14.21 8.24023 12C8.24023 9.79 10.0302 8 12.2402 8C13.2502 8 14.1702 8.38 14.8802 9"
                stroke="#CBCBCB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>2023 Tech Heim.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-neutral-gray-CB">
            <a href="#" className="hover:text-white transition-colors">
              cookie settings
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms and Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Imprint
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
