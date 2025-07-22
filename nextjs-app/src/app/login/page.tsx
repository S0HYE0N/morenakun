"use client";

import { WORDS } from "@/assets/strings/words";
import { SENTENCES } from "@/assets/strings/sentences";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { isValidEmail, isValidPassword } from "@/utils/validation";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("ko");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const callbackUrl = "/dashboard";

  const params = useSearchParams();
  const error = params.get("error");
  const router = useRouter();

  // ページ言語設定（日⇔韓）
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ko" ? "ja" : "ko"));
  };

  // ログイン（ローカル認証）
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage(SENTENCES.loginEmptyErrorMessage);
      return false;
    }

    if (!isValidEmail(email) || !isValidPassword(password)) {
      setErrorMessage(SENTENCES.loginInvalidErrorMessage);
      return false;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setErrorMessage(SENTENCES.loginInvalidErrorMessage);
    } else {
      router.push(res.url!);
    }
  };

  return (
    <div className={"flex flex-col items-center justify-center min-h-screen"}>
      <div>
        <Image src="/logo_2.png" width={180} height={50} alt="로고" className="mb-8" />
      </div>
      <div className="w-96 flex flex-col items-center justify-center border border-width-2 bg-white rounded-2xl shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{WORDS.login}</h1>
        </div>
        <div className="w-full">
          <div className="w-full h-10 border-b border-gray-300 mb-4">
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder={WORDS.email}
                className="w-full h-full px-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full h-10 border-b border-gray-300 mb-2 relative">
            <label htmlFor="password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder={WORDS.password}
                className="w-full h-full px-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="currentColor"
                >
                  <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 355.9 17.3 304 2.4 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156.1 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="currentColor"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* <div className="w-full flex justify-end">
          <button type="button" className="text-sm text-gray-500">
            {WORDS.forgotPassword}
          </button>
        </div> */}
        {(errorMessage || error) && (
          <p className="text-red-500 text-xs mt-2">{errorMessage || SENTENCES.loginInvalidErrorMessage}</p>
        )}
        <button type="button" className="rounded-full bg-black text-white w-full p-2 mt-4" onClick={handleLogin}>
          {WORDS.loginButton}
        </button>
        <div className="relative w-full py-4 text-center before:content-[''] before:absolute before:h-0.5 before:bg-gray-200 before:w-full before:top-1/2 before:left-0">
          <span className="relative px-2 bg-white text-gray-400">{WORDS.others}</span>
        </div>
        <button
          type="button"
          className="gsi-material-button"
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
        >
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ display: "block" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">{WORDS.googleLogin}</span>
            <span style={{ display: "none" }}>{WORDS.googleLogin}</span>
          </div>
        </button>
      </div>
      {/* <button
        onClick={toggleLanguage}
        className="flex flex-row self-end items-center gap-1 px-3 py-2 text-sm text-gray-500 mt-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4">
          <path
            fill="#9ca3af"
            d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5l0 39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9l0 39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7l0-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1L257 256c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
          />
        </svg>
        {language === "ko" ? "한국어" : "日本語"}
      </button> */}
    </div>
  );
}
