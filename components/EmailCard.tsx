import React from "react";
import { Badge } from "@/components/ui/badge"

type Props = {};

const EmailCard = (props: Props) => {
  return (
    <div className="border  rounded-md py-3 px-4 cursor-pointer hover:shadow-md transition-shadow">
      <div className="text-xl font-medium flex justify-between items-center">
        <span className="inline-block">Amazon.in</span>
        {/* <Badge variant="outline" className="bg-red-500 text-white">Important</Badge> */}
        {/* <Badge variant="outline" className="bg-blue-500 text-white">Promotional</Badge> */}
        {/* <Badge variant="outline" className="bg-lime-500 text-white">Social</Badge> */}
        {/* <Badge variant="outline" className="bg-yellow-500 text-white">Spam</Badge> */}
        <Badge variant="outline" className="bg-fuchsia-500 text-white">General</Badge>

      </div>
      <div className="mt-3">
        <span className="line-clamp-2 leading-[1.8rem]">
          Dear Asad, Thank you for shopping with us! We are excited to let you
          know that your recent order has been successfully placed and is now
          being processed. Here are the details of your order: Order Summary:
          Order Number: 123-4567890-1234567 Order Date: June 8, 2024 Items
          Ordered: 1x Echo Dot (4th Gen) - Smart speaker with Alexa 1x Fire TV
          Stick 4K with Alexa Voice Remote Shipping Information: Shipping
          Address: Asad Khan 123 Elm Street Springfield, IL 62704 United States
          Delivery Date: Expected by June 12, 2024
        </span>
      </div>
    </div>
  );
};

export default EmailCard;
