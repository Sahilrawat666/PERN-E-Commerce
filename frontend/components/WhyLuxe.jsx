import { motion } from "framer-motion";
import { FiHeart, FiShield, FiTruck } from "react-icons/fi";

const benefits = [
  {
    icon: FiHeart,
    title: "Thoughtfully Designed",
    description:
      "Every piece is created with intention, balancing timeless design with everyday functionality.",
  },
  {
    icon: FiShield,
    title: "Quality First",
    description:
      "We focus on refined materials and lasting craftsmanship so your favourites stay favourites.",
  },
  {
    icon: FiTruck,
    title: "Simple Delivery",
    description:
      "Fast, reliable delivery and easy returns make shopping with LUXE effortless.",
  },
];

function WhyLuxe() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#b08d57]" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d57]">
              The LUXE Difference
            </span>

            <span className="h-px w-8 bg-[#b08d57]" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-[#241c18] sm:text-4xl">
            Designed around you
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f3ee] text-[#b08d57]">
                  <Icon size={23} strokeWidth={1.6} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#241c18]">
                  {benefit.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#786f68]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyLuxe;
