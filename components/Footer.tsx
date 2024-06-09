

'use client'

import { useState } from "react";

const Footer = () => {
  const [showCopied, setShowCopied] = useState<boolean>(false)
    const copyKey = ()=>{
      setShowCopied(true);
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_GEMINI_KEY || '');
        console.log(process.env.NEXT_PUBLIC_GEMINI_KEY);
        setTimeout(() => {
          setShowCopied(false)
        }, 2000);
    }
  return (
    <div className="fixed bottom-0 w-full text-center py-2">
      <span>To test this application you can use <span className="font-medium">Test API</span> key also. </span>
      <span className="text-blue-600 ml-2 hover:cursor-pointer hover:text-blue-500" onClick={copyKey}>
        {showCopied ? "Copied !!" : 'Copy'}
      </span>
    </div>
  );
};

export default Footer;
