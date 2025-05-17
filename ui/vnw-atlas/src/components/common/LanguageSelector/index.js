'use client'
import apiVerifyUser from '@/api/apiVerifyUser';
import React, { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookieLang = document.cookie
        .split('; ')
        .find((row) => row.startsWith('next-intl='))
        ?.split('=')[1];

      if (cookieLang) setCurrentLanguage(cookieLang);
    }
  }, []);


  useEffect(() => {
    // Call the API to verify the user
    const callAPI = async () => {
      const result = await apiVerifyUser();
      if (!result) {
        setIsLoginOpen(false);
      }
    };

    callAPI();
  }, []);

  if (isLoginOpen) return null;


  const languages = [
    {
      code: 'vi',
      name: 'Tiếng Việt',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-5">
          <defs>
            <clipPath id="a">
              <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
            </clipPath>
          </defs>
          <g fillRule="evenodd" clipPath="url(#a)" transform="translate(80) scale(.9375)">
            <path fill="#da251d" d="M-128 0h768v512h-768z" />
            <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z" />
          </g>
        </svg>
      )
    },
    {
      code: 'en',
      name: 'English',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-5">
          <defs>
            <clipPath id="a">
              <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="translate(80) scale(.9375)">
            <g strokeWidth="1pt">
              <path fill="#012169" d="M-128 0h682.6v512H-128z" />
              <path fill="#fff" d="m-128 0v57.2l653.8 454.7h28.8v-57.2L99.2 0h-227.2z" />
              <path fill="#fff" d="m221 0v512h170.6V0H221zM-128 170.6v170.6h682.6V170.6H-128z" />
              <path fill="#c8102e" d="m-128 204.8v102.4h682.6V204.8H-128zM261.3 0v512h102.4V0H261.3zM-128 512l255.4-170.6h76.4L48.7 512H-128zM-128 0l255.4 170.7h-76.4L-128 38.2V0zm597.4 170.7L764 0h76.5L466.6 170.7h-76.4zM221 512L466.6 341.3h76.4L297.4 512H221z" />
            </g>
          </g>
        </svg>
      )
    }
  ];


  const changeLanguage = (language) => {
    const days = 60;
    const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
    document.cookie = `next-intl=${language}; path=/; domain=.tikataz.vn; SameSite=Lax; expires=${expires}`;

    // reload the page to apply the new language
    window.location.reload();
  };

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  const changeLanguageOnClick = (language) => {
    changeLanguage(language);
    setCurrentLanguage(language);
  };


  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative group">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
          aria-label="Change language"
        >
          {currentLangData?.icon}
          <span className="text-sm font-medium text-gray-700">{currentLangData?.name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl origin-bottom-right transform opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-200 border border-gray-200 overflow-hidden">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguageOnClick(language.code)}
              className={`flex items-center w-full px-4 py-3 text-left text-sm transition-colors duration-150 ${currentLanguage === language.code
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-50 text-gray-700'
                }`}
            >
              <span className="mr-3">{language.icon}</span>
              <span className="flex-1 font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;