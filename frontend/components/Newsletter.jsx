import { useState } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    console.log("Newsletter email:", email);
    setEmail("");
  };

  return (
    <section className="bg-[#f7f3ee] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#b08d57] shadow-sm">
          <FiMail size={20} />
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#241c18] sm:text-4xl">
          Stay in the know
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#786f68] sm:text-base">
          Be the first to discover new collections, exclusive edits, and
          thoughtful inspiration from ZENOVA.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-full border border-[#d8cec3] bg-white px-5 py-3.5">
            <FiMail size={18} className="shrink-0 text-[#a49b92]" />

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              required
              className="w-full bg-transparent text-sm text-[#241c18] outline-none placeholder:text-[#a49b92]"
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
          >
            Subscribe
            <FiArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>

        <p className="mt-4 text-[11px] text-[#a49b92]">
          By subscribing, you agree to receive emails from ZENOVA.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;
