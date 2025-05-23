"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 px-6 md:px-12 bg-secondary dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-500 dark:to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/80 dark:bg-black/20 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              My Journey
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Hey there! I'm an enthusiastic MERN stack developer-in-training,
              diving deep into the world of full-stack web development. I love
              building clean, user-friendly interfaces—and connecting them to
              powerful backends that make things tick.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              My journey started with curiosity and some late-night YouTube
              rabbit holes, and now I'm hands-on with technologies like React,
              Node.js, Express, and MongoDB. Every project is a chance to learn
              something new, and I'm always up for the challenge.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Outside of code, I’m either exploring new tools, contributing to
              beginner-friendly open-source repos, or just trying to balance
              screen time with some fresh air. I’m currently looking for
              opportunities where I can grow, build cool stuff, and learn from
              experienced devs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/80 dark:bg-black/20 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Experience & Education
            </h3>

            {/* Experience */}
            {
              <div className="mb-6">
                <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Professional Experience
                </h4>
                <div className="mb-4 border-l-2 border-blue-600 dark:border-blue-500 pl-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Full-Stack Intern
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Anivarti | April 2025 – Present
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Contributing to the development of full-stack web
                    applications using the MERN stack. Built dynamic and
                    responsive frontends with React and Next.js, while also
                    assisting with backend API development using Node.js and
                    Express. Collaborated closely with senior developers in an
                    agile environment, learning best practices in version
                    control, code reviews, and deployment workflows.
                  </p>
                </div>

                {/* <div className="border-l-2 border-blue-600 dark:border-blue-500 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Web Developer Intern</p>
                <p className="text-sm text-gray-700 dark:text-gray-400">Company Name | 2019 - 2020</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Assisted in the development of web applications and learned industry best practices.
                </p>
              </div> */}
              </div>
            }
            {/* Education */}
            <div>
              <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                Education
              </h4>
              <div className="border-l-2 border-purple-700 dark:border-purple-600 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Bachelor's of Computer Application
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  University of Rajasthan | Aug 2023 - Aug 2025
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
