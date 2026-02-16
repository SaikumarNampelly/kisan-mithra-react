import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18
    }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const AboutSection = () => {
  return (
    <section
      id="aboutsection"
      className="min-h-screen scroll-mt-24 bg-green-50 px-6 py-16 flex items-center overflow-hidden"
    >
      <motion.div
        className="max-w-6xl mx-auto w-full"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div variants={fadeLeft}>

            <motion.div
              whileHover={{ scale: 1.06 }}
              className="flex justify-center lg:justify-start mb-20"
            >
              <span className="inline-block bg-green-100 text-green-700 text-2xl font-serif font-bold px-6 py-4 rounded-full shadow-sm">
                About Us
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-green-900 leading-tight mb-6"
            >
              Transforming Agriculture <br />
              <span className="text-green-700">Together</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-600 mb-4">
              Kisan Mitra is a comprehensive agricultural platform dedicated to
              empowering farmers with technology, knowledge, and resources.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 mb-6">
              We connect farmers with experts, customers, and essential services —
              from seed selection to harvest transportation.
            </motion.p>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition shadow-md"
            >
              Learn Our Story
            </motion.button>

          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            variants={container}
            className="grid grid-cols-2 gap-6"
          >
            {[
              ["10,000+", "Active Farmers"],
              ["500+", "Crop Varieties"],
              ["95%", "Success Rate"],
              ["50+", "Districts Covered"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.04 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold text-green-900">{value}</h3>
                <p className="text-gray-500 text-sm mt-2">{label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
