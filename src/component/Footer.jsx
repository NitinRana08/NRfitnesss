function Footer() {
  return (
    <footer
  id="contact"
  className="scroll-mt-24 bg-zinc-950 text-white px-6 py-16 border-t border-zinc-800"
>

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

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1HubgYp57P/?mibextid=wwXIfr"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl transition duration-300"
          >
            <img
              src="/Facebook.png"
              alt="facebook"
              className="w-8 h-8 object-contain"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/nitinrana23_/"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl transition duration-300"
          >
            <img
              src="/instagram.png"
              alt="instagram"
              className="w-8 h-8 object-contain"
            />
          </a>

          {/* YouTube */}
          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl transition duration-300"
          >
            <img
              src="/youtube.png"
              alt="youtube"
              className="w-8 h-8 object-contain"
            />
          </a>

          {/* X / Twitter */}
          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl transition duration-300"
          >
            <img
              src="/X.png"
              alt="twitter"
              className="w-8 h-8 object-contain"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl transition duration-300"
          >
            <img
              src="/linkedin.png"
              alt="linkedin"
              className="w-8 h-8 object-contain"
            />
          </a>

          {/* Mail */}
          <a
            href="mailto:nitinr8229@gmail.com"
            className="bg-zinc-900 hover:bg-red-600 p-4 rounded-2xl transition duration-300"
          >
            <img
              src="/mail.png"
              alt="mail"
              className="w-8 h-8 object-contain"
            />
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