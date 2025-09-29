import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaGlobeEurope } from "react-icons/fa";
import { HiOutlinePuzzle } from "react-icons/hi";
import { WGS } from '../../components/Assets'; // Adjust path to your logo if needed
import {
  SiReact,
  SiNodedotjs,
  SiGooglecloud,
  SiFirebase,
  SiTailwindcss,
} from "react-icons/si";

// A small component for feature cards
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => (
  <motion.div 
    className="p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-WGS to-WGSDark rounded-2xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-headingColor mb-2">{title}</h3>
    <p className="text-textColor text-sm">{children}</p>
  </motion.div>
);

const About = () => {
  return (
    <div className="w-full px-4 md:px-16 py-4">
      
      {/* --- Hero Section --- */}
      <motion.section 
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center items-center mb-4">
          <img src={WGS} alt="Logo" className="h-16 mr-4"/>
          <h1 className="text-5xl md:text-6xl font-extrabold text-headingColor tracking-tight">
            Eligix
          </h1>
        </div>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-textColor">
          An intelligent eligibility engine built by <span className="font-semibold text-WGS">Team Bug-Busters</span> for the WGS-Google Hackathon, designed to make accepting directed payments simple, seamless, and scalable.
        </p>
      </motion.section>

      {/* --- The Problem & Solution --- */}
      <section className="py-16 bg-gray-50 rounded-3xl">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-headingColor mb-4">Bridging the Gap in E-Commerce</h2>
          <p className="text-textColor mb-12">
            Merchants struggle to accept directed payments like meal vouchers online due to complex, country-specific rules and a lack of a universal solution. Eligix solves this.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaBrain className="w-8 h-8 text-white" />} 
              title="AI-Powered Classification"
            >
              Our Vertex AI engine analyzes any shopping basket in real-time. No more manual catalogs or complex integrations.
            </FeatureCard>
            <FeatureCard 
              icon={<FaGlobeEurope className="w-8 h-8 text-white" />} 
              title="Dynamic Rule Engine"
            >
              Powered by Firestore, our engine adapts to any country or program's rules without a single line of code change.
            </FeatureCard>
            <FeatureCard 
              icon={<HiOutlinePuzzle className="w-8 h-8 text-white" />} 
              title="Seamless Integration"
            >
              We provide a single, robust API for merchants to handle any directed payment, from meal vouchers to wellness stipends.
            </FeatureCard>
          </div>
        </div>
      </section>
      
      {/* --- Tech Stack --- */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-headingColor mb-4">Our Technology</h2>
        <p className="text-textColor mb-10">Built with the best of Google Cloud and modern web technologies.</p>
        <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12 text-gray-500">
          <motion.div whileHover={{ scale: 1.1, color: "#61DAFB" }} className="flex flex-col items-center gap-2">
            <SiReact className="w-12 h-12" />
            <span className="font-semibold">React</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, color: "#68A063" }} className="flex flex-col items-center gap-2">
            <SiNodedotjs className="w-12 h-12" />
            <span className="font-semibold">Node.js</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, color: "#4285F4" }} className="flex flex-col items-center gap-2">
            <SiGooglecloud className="w-12 h-12" />
            <span className="font-semibold">Google Cloud</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, color: "#FFCA28" }} className="flex flex-col items-center gap-2">
            <SiFirebase className="w-12 h-12" />
            <span className="font-semibold">Firebase</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, color: "#06B6D4" }} className="flex flex-col items-center gap-2">
            <SiTailwindcss className="w-12 h-12" />
            <span className="font-semibold">Tailwind CSS</span>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default About;