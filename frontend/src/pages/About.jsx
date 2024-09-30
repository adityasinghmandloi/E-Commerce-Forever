import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born to revolutionize the online shopping experience,
            providing customers with a seamless, user-friendly platform that
            caters to all their needs. With a vast selection of products, secure
            payment gateways, and fast delivery options, E-Commerce Forever
            ensures convenience and satisfaction. Our commitment to innovation
            and customer service makes online shopping easier, safer, and more
            enjoyable than ever before.
          </p>
          <p>
            Since our inception, Forever has been dedicated to transforming the
            online shopping landscape. We offer an extensive range of products,
            secure transactions, and fast deliveries, ensuring a seamless
            experience for customers. Our unwavering focus on innovation and
            exceptional customer service has made us a trusted platform, making
            online shopping more convenient, reliable, and enjoyable for
            everyone.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to redefine online shopping by delivering
            exceptional customer experiences. We aim to provide a wide variety
            of quality products, fast and secure transactions, and efficient
            delivery services. By continuously innovating and prioritizing
            customer satisfaction, we strive to make online shopping more
            convenient, accessible, and enjoyable for shoppers around the world.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assuarance : </b>
          <p className="text-gray-600 text-align: justify">
            We meticulously prioritize quality assurance to ensure that every
            product meets the highest standards. From sourcing to delivery, our
            rigorous quality checks guarantee that customers receive only the
            best. We are committed to transparency, reliability, and
            consistency, making sure every shopping experience is seamless and
            exceeds expectations. Your satisfaction is our top priority, and we
            never compromise on quality.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className="text-gray-600 text-align: justify">
            We are committed to providing a seamless shopping experience, from
            browsing to checkout. With easy navigation, fast shipping, secure
            payment options, and 24/7 customer support, we ensure that shopping
            with us is quick, effortless, and stress-free. Your convenience is
            our priority, making online shopping enjoyable and efficient.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service : </b>
          <p className="text-gray-600 text-align: justify">
            Our customer service team at E-Commerce Forever is dedicated to
            delivering exceptional support at every step of your shopping
            journey. We are available 24/7 to address inquiries, resolve issues,
            and ensure your satisfaction. With a team of trained professionals,
            we prioritize fast, friendly, and reliable assistance, making sure
            your experience is smooth and your concerns are handled with care
            and efficiency.
          </p>
        </div>
      </div>
      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default About;
