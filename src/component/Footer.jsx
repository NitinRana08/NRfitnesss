
function Footer() {
  return (
    <footer className="bg-zinc-950 text-white px-6 py-16 border-t border-zinc-800">
      
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Connect With Us
          </h2>

          <p className="text-zinc-400 mt-3">
            Follow NR Fitness on social media
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 flex-wrap mb-12">

          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl text-2xl transition duration-300"
          >
            {/* here */}
            <FaFacebook />
          </a>

          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl text-2xl transition duration-300"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl text-2xl transition duration-300"
          >
            <FaYoutube />
          </a>

          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl text-2xl transition duration-300"
          >
            <FaXTwitter />
          </a>

          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl text-2xl transition duration-300"
          >
            <FaLinkedin />
          </a>

        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-6 text-center text-zinc-500 text-sm">
          © 2026 NR Fitness. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;