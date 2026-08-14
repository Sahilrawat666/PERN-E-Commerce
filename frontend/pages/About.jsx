import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiStar,
  FiTruck,
} from "react-icons/fi";

function About() {
  const values = [
    {
      icon: <FiStar size={20} />,
      title: "Timeless Design",
      description:
        "We focus on refined designs that remain beautiful beyond changing trends.",
    },
    {
      icon: <FiCheck size={20} />,
      title: "Thoughtful Quality",
      description:
        "Every detail is carefully considered to deliver products made for everyday living.",
    },
    {
      icon: <FiHeart size={20} />,
      title: "Made With Intention",
      description:
        "We believe the things you surround yourself with should feel personal and meaningful.",
    },
    {
      icon: <FiTruck size={20} />,
      title: "Simple Experience",
      description:
        "From discovery to delivery, we keep your shopping experience effortless.",
    },
  ];

  return (
    <section className="overflow-hidden bg-[#f7f3ee] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b08d57]">
            About LUXE
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#241c18] sm:text-5xl lg:text-6xl">
            Designed for the way
            <span className="block font-normal italic text-[#786f68]">
              you choose to live.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#786f68] sm:text-base">
            LUXE is built around a simple idea — everyday products can be
            functional, beautiful, and thoughtfully designed at the same time.
          </p>
        </motion.div>

        {/* Story */}
        <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-20">
          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[#b08d57]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-[#241c18]">
              <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                {/* <img
                  src="/images/about-luxe.jpg"
                  alt="LUXE collection"
                  className="h-full w-full object-cover"
                /> */}
                <img
                  src="https://storesblock.com/cdn/shop/collections/Women-collection.jpg?v=1777834441&width=720"
                  alt="LUXE collection"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#241c18]/80 via-[#241c18]/20 to-transparent p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d8b77d]">
                  The LUXE philosophy
                </p>

                <p className="mt-3 max-w-sm text-lg font-medium leading-7 text-white sm:text-xl">
                  Less noise. Better choices. A more considered way to shop.
                </p>
              </div>
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-3 rounded-2xl border border-[#e5ddd4] bg-[#f7f3ee] px-5 py-4 shadow-lg sm:-right-6"
            >
              <p className="text-2xl font-semibold text-[#241c18]">01</p>
              <p className="mt-1 text-xs text-[#786f68]">
                Thoughtful by design
              </p>
            </motion.div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b08d57]">
              Our story
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#241c18] sm:text-4xl">
              Everyday essentials,
              <span className="block font-normal italic text-[#786f68]">
                elevated.
              </span>
            </h3>

            <div className="mt-7 space-y-5 text-sm leading-7 text-[#786f68] sm:text-base">
              <p>
                We created LUXE for people who appreciate the details. The
                texture of a material, the balance of a silhouette, the way a
                product fits naturally into your space.
              </p>

              <p>
                Instead of filling your world with more, we believe in choosing
                better. Our collection brings together carefully selected pieces
                that combine function, character, and understated elegance.
              </p>

              <p>
                Because luxury isn't always about having more. Sometimes, it's
                simply about having the right things.
              </p>
            </div>

            <a
              href="#collections"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#241c18] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b08d57]"
            >
              Explore our collection
              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mt-24 border-t border-[#e5ddd4] pt-16 sm:mt-32 sm:pt-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cec3] text-[#b08d57] transition-all duration-300 group-hover:border-[#b08d57] group-hover:bg-[#b08d57] group-hover:text-white">
                  {value.icon}
                </div>

                <h4 className="mt-5 text-base font-semibold text-[#241c18]">
                  {value.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-[#786f68]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 rounded-[2rem] bg-[#241c18] px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <p className="mx-auto max-w-3xl text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-4xl">
            "Good design should feel effortless, look intentional, and last long
            enough to become part of your story."
          </p>

          <div className="mx-auto mt-7 h-px w-12 bg-[#b08d57]" />

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b77d]">
            The LUXE Standard
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
