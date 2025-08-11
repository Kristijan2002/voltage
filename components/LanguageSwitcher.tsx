import Cookies from 'js-cookie'
import React from 'react'
import { useLanguage } from './LanguageProvider'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  const changeLanguage = (lng: 'sl' | 'en') => {
    setLanguage(lng)
    Cookies.set('NEXT_LOCALE', lng, { expires: 365 })
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('sl')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'sl'
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        SL
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher
