import {
  BsFacebook,
  BsGooglePlay,
  BsInstagram,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  const footerSections = {
    Legal: [
      { name: "Privacy", link: "/privacy" },
      { name: "Terms", link: "/terms" },
      { name: "Cookie Policy", link: "/cookie-policy" },
      { name: "Intellectual Property", link: "/intellectual-property" },
      { name: "Consumer Health Data Privacy Policy", link: "/health-privacy" },
    ],
    Careers: [
      { name: "Careers Portal", link: "/careers" },
      { name: "Tech Blog", link: "/tech-blog" },
    ],
    Social: [
      {
        name: "Instagram",
        link: "#",
        icon: <BsInstagram className="w-6 h-6 fill-current" />,
      },
      {
        name: "TikTok",
        link: "#",
        icon: <BsTiktok className="w-6 h-6 fill-current" />,
      },
      {
        name: "YouTube",
        link: "#",
        icon: <BsYoutube className="w-6 h-6 fill-current" />,
      },
      {
        name: "Twitter",
        link: "#",
        icon: <BsTwitter className="w-6 h-6 fill-current" />,
      },
      {
        name: "Facebook",
        link: "#",
        icon: <BsFacebook className="w-6 h-6 fill-current" />,
      },
    ],
    Help: [
      { name: "FAQ", link: "/faq" },
      { name: "Destinations", link: "/destinations" },
      { name: "Press Room", link: "/press" },
      { name: "Contact", link: "/contact" },
      { name: "Promo Code", link: "/promo" },
    ],
  };

  return (
    <footer className=" text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerSections).map(([title, items]) => (
            <div key={title} className="mb-4">
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Get the app section */}
        <hr />
        <div className="border-t border-5 border-gray-800 pt-8">
          <h3 className="text-xl font-bold mb-4">Get the app!</h3>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-800 transition-colors duration-200 rounded-lg p-2"
            >
              <BsGooglePlay className="h-10 w-10" />
            </a>
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-800 transition-colors duration-200 rounded-lg p-2"
            >
              <img
                src="/api/placeholder/135/40"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
