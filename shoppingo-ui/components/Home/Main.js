import { useRouter } from "next/router";
import React from "react";

const Main = () => {
  const router = useRouter();
  return (
    <div className="pt-40 px-4 md:px-8 flex flex-col md:flex-row md:h-[600px] md:justify-between">
      <img
        src="home.svg"
        alt="Shopping Online"
        className="w-[100%] md:w-[50%]"
      />

      <div className="flex flex-col items-center space-y-10 p-10">
        <div className="space-y-1 text-center">
          <h2>مرحباً بك في</h2>
          <h2>Shoppingo</h2>
        </div>

        <div className="max-w-xs text-center text-lg text-textColor2 dark:text-darkTextColor2">
          يسمح لك موقعنا بالتسوق من منزلك وكذلك يتيح لك إمكانية الدفع الإلكتروني
          و إدارة نفقاتك
        </div>

        <button
          onClick={() => router.push("/shop")}
          className="p-2"
        >
          ابدأ بالتسوق الآن
        </button>
      </div>
    </div>
  );
};

export default Main;
