"use client";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { useState } from "react";
import { Check, LoaderCircle, X } from "lucide-react";
import { test } from "@/lib/generativeAI";
import { useRouter } from "next/navigation";
export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isValidKey, setIsValidKey] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const validateAPIKey = async () => {
    if (!apiKey) {
      toast({
        title: "API key required",
        description: "Please provide 'Google Gemini API' key to continue.",
      });
      return;
    }
    setIsValidating(true);
    const res = await test(apiKey);
    if (res.success) {
      setIsValidKey(true);
      setShowRedirect(true);

      router.push("api/auth/register");
    } else {
      toast({
        title: "API key is invalid",
        description:
          "Please provide a correct 'Google Gemini API' key to continue.",
      });
      setIsValidKey(false);
      setShowError(true);
      setShowRedirect(false);
    }
    setIsValidating(false);
  };
  return (
    <Container className="flex min-h-screen flex-col items-center gap-y-36 p-24">
      {
        <Button
          onClick={validateAPIKey}
        >
          Login with Google{" "}
          {showRedirect && (
            <LoaderCircle className="animate-spin text-white ml-4" />
          )}
        </Button>
      }
      <div className="flex flex-col gap-y-6 w-1/2">
        <div className="flex gap-x-4 items-center">
          <Input
            placeholder="Enter Gemini Key..."
            onChange={(e) => {
              let text = e.target.value;
              if (text.trim()) {
                setApiKey(e.target.value);
              } else {
                setApiKey("");
                setShowError(false);
              }
            }}
            value={apiKey}
            disabled={isValidating}
          />
          {isValidating && (
            <LoaderCircle className="animate-spin text-rose-500" />
          )}
          {!isValidating && isValidKey && <Check className="text-green-500" />}
          {!isValidKey && showError && !isValidating && (
            <X className="text-red-500" />
          )}
        </div>
        <p className="text-center">
          Don't have api key ?
          <Link
            href={"https://aistudio.google.com/app/apikey"}
            target="_blank"
            className="text-blue-500"
          >
            <Button variant={"link"} className="text-blue-500">
              Get your key
            </Button>
          </Link>
        </p>
      </div>
    </Container>
  );
}
