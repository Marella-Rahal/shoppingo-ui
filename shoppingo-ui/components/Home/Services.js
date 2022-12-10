import React from "react";

const Services = () => {
  return (
    <div className="pt-16 px-4 md:px-8">
      <h2 className="text-center">خدماتنا</h2>

      <div className="mt-16 flex flex-wrap justify-evenly">
        <div
          data-aos="zoom-in"
          className="w-[350px] m-5 pb-2 flex flex-col items-center space-y-3  rounded-xl shadow-xl shadow-shadowColor"
        >
          <img
            src="feature3.svg"
            alt="feature3"
            className="h-[200px] md:h-[300px] w-[350px] border-b-4"
          />
          <h3> مقارنة الأسعار</h3>
          <div className="text-textColor2 text-md text-center h-[110px]">
            يسمح موقعنا بمقارنة الأسعار لنفس المنتج في عدة متاجر لمعرفة الأرخص
            بينها
          </div>
        </div>

        <div
          data-aos="zoom-in"
          className="w-[350px] m-5 pb-2 flex flex-col items-center space-y-3  rounded-xl shadow-xl shadow-shadowColor"
        >
          <img
            src="feature1.svg"
            alt="feature1"
            className="h-[200px] md:h-[300px] w-[350px] border-b-4"
          />
          <h3>الموقع الأقرب</h3>
          <div className="text-textColor2 text-md text-center h-[110px]">
            يحوي موقعنا على خريطة من أجل تحديد الموقع الأقرب للمنتج المطلوب
          </div>
        </div>

        <div
          data-aos="zoom-in"
          className="w-[350px] m-5 pb-2 flex flex-col items-center space-y-3  rounded-xl shadow-xl shadow-shadowColor"
        >
          <img
            src="feature2.svg"
            alt="feature2"
            className="h-[200px] md:h-[300px] w-[350px] border-b-4"
          />
          <h3> الدفع الإلكتروني</h3>
          <div className="text-textColor2 text-md text-center h-[110px]">
            <div>يتيح موقعنا الدفع الإلكتروني عن طريق موقع</div>
            <div>WePay</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
